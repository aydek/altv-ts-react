import * as alt from 'alt-client';
import { WebViewEvents } from '@shared/enums/events/webviewEvents';
import { utility } from '../../utility/utility';

export const WEBVIEW: alt.WebView = new alt.WebView(
    alt.debug ? 'http://localhost:3000/' : 'http://assets/webviews/index.html'
);

export const loadWebview = new Promise(async (resolve, reject) => {
    try {
        await new Promise((innerResolve: (...args: any[]) => void) => {
            WEBVIEW.once('load', innerResolve);
        });

        WEBVIEW.focus();
        utility.log.system('Webview loaded...');

        resolve(true);
    } catch (error) {
        reject(error);
    }
});

export const WebviewInstance = () => {
    return WEBVIEW;
};

let isClicableOpen: boolean = false;
let currentClicablePage: string = '';

export const WebviewShow = (name: string, clickable: boolean = false) => {
    WEBVIEW.emit(WebViewEvents.displayPage, name);
    if (clickable) {
        if (isClicableOpen) {
            WEBVIEW.emit(WebViewEvents.hidePage, currentClicablePage);
            currentClicablePage = name;
            return;
        }
        currentClicablePage = name;
        alt.showCursor(true);
        alt.toggleGameControls(false);
        isClicableOpen = true;
    }
};

export const WebViewHide = (name: string, clickable: boolean = false) => {
    WEBVIEW.emit(WebViewEvents.hidePage, name);
    if (clickable) {
        alt.showCursor(false);
        alt.toggleGameControls(true);
        isClicableOpen = false;
        currentClicablePage = '';
    }
};
