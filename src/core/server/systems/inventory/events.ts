import alt from 'alt-server';
import { InventoryEvents } from '../../../shared/enums/events/webviewEvents';
import { addInventoryItem, useItem } from './functions';
import { equipmentItems, inventoryItems } from './config';
import { DEFAULT_INV_CAPACITY } from '../../../shared/config';
import { IGroundItems, addGroundItem, groundItems } from './groundItems';
import { distance } from '../../../shared/utility/vector';
import { systems } from '../systems';
import { NotificationIcons } from '../../../shared/enums/icons';

alt.onClient(InventoryEvents.fetchConfig, fetchConfig);
alt.onClient(InventoryEvents.fetchAll, fetchAll);
alt.onClient(InventoryEvents.hide, handleHide);
alt.onClient(InventoryEvents.fetchSecondary, fetchSecondary);
alt.onClient(InventoryEvents.updateItems, updateItems);
alt.onClient(InventoryEvents.removeItem, removeItem);
alt.onClient(InventoryEvents.removeEquipment, removeEquipment);
alt.onClient(InventoryEvents.useItem, useItem);

function fetchConfig(player: alt.Player, secondary_type: string) {
    player.invSecondaryType = secondary_type;
    alt.emitClient(player, InventoryEvents.fetchConfig, JSON.stringify(inventoryItems), secondary_type);
}

function fetchAll(player: alt.Player) {
    alt.emitClient(
        player,
        InventoryEvents.fetchPrimary,
        JSON.stringify(player.inventory),
        DEFAULT_INV_CAPACITY + player.invCapacity,
        JSON.stringify(player.equipment),
        true
    );
}

function handleHide(player: alt.Player) {
    player.invSecondaryType = '';
}

export function fetchPrimary(player: alt.Player) {
    alt.emitClient(
        player,
        InventoryEvents.fetchPrimary,
        JSON.stringify(player.inventory),
        DEFAULT_INV_CAPACITY + player.invCapacity,
        JSON.stringify(player.equipment),
        true
    );
}

export function fetchSecondary(player: alt.Player, custom_secondary: string | undefined = undefined) {
    let secondary_array = [];
    let secondaryCapacity = 0;
    if (player.invSecondaryType === 'Ground') {
        groundItems.map((item, index) => {
            if (distance(player.pos, item.pos) < 2) {
                secondary_array.push(item);
            }
        });
        secondaryCapacity = 99999;
    }
    alt.emitClient(
        player,
        InventoryEvents.fetchSecondary,
        custom_secondary !== undefined ? custom_secondary : JSON.stringify(secondary_array),
        secondaryCapacity
    );
}

function updateItems(player: alt.Player, data: string) {
    player.inventory = JSON.parse(data);
}

export function removeItem(player: alt.Player, index: number, quantity: number, announce = true) {
    const item = inventoryItems[player.inventory[index].id];

    if (quantity < player.inventory[index].quantity) {
        player.inventory[index].quantity = player.inventory[index].quantity - quantity;
    } else {
        player.inventory[index] = {
            id: -1,
            quantity: 0,
            description: '',
            p1: undefined,
            p2: undefined,
            p3: undefined,
            p4: undefined,
        };
    }
    fetchPrimary(player);
    if (announce) alt.emitClient(player, InventoryEvents.usedItem, item.id, quantity, systems.translate('INV_REMOVE'));
}

function removeEquipment(player: alt.Player, key: string) {
    if (key == 'tops') {
        if (
            !addInventoryItem(
                player,
                equipmentItems.top,
                player.equipment.tops[4],
                1,
                player.equipment.tops[0],
                player.equipment.tops[1],
                player.equipment.tops[2],
                player.equipment.tops[3]
            )
        ) {
            systems.notifications.show(
                player,
                NotificationIcons.error,
                5000,
                'Error',
                systems.translate('INV_NOT_ENOUGH_SPACE')
            );
            return;
        }
        player.equipment.tops = [-1, 0, -1, 0, 'Default'];
    } else {
        for (let i = 0; i < inventoryItems.length; i++) {
            if (inventoryItems[i].img === key) {
                if (
                    !addInventoryItem(
                        player,
                        i,
                        player.equipment[key][2],
                        1,
                        player.equipment[key][0],
                        player.equipment[key][1]
                    )
                ) {
                    systems.notifications.show(
                        player,
                        NotificationIcons.error,
                        5000,
                        'Error',
                        systems.translate('INV_NOT_ENOUGH_SPACE')
                    );
                    return;
                }
            }
        }
        player.equipment[key] = [-1, 0, 'Default'];
    }
    fetchPrimary(player);
    systems.player.appearance.updateClothes(player, player.dna.sex);
}

alt.onClient(InventoryEvents.itemDrop, handleItemDrop);

function handleItemDrop(
    player: alt.Player,
    index: number,
    secondary_array: string,
    targetIndex: number,
    split: boolean,
    stack: boolean
) {
    if (player.invSecondaryType === 'Ground') {
        const secondaryArray: Array<IGroundItems> = JSON.parse(secondary_array);
        const item = player.inventory[index];
        const realIndex = groundItems.findIndex(
            (value) => JSON.stringify(value) === JSON.stringify(secondaryArray[targetIndex])
        );
        const target = secondaryArray[targetIndex];

        const ammount = split ? Math.floor(player.inventory[index].quantity / 2) : player.inventory[index].quantity;

        if (ammount < 1) {
            return;
        }

        if (!stack) removeItem(player, index, ammount, !split);
        if (targetIndex == -1) {
            if (stack) {
                const target = player.inventory[index];
                if (target.id == -1) return;

                player.inventory.forEach((el, i) => {
                    if (index == i) return;
                    if (
                        target.id == el.id &&
                        target.description == el.description &&
                        target.p1 == el.p1 &&
                        target.p2 == el.p2 &&
                        target.p3 == el.p3 &&
                        target.p4 == el.p4
                    ) {
                        player.inventory[index].quantity =
                            player.inventory[index].quantity + player.inventory[i].quantity;
                        player.inventory[i] = {
                            id: -1,
                            description: '',
                            quantity: 0,
                            p1: undefined,
                            p2: undefined,
                            p3: undefined,
                            p4: undefined,
                        };
                    }
                });
                fetchPrimary(player);
                return;
            }
            if (split) {
                const slot = player.inventory.findIndex((el) => el.id == -1);
                player.inventory[slot] = { ...player.inventory[index], quantity: ammount };
                fetchPrimary(player);
                return;
            }
            const slot = secondaryArray.findIndex((el) => el.id == -1);
            const newindex = addGroundItem({ pos: player.pos, ...item, quantity: ammount }, player);
            secondaryArray[slot] = groundItems[newindex];
            fetchSecondary(player, JSON.stringify(secondaryArray));

            return;
        }

        if (target.id != -1) {
            if (
                target.id == item.id &&
                target.description == item.description &&
                target.p1 == item.p1 &&
                target.p2 == item.p2 &&
                target.p3 == item.p3 &&
                target.p4 == item.p4 &&
                realIndex > -1
            ) {
                secondaryArray[targetIndex].quantity = secondaryArray[targetIndex].quantity + ammount;
                groundItems[realIndex].quantity = secondaryArray[targetIndex].quantity;
                fetchSecondary(player, JSON.stringify(secondaryArray));
                return;
            }
            const slot = secondaryArray.findIndex((el) => el.id == -1);
            const newindex = addGroundItem({ pos: player.pos, ...item, quantity: ammount }, player);
            secondaryArray[slot] = groundItems[newindex];
            fetchSecondary(player, JSON.stringify(secondaryArray));
            return;
        }

        const newindex = addGroundItem({ pos: player.pos, ...item, quantity: ammount }, player);
        secondaryArray[targetIndex] = groundItems[newindex];
        fetchSecondary(player, JSON.stringify(secondaryArray));
        return;
    }
}

alt.onClient(InventoryEvents.itemPickup, handleItemPickup);

function handleItemPickup(
    player: alt.Player,
    index: number,
    secondary_array: string,
    targetIndex: number,
    split: boolean,
    stack: boolean
) {
    if (player.invSecondaryType === 'Ground') {
        const secondaryArray: Array<IGroundItems> = JSON.parse(secondary_array);

        const realIndex = groundItems.findIndex(
            (value) => JSON.stringify(value) === JSON.stringify(secondaryArray[index])
        );

        if (realIndex < 0) {
            fetchSecondary(player);
            return;
        }

        const item = groundItems[realIndex];

        if (targetIndex == -1 && stack) {
            secondaryArray.forEach((val, i) => {
                if (
                    item.id == val.id &&
                    item.description == val.description &&
                    item.p1 == val.p1 &&
                    item.p2 == val.p2 &&
                    item.p3 == val.p3 &&
                    item.p4 == val.p4
                ) {
                    if (index == i) return;
                    const newRealIndex = groundItems.findIndex(
                        (value) => JSON.stringify(value) === JSON.stringify(secondaryArray[index])
                    );
                    const target = groundItems.findIndex(
                        (value) => JSON.stringify(value) === JSON.stringify(secondaryArray[i])
                    );
                    if (newRealIndex == target) return;
                    if (target < 0) {
                        fetchSecondary(player);
                        return;
                    }

                    groundItems[newRealIndex].quantity =
                        groundItems[newRealIndex].quantity + groundItems[target].quantity;
                    secondaryArray[i] = {
                        id: -1,
                        description: '',
                        quantity: 0,
                        p1: undefined,
                        p2: undefined,
                        p3: undefined,
                        pos: new alt.Vector3(0, 0, 0),
                    };
                    secondaryArray[index].quantity = groundItems[newRealIndex].quantity;

                    groundItems[target].marker.destroy();
                    groundItems.splice(target, 1);
                }
            });

            fetchSecondary(player, JSON.stringify(secondaryArray));
            return;
        }

        const ammount = split ? Math.floor(groundItems[realIndex].quantity / 2) : groundItems[realIndex].quantity;

        if (ammount < 1) {
            return;
        }

        if (targetIndex == -1 && split) {
            const slot = secondaryArray.findIndex((el) => el.id == -1);
            const newindex = addGroundItem({ pos: player.pos, ...item, quantity: ammount }, player, false);
            secondaryArray[slot] = groundItems[newindex];
            groundItems[realIndex].quantity = groundItems[realIndex].quantity - ammount;
            secondaryArray[index].quantity = groundItems[realIndex].quantity;
            fetchSecondary(player, JSON.stringify(secondaryArray));
            return;
        }

        if (
            !addInventoryItem(
                player,
                item.id,
                item.description,
                ammount,
                item.p1,
                item.p2,
                item.p3,
                item.p4,
                targetIndex
            )
        ) {
            //2
            if (ammount > 1) {
                let success = false;
                let actualQuantity = 0;
                for (let i = ammount; i > 0; i--) {
                    if (
                        addInventoryItem(
                            player,
                            item.id,
                            item.description,
                            i,
                            item.p1,
                            item.p2,
                            item.p3,
                            item.p4,
                            targetIndex
                        )
                    ) {
                        success = true;
                        actualQuantity = i;
                        break;
                    }
                }
                if (!success) {
                    systems.notifications.show(
                        player,
                        NotificationIcons.error,
                        5000,
                        'Error',
                        systems.translate('INV_NOT_ENOUGH_SPACE')
                    );
                    return;
                } //9 / 4
                groundItems[realIndex].quantity =
                    groundItems[realIndex].quantity - (groundItems[realIndex].quantity - ammount + actualQuantity);
                secondaryArray[index].quantity = groundItems[realIndex].quantity;
                fetchSecondary(player, JSON.stringify(secondaryArray));
                fetchPrimary(player);
                return;
            }
            systems.notifications.show(player, NotificationIcons.error, 5000, 'Error', systems.translate('INV_NOT_ENOUGH_SPACE'));
            return;
        }

        if (!split) {
            groundItems[realIndex].marker.destroy();
            groundItems.splice(realIndex, 1);
            secondaryArray[index] = {
                id: -1,
                description: '',
                quantity: 0,
                p1: undefined,
                p2: undefined,
                p3: undefined,
                pos: new alt.Vector3(0, 0, 0),
            };
        } else {
            groundItems[realIndex].quantity = groundItems[realIndex].quantity - ammount;
            secondaryArray[index].quantity = groundItems[realIndex].quantity;
        }
        fetchSecondary(player, JSON.stringify(secondaryArray));
        fetchPrimary(player);
        systems.player.animations.play(player, 'pickup_object', 'pickup_low', 1200);
    }
}

alt.onClient(InventoryEvents.movePrimary, movePrimary);

function movePrimary(player: alt.Player, index: number, targetIndex: number, split: boolean) {
    const item = player.inventory[index];
    const target = player.inventory[targetIndex];
    const ammount = split ? Math.floor(item.quantity / 2) : item.quantity;

    if (!item) return;
    if (item.id == -1) return;
    if (
        item.id == target.id &&
        item.description == target.description &&
        item.p1 == target.p1 &&
        item.p2 == target.p2 &&
        item.p3 == target.p3 &&
        item.p4 == target.p4
    ) {
        player.inventory[targetIndex].quantity = player.inventory[targetIndex].quantity + ammount;
        player.inventory[index].quantity = player.inventory[index].quantity - ammount;
        if (player.inventory[index].quantity < 1) {
            player.inventory[index] = {
                id: -1,
                description: '',
                quantity: 0,
                p1: undefined,
                p2: undefined,
                p3: undefined,
                p4: undefined,
            };
        }

        fetchPrimary(player);
        return;
    }

    if (!split) {
        let copy = player.inventory[index];
        player.inventory[index] = player.inventory[targetIndex];
        player.inventory[targetIndex] = copy;
    } else {
        if (target.id != -1) return;
        if (ammount < 1) return;
        player.inventory[targetIndex] = { ...player.inventory[index], quantity: ammount };
        player.inventory[index].quantity = player.inventory[index].quantity - ammount;
    }
    fetchPrimary(player);
}

alt.onClient(InventoryEvents.moveSecondary, moveSecondary);

function moveSecondary(
    player: alt.Player,
    index: number,
    secondary_array: string,
    targetIndex: number,
    split: boolean
) {
    if (player.invSecondaryType === 'Ground') {
        const secondaryArray: Array<IGroundItems> = JSON.parse(secondary_array);

        const realIndex = groundItems.findIndex((val) => JSON.stringify(val) === JSON.stringify(secondaryArray[index]));

        if (realIndex < 0) {
            fetchSecondary(player);
            return;
        }

        const item = groundItems[realIndex];
        const target = secondaryArray[targetIndex];

        const ammount = split ? Math.floor(item.quantity / 2) : item.quantity;

        if (
            item.id == target.id &&
            item.description == target.description &&
            item.p1 == target.p1 &&
            item.p2 == target.p2 &&
            item.p3 == target.p3 &&
            item.p4 == target.p4
        ) {
            const realTarget = groundItems.findIndex(
                (val) => JSON.stringify(val) === JSON.stringify(secondaryArray[targetIndex])
            );
            if (realTarget < 0) {
                fetchSecondary(player);
                return;
            }
            groundItems[realIndex].quantity = groundItems[realIndex].quantity - ammount;
            groundItems[realTarget].quantity = groundItems[realTarget].quantity + ammount;

            secondaryArray[index].quantity = groundItems[realIndex].quantity;
            secondaryArray[targetIndex].quantity = groundItems[realTarget].quantity;

            if (groundItems[realIndex].quantity < 1) {
                secondaryArray[index] = {
                    id: -1,
                    description: '',
                    quantity: 0,
                    p1: undefined,
                    p2: undefined,
                    p3: undefined,
                    p4: undefined,
                    pos: new alt.Vector3(0, 0, 0),
                };
                groundItems[realIndex].marker.destroy();
                groundItems.splice(realIndex, 1);
            }
            fetchSecondary(player, JSON.stringify(secondaryArray));
            return;
        }
        if (!split) {
            let copy = secondaryArray[index];
            secondaryArray[index] = secondaryArray[targetIndex];
            secondaryArray[targetIndex] = copy;
        } else {
            if (target.id != -1) return;
            if (ammount < 1) return;
            const newIndex = addGroundItem({ pos: player.pos, ...item, quantity: ammount }, player, false);
            secondaryArray[targetIndex] = groundItems[newIndex];

            groundItems[realIndex].quantity = groundItems[realIndex].quantity - ammount;
            secondaryArray[index].quantity = groundItems[realIndex].quantity;
        }
        fetchSecondary(player, JSON.stringify(secondaryArray));
    }
}
