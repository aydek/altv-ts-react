import { systems } from '../../systems';
import { NotificationEvents } from '../../../../shared/enums/events/webviewEvents';

export function initNotifications() {
    systems.webview.show('notifications', false);
}

export function showNotification(type: string, hide: number, title: string, message: string) {
    const webview = systems.webview.getInstance();
    webview.emit(NotificationEvents.show, type, hide, title, message);
}
