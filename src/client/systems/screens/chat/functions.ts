import * as alt from 'alt-client';
import { ChatEvents } from '@shared/enums/events/webviewEvents';
import { systems } from '../../systems';

export function initChat() {
    systems.webview.show('chat', false);
    alt.emitServer(ChatEvents.fetchCommands);
}
