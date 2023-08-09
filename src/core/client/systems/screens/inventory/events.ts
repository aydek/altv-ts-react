import * as alt from 'alt-client';
import { systems } from '../../systems';
import { InventoryEvents } from '../../../../shared/enums/events/webviewEvents';
import { closeInventory, isOpen, isReady, openInventory } from './functions';

const webview = systems.webview.getInstance();

webview.on(InventoryEvents.fetchAll, fetchAll);
webview.on(InventoryEvents.fetchSecondary, fetchSecondary);
webview.on(InventoryEvents.updateItems, updateItems);
webview.on(InventoryEvents.removeItem, removeItem);
webview.on(InventoryEvents.removeEquipment, removeEquipment);
webview.on(InventoryEvents.useItem, useItem);
webview.on(InventoryEvents.itemPickup, handleItemPickup);
webview.on(InventoryEvents.itemDrop, handleItemDrop);
webview.on(InventoryEvents.movePrimary, movePrimary);
webview.on(InventoryEvents.moveSecondary, moveSecondary);

function fetchAll() {
    alt.emitServer(InventoryEvents.fetchAll);
}

function fetchSecondary() {
    alt.emitServer(InventoryEvents.fetchSecondary);
}

function updateItems(data: string) {
    alt.emitServer(InventoryEvents.updateItems, data);
}

function removeItem(id: number, qty: number) {
    alt.emitServer(InventoryEvents.removeItem, id, qty);
}

function removeEquipment(key: string) {
    alt.emitServer(InventoryEvents.removeEquipment, key);
}

function useItem(id: number, qty: number = 1) {
    alt.emitServer(InventoryEvents.useItem, id, qty);
}

function handleItemPickup(
    index: number,
    secondary_array: string,
    targetIndex: number,
    split: boolean,
    stack: boolean = false
) {
    alt.emitServer(InventoryEvents.itemPickup, index, secondary_array, targetIndex, split, stack);
}

function handleItemDrop(
    index: number,
    secondary_array: string,
    targetIndex: number,
    split: boolean,
    stack: boolean = false
) {
    alt.emitServer(InventoryEvents.itemDrop, index, secondary_array, targetIndex, split, stack);
}

function movePrimary(index: number, target: number, split: boolean) {
    alt.emitServer(InventoryEvents.movePrimary, index, target, split);
}

function moveSecondary(index: number, secondary_array: string, target: number, split: boolean) {
    alt.emitServer(InventoryEvents.moveSecondary, index, secondary_array, target, split);
}

alt.onServer(InventoryEvents.fetchConfig, returnConfig);
alt.onServer(InventoryEvents.fetchPrimary, returnPrimary);
alt.onServer(InventoryEvents.fetchSecondary, returnSecondary);
alt.onServer(InventoryEvents.usedItem, usedItem);

function returnConfig(data: string, secondary_type: string) {
    webview.emit(InventoryEvents.fetchConfig, data, secondary_type);
}

function returnPrimary(data: string, capacity: number, equipment: string, firstRun = false) {
    webview.emit(InventoryEvents.fetchPrimary, data, capacity, equipment, firstRun);
}

function returnSecondary(secondary_array: string, secondary_capacity: number) {
    webview.emit(InventoryEvents.fetchSecondary, secondary_array, secondary_capacity);
}

function usedItem(id: number, qantity: number, text: string) {
    webview.emit(InventoryEvents.usedItem, id, qantity, text);
}

let presstime = 0;
let timeOut = Date.now();

alt.on('keyup', (key: number) => {
    if (!isReady()) return;
    if (key === 0x09) {
        //**TAB */
        if (!isOpen() && alt.gameControlsEnabled()) {
            if (Date.now() - presstime < 500) openInventory();
            webview.emit(InventoryEvents.hideShortcuts);
        } else if (isOpen() && !alt.gameControlsEnabled()) closeInventory();
        return;
    }
    if (isOpen() && !alt.gameControlsEnabled() && key == 0x1b && isReady()) {
        //**ESC */
        closeInventory();
        return;
    }
    if (!alt.gameControlsEnabled() || timeOut > Date.now()) return;

    if (key === 0x31) {
        //1
        alt.emitServer(InventoryEvents.useItem, 0, 1, false);
        timeOut = Date.now() + 1000;
    }
    if (key === 0x32) {
        //2
        alt.emitServer(InventoryEvents.useItem, 1, 1, false);
        timeOut = Date.now() + 1000;
    }
    if (key === 0x33) {
        //3
        alt.emitServer(InventoryEvents.useItem, 2, 1, false);
        timeOut = Date.now() + 1000;
    }
    if (key === 0x34) {
        //4
        alt.emitServer(InventoryEvents.useItem, 3, 1, false);
        timeOut = Date.now() + 1000;
    }
});

alt.on('keydown', (key: number) => {
    if (!isReady()) return;
    if (key === 0x09) {
        //tab

        if (!isOpen() && alt.gameControlsEnabled()) {
            webview.emit(InventoryEvents.showShortcuts);
            presstime = Date.now();
        }
    }
});
