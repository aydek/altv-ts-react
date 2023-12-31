import alt from 'alt-server';

import { inventoryID, inventoryItems } from './config';
import { systems } from '../systems';
import { DEFAULT_INV_CAPACITY } from '@shared/config';
import { InventoryEvents } from '@shared/enums/events/webviewEvents';
import { NotificationIcons } from '@shared/enums/icons';
import { DefaultEvents } from '@shared/enums/events/defaultEvents';


export function addItem(player: alt.Player, id: number, description: string, quantity: number, p1: any = null, p2: any = null, p3: any = null, p4: any = null, targetIndex: number = -1) {
    const itemConfig = inventoryItems.find((item) => item.id === id);
    if (itemConfig && getInventoryWeight(player) + itemConfig.weight * quantity >= player.invCapacity + DEFAULT_INV_CAPACITY) return false;

    if (targetIndex === -1) {
        if (getFreeInventorySlots(player) < 1) return false;

        const result = player.inventory.findIndex((element) => isSameItem({ id, description, quantity, p1, p2, p3, p4 }, element));

        if (result > -1) {
            let item = player.inventory[result];
            if (item === undefined) return;
            const currentQty = `${item.quantity}`;
            const addedQty = `${quantity}`;
            item.quantity = parseInt(currentQty) + parseInt(addedQty);
            player.inventory[result] = item;
            alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
            return true;
        }
        const slot = player.inventory.findIndex((element) => element.id === -1);
        player.inventory[slot] = { id, description: fixDescription(description), quantity, p1, p2, p3, p4 };
        alt.emitClient(player, InventoryEvents.usedItem, id, quantity, systems.translate('INV_ADDED'));
        return true;
    }

    if (targetIndex > -1) {
        let item = player.inventory[targetIndex];
        if (item === undefined) return;
        if (item.id !== -1) {
            if (isSameItem({ id, description, quantity, p1, p2, p3, p4 }, item)) {
                item.quantity = item.quantity + quantity;
                player.inventory[targetIndex] = item;
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
        const itemConfig = inventoryItems[item.id];
        if (itemConfig === undefined) return;
        weight = weight + itemConfig.weight * parseInt(qantity);
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
    alt.emit(DefaultEvents.playerUseItem, player, index, quantity, update);

    const item = player.inventory[index];
    const itemid = typeof item.id === 'string' ? parseInt(item.id) : item.id;

    if (itemid === inventoryID.phone) {
        systems.notifications.show(player, NotificationIcons.info, 5000, 'You are using a phone...', 'Phone');
    }
}

export function isSameItem(first: IInventory, second: IInventory) {
    return first.id === second.id && first.description === second.description && first.p1 === second.p1 && first.p2 === second.p2 && first.p3 === second.p3 && first.p4 === second.p4;
}
