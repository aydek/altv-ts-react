import * as alt from 'alt-client';
import { systems } from '../systems/systems';
import { DefaultEvents } from '@shared/enums/events/defaultEvents';

alt.on('disconnect', handleDisconnect);
alt.on(DefaultEvents.playerSpawn, handlePlayerSpawn);

function handleDisconnect() {
    const webview = systems.webview.getInstance();
    if (webview) webview.destroy();
}

function handlePlayerSpawn() {
    systems.screens.chat.init();
    systems.screens.inventory.init();
    systems.screens.speedometer.init();
    systems.screens.notifications.init();
    systems.screens.notifications.show('info', 5000, 'Connected', 'Welcome to the server');
}
