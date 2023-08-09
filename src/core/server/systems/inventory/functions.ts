import alt from 'alt-server';

import { equipmentItems, inventoryItems } from './config';
import { systems } from '../systems';
import { DEFAULT_INV_CAPACITY } from '../../../shared/config';
import { InventoryEvents } from '../../../shared/enums/events/webviewEvents';
import { fetchPrimary, removeItem } from './events';
import { NotificationIcons } from '../../../shared/enums/icons';

export function addInventoryItem(
    player: alt.Player,
    id: number,
    description: string,
    quantity: number,
    p1: any = undefined,
    p2: any = undefined,
    p3: any = undefined,
    p4: any = undefined,
    targetIndex: number = -1
) {
    if (getInventoryWeight(player) + inventoryItems[id].weight * quantity >= player.invCapacity + DEFAULT_INV_CAPACITY)
        return false;
    if (targetIndex === -1) {
        if (getFreeInventorySlots(player) < 1) return false;

        const result = player.inventory.findIndex(
            (element) =>
                element.id == id &&
                element.description == description &&
                element.p1 == p1 &&
                element.p2 == p2 &&
                element.p3 == p3 &&
                element.p4 == p4
        );

        if (result > -1) {
            const currentQty = `${player.inventory[result].quantity}`;
            const addedQty = `${quantity}`;
            player.inventory[result].quantity = parseInt(currentQty) + parseInt(addedQty);
            alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
            return true;
        }
        const slot = player.inventory.findIndex((element) => element.id === -1);
        player.inventory[slot] = { id, description: fixDescription(description), quantity, p1, p2, p3, p4 };
        alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
        return true;
    }

    if (targetIndex > -1) {
        if (player.inventory[targetIndex].id != -1) {
            const item = player.inventory[targetIndex];
            if (
                id == item.id &&
                description == item.description &&
                p1 == item.p1 &&
                p2 == item.p2 &&
                p3 == item.p3 &&
                p4 == item.p4
            ) {
                player.inventory[targetIndex].quantity = player.inventory[targetIndex].quantity + quantity;
                alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
                return true;
            }
            const slot = player.inventory.findIndex((element) => element.id === -1);
            player.inventory[slot] = { id, description: fixDescription(description), quantity, p1, p2, p3, p4 };
            alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
            return true;
        }
        player.inventory[targetIndex] = { id, description: fixDescription(description), quantity, p1, p2, p3, p4 };
        alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
        return true;
    }
    return false;
}

function fixDescription(str: string) {
    if (str.length < 20) return str;
    if (str.length > 40 && str.includes(' ')) return str.slice(0, 40);
    if (str.length > 20 && !str.includes(' ')) return str.slice(0, 20) + ' ' + str.slice(20, str.length);
    if (str.length > 20 && str.includes(' ')) return str;
    return str;
}

export function getInventoryWeight(player: alt.Player): number {
    let weight = 0;
    player.inventory.forEach((item) => {
        if (item.id == -1) return;
        const qantity = `${item.quantity}`;
        weight = weight + inventoryItems[item.id].weight * parseInt(qantity);
    });
    return weight;
}

function getFreeInventorySlots(player: alt.Player): number {
    let count = 0;
    player.inventory.forEach((item) => {
        if (item.id === -1) count = count + 1;
    });
    return count;
}

export function useItem(player: alt.Player, index: number, quantity: number = 1, update: boolean = true) {
    const item = player.inventory[index];
    if (item.id == -1) return;
    const equipment = player.equipment;
    let remove = true;
    const itemid = typeof item.id === 'string' ? parseInt(item.id) : item.id;
    if (itemid === equipmentItems.top) {
        if (equipment.tops[0] !== -1 && equipment.tops !== undefined) {
            if (
                !addInventoryItem(
                    player,
                    itemid,
                    equipment.tops[4],
                    1,
                    equipment.tops[0],
                    equipment.tops[1],
                    equipment.tops[2],
                    equipment.tops[3]
                )
            ) {
                systems.notifications.show(
                    player,
                    NotificationIcons.error,
                    5000,
                    systems.translate('INV_CLEAN_YOUR_INV'),
                    'Error'
                );
                return;
            }
        }
        player.equipment.tops = [item.p1, item.p2, item.p3, item.p4, item.description];
        systems.player.appearance.updateClothes(player, player.dna.sex);
    } else if (itemid >= 0 && itemid <= 11) {
        const key = inventoryItems[itemid].img;
        if (equipment[key][0] !== -1 && equipment[key] !== undefined) {
            if (!addInventoryItem(player, itemid, equipment[key][2], 1, equipment[key][0], equipment[key][1])) {
                systems.notifications.show(
                    player,
                    NotificationIcons.error,
                    5000,
                    systems.translate('INV_CLEAN_YOUR_INV'),
                    'Error'
                );
                return;
            }
        }
        player.equipment[key] = [item.p1, item.p2, item.description];
        systems.player.appearance.updateClothes(player, player.dna.sex);
    } else if (itemid === equipmentItems.phone) {
        remove = false;
        update = false;
        systems.notifications.show(player, NotificationIcons.info, 5000, 'You are using a phone...', 'Phone');
    } else {
        alt.logError(`[inv] UseItem item index (${index}) not found!`);
        return;
    }

    if (remove) {
        removeItem(player, index, quantity);
    } else alt.emitClient(player, InventoryEvents.usedItem, item.id, quantity, systems.translate('INV_USED'));

    if (update) {
        fetchPrimary(player);
    }
}
