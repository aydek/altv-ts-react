import * as alt from 'alt-client';
import { ChatEvents } from '../../../../shared/enums/events/webviewEvents';
import { systems } from '../../systems';

let chatOpen = false;

const webview = systems.webview.getInstance();

webview.on(ChatEvents.input, handleInput);
webview.on(ChatEvents.toggle, handleChatToggle);
webview.on(ChatEvents.updateSize, handleSizeUpdate);

function handleChatToggle(state: boolean = false) {
    if (state) {
        alt.showCursor(true);
        alt.toggleGameControls(false);
    } else {
        alt.showCursor(false);
        alt.toggleGameControls(true);
    }
    chatOpen = state;
}

function handleInput(input: string) {
    alt.emitServer(ChatEvents.input, input);
}

function handleSizeUpdate(width: number, height: number) {
    alt.emitServer(ChatEvents.updateSize, width, height);
}

alt.onServer(ChatEvents.fetchCommands, handleFetchCommands);
alt.onServer(ChatEvents.pushLine, handlePushLine);
alt.onServer(ChatEvents.setSize, handleSetSize);

function handleFetchCommands(data: string) {
    webview.emit(ChatEvents.fetchCommands, data);
}

function handlePushLine(text: string, icon?: string) {
    webview.emit(ChatEvents.pushLine, `{#f4f4f4} ${text}`, icon);
}

function handleSetSize(width: number, height: number) {
    webview.emit(ChatEvents.setSize, width, height);
}

alt.on('keyup', (key: number) => {
    if (!chatOpen && (key === 0x54 || key === 0xbf) && alt.gameControlsEnabled()) {
        // T
        chatOpen = true;
        webview.emit(ChatEvents.toggle, true);
        alt.showCursor(true);
        alt.toggleGameControls(false);
    } else if (chatOpen && key == 0x1b) {
        //esc
        chatOpen = false;
        webview.emit(ChatEvents.toggle, false);
        alt.showCursor(false);
        alt.toggleGameControls(true);
    }

    if (key == 0x76) {
        //F7
        //hidechat??
    }
});
