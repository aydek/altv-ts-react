import * as alt from 'alt-client';
import * as native from 'natives';
import { systems } from '../../systems';
import { InventoryEvents } from '@shared/enums/events/webviewEvents';

let open = false;
let ready = false;

export function setReady() {
    systems.webview.show('inventory', false);
    alt.emitServer(InventoryEvents.fetchConfig, 'Ground');
    ready = true;
}

export function isReady() {
    return ready;
}

export function isOpen() {
    return open;
}

export function closeInventory() {
    if (!isReady()) return;
    const webview = systems.webview.getInstance();
    alt.showCursor(false);
    alt.toggleGameControls(true);
    webview.emit(InventoryEvents.hide);
    open = false;
    native.displayHud(true);
    native.displayRadar(true);
    alt.emitServer(InventoryEvents.hide);
}

export function openInventory(secondary_type: string = 'Ground') {
    if (!isReady) return;
    const webview = systems.webview.getInstance();
    alt.toggleGameControls(false);
    alt.showCursor(true);
    open = true;
    alt.emitServer(InventoryEvents.fetchConfig, secondary_type);
    webview.emit(InventoryEvents.show);
    native.displayHud(false);
    native.displayRadar(false);
    alt.setCursorPos({ x: 900, y: 500 });
}
