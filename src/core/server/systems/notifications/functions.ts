import * as alt from 'alt-server';
import { NotificationEvents } from '../../../shared/enums/events/webviewEvents';

export function showNotification(player: alt.Player, type: string, hide: number, title: string, message: string) {
    alt.emitClient(player, NotificationEvents.show, type, hide, title, message);
}

export function cancelNotification(player: alt.Player, searchText : string) {
    alt.emitClient(player, NotificationEvents.cancel, searchText);
}
