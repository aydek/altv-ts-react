import alt from 'alt-server';
import { addItem, isSameItem, useItem } from './functions';
import { inventoryID, inventoryItems } from './config';
import { IGroundItems, addGroundItem, groundItems } from './groundItems';
import { systems } from '../systems';
import { InventoryEvents } from '@shared/enums/events/webviewEvents';
import { DEFAULT_INV_CAPACITY } from '@shared/config';
import { NotificationIcons } from '@shared/enums/icons';
import { distance } from '@shared/utility/vector';

const nullItem = {
    id: -1,
    description: '',
    quantity: 0,
    p1: null,
    p2: null,
    p3: null,
    p4: null,
};

alt.onClient(InventoryEvents.fetchConfig, fetchConfig);
alt.onClient(InventoryEvents.fetchAll, fetchAll);
alt.onClient(InventoryEvents.hide, handleHide);
alt.onClient(InventoryEvents.fetchSecondary, fetchSecondary);
alt.onClient(InventoryEvents.updateItems, updateItems);
alt.onClient(InventoryEvents.removeItem, removeItem);
alt.onClient(InventoryEvents.removeEquipment, removeEquipment);
alt.onClient(InventoryEvents.useItem, useItem);
alt.onClient(InventoryEvents.stackPrimary, stackPrimary);
alt.onClient(InventoryEvents.stackSecondary, stackSecondary);
alt.onClient(InventoryEvents.movePrimary, movePrimary);
alt.onClient(InventoryEvents.moveSecondary, moveSecondary);
alt.onClient(InventoryEvents.splitPrimary, splitPrimary);
alt.onClient(InventoryEvents.splitSecondary, splitSecondary);
alt.onClient(InventoryEvents.dropPrimary, dropPrimary);
alt.onClient(InventoryEvents.dropSecondary, dropSecondary);

function fetchConfig(player: alt.Player, secondary_type: string) {
    player.invSecondaryType = secondary_type;
    alt.emitClient(player, InventoryEvents.fetchConfig, JSON.stringify(inventoryItems), secondary_type);
}

function fetchAll(player: alt.Player) {
    alt.emitClient(player, InventoryEvents.fetchPrimary, JSON.stringify(player.inventory), DEFAULT_INV_CAPACITY + player.invCapacity, JSON.stringify(player.equipment), true);
}

function handleHide(player: alt.Player) {
    player.invSecondaryType = '';
}

export function fetchPrimary(player: alt.Player) {
    alt.emitClient(player, InventoryEvents.fetchPrimary, JSON.stringify(player.inventory), DEFAULT_INV_CAPACITY + player.invCapacity, JSON.stringify(player.equipment), true);
}

export function fetchSecondary(player: alt.Player, custom_secondary: string | undefined = undefined) {
    let secondary_array: Array<IGroundItems> = [];
    let secondaryCapacity = 0;
    if (player.invSecondaryType === 'Ground') {
        for (let i = 0; i < 48; i++) {
            if (groundItems[i]) {
                const item = groundItems[i];
                if (item && distance(player.pos, item.pos) < 2) {
                    secondary_array.push(item);
                }
            } else {
                secondary_array.push({ id: -1, quantity: 0, description: '', pos: new alt.Vector3(0, 0, 0) });
            }
        }
        secondaryCapacity = 99999;
    }
    alt.emitClient(player, InventoryEvents.fetchSecondary, custom_secondary !== undefined ? custom_secondary : JSON.stringify(secondary_array), secondaryCapacity);
}

function updateItems(player: alt.Player, data: string) {
    player.inventory = JSON.parse(data);
}

export function removeItem(player: alt.Player, index: number, quantity: number, announce = true) {
    let item = player.inventory[index];
    if (!item) return;
    const configItem = inventoryItems[item.id];
    if (!configItem) return;
    if (quantity < item.quantity) {
        item.quantity = item.quantity - quantity;
        player.inventory[index] = item;
    } else {
        player.inventory[index] = {
            id: -1,
            quantity: 0,
            description: '',
            p1: null,
            p2: null,
            p3: null,
            p4: null,
        };
    }
    fetchPrimary(player);
    if (announce) alt.emitClient(player, InventoryEvents.usedItem, configItem.id, quantity, systems.translate('INV_REMOVE'));
}

function removeEquipment(player: alt.Player, key: keyof IEquipment) {
    if (key === 'tops') {
        if (!addItem(player, inventoryID.top, player.equipment.tops[4], 1, player.equipment.tops[0], player.equipment.tops[1], player.equipment.tops[2], player.equipment.tops[3])) {
            systems.notifications.show(player, NotificationIcons.error, 5000, 'Error', systems.translate('INV_NOT_ENOUGH_SPACE'));
            return;
        }
        player.equipment.tops = [-1, 0, -1, 0, 'Default'];
    } else {
        for (let i = 0; i < inventoryItems.length; i++) {
            const configItem = inventoryItems[i];
            if (!configItem) continue;
            if (configItem.img === key) {
                const item = player.equipment[key];
                if (!addItem(player, i, item[2], 1, item[0], item[1])) {
                    systems.notifications.show(player, NotificationIcons.error, 5000, 'Error', systems.translate('INV_NOT_ENOUGH_SPACE'));
                    return;
                }
            }
        }
        player.equipment[key] = [-1, 0, 'Default'];
    }
    fetchPrimary(player);
    systems.player.appearance.updateClothes(player, player.dna.sex);
}

function stackPrimary(player: alt.Player, index: number) {
    const item = player.inventory[index];

    if (!item) return;

    player.inventory.map((el, i) => {
        if (i === index) return;
        if (!isSameItem(item, el)) return;

        const target = player.inventory[index];
        const source = player.inventory[i];

        if (!target || !source) return;

        player.inventory[index] = {
            ...target,
            quantity: target.quantity + source.quantity,
            id: target.id,
            description: target.description,
        };
        player.inventory[i] = nullItem;
    });
    fetchPrimary(player);
}

function stackSecondary(player: alt.Player, index: number, secondary_Array: string) {
    if (player.invSecondaryType === 'Ground') {
        const secondaryArray: Array<IGroundItems> = JSON.parse(secondary_Array);

        const sources = groundItems.filter((val) => isSameItem(val, secondaryArray[index] as IInventory));
        sources.map((source, i) => {
            const realIndex = groundItems.findIndex((value) => value.index === secondaryArray[index]?.index);
            const item = groundItems[realIndex];

            if (!item) {
                fetchSecondary(player);
                return;
            }

            if (JSON.stringify(source) === JSON.stringify(item)) return;

            const currenIndex = groundItems.findIndex((value) => JSON.stringify(value) === JSON.stringify(source));
            const current = groundItems[currenIndex];

            if (!current) return;

            groundItems[realIndex] = {
                ...item,
                quantity: item.quantity + source.quantity,
            };

            const marker = source.marker;
            if (marker && marker.valid) marker.destroy();
            groundItems.splice(currenIndex, 1); //
        });
    }
    fetchSecondary(player);
    return;
}

function movePrimary(player: alt.Player, index: number, targetIndex: number) {
    const item = player.inventory[index];
    const target = player.inventory[targetIndex];

    if (!item || !target) return;

    if (isSameItem(item, target)) {
        //Stack item if same
        player.inventory[targetIndex] = {
            ...target,
            quantity: target.quantity + item.quantity,
        };

        player.inventory[index] = {
            id: -1,
            description: '',
            quantity: 0,
            p1: null,
            p2: null,
            p3: null,
            p4: null,
        };
    } else {
        //** If not the same swap items */
        player.inventory[index] = target;
        player.inventory[targetIndex] = item;
    }

    fetchPrimary(player);
}

function moveSecondary(player: alt.Player, index: number, targetIndex: number) {
    if (player.invSecondaryType === 'Ground') {
        fetchSecondary(player);
        return;
    }
}

function splitPrimary(player: alt.Player, index: number, targetIndex: number | undefined) {
    if (targetIndex === undefined) {
        /** Split to empty element */

        const item = player.inventory[index];
        const slot = player.inventory.findIndex((el) => el.id === -1);

        if (!item) return;

        const ammount = Math.floor(item.quantity / 2);

        if (ammount < 1) return;

        player.inventory[slot] = {
            ...item,
            quantity: ammount,
            id: item.id,
            description: item.description,
        };
        removeItem(player, index, ammount, false);
    } else {
        /** Split to selected element */
        const item = player.inventory[index];
        const target = player.inventory[targetIndex];

        if (!item || !target) return;
        /** split item if moved to empty spot */
        const ammount = Math.floor(item.quantity / 2);
        if (target.id != -1) return;
        if (ammount < 1) return;
        player.inventory[targetIndex] = { ...item, quantity: ammount };
        player.inventory[index] = { ...item, quantity: item.quantity - ammount };
    }
    fetchPrimary(player);
}

function splitSecondary(player: alt.Player, index: number, targetIndex: number | undefined, secondary_array: string) {
    if (player.invSecondaryType === 'Ground') {
        if (!targetIndex) {
            /** Split to empty element */
            const secondaryArray: Array<IGroundItems> = JSON.parse(secondary_array);
            const realIndex = groundItems.findIndex((value) => value.index === secondaryArray[index]?.index);

            const item = groundItems[realIndex];

            if (!item) {
                fetchSecondary(player);
                return;
            }
            const ammount = Math.floor(item.quantity / 2);
            if (ammount < 1) return;
            addGroundItem({ ...item, pos: player.pos, quantity: ammount }, player, false);
            groundItems[realIndex] = {
                ...item,
                pos: player.pos,
                quantity: item.quantity - ammount,
            };
        }
        fetchSecondary(player);
    }
}

function dropPrimary(player: alt.Player, index: number, targetIndex: number | undefined) {
    if (player.invSecondaryType === 'Ground') {
        /** Because its ground dont need to use target index as it will just push new item to array */
        const item = player.inventory[index];

        if (!item) return;

        addGroundItem({ pos: player.pos, ...item, quantity: item.quantity }, player);
        removeItem(player, index, item.quantity, true);

        fetchSecondary(player);
    }
}

function dropSecondary(player: alt.Player, index: number, targetIndex: number | undefined, array: string | undefined) {
    if (player.invSecondaryType === 'Ground') {
        if (!array) return;
        const secondaryArray: Array<IGroundItems> = JSON.parse(array);
        const realIndex = groundItems.findIndex((value) => value.index === secondaryArray[index]?.index);
        const item = groundItems[realIndex];
        if (!item) return;

        const target = targetIndex ? targetIndex : -1;

        const desc = item.description;
        const qty = item.quantity;
        const success = addItem(player, item.id, desc, qty, item.p1, item.p2, item.p3, item.p4, target);
        if (success) {
            groundItems.splice(realIndex, 1);
            systems.player.animations.play(player, 'pickup_object', 'pickup_low', 1200);
            const marker = item.marker;
            if (marker && marker.valid) marker.destroy();
        } else {
            systems.notifications.show(player, 'error', 5000, 'Error', systems.translate('INV_NOT_ENOUGH_SPACE'));
        }
    }
    fetchPrimary(player);
    fetchSecondary(player);
}
