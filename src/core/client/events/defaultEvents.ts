import * as alt from 'alt-client';
import { systems } from '../systems/systems';

alt.on('disconnect', handleDisconnect);

function handleDisconnect() {
    const webview = systems.webview.getInstance();
    if (!webview) webview.destroy();
}
