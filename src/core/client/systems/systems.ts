import { LANG } from '../../shared/locales/language';
import { TRANSLATE } from '../../shared/locales/locales';
import { player } from './player/player';
import { screens } from './screens/screens';
import { getServerTime } from './timeweather/timeweather';
import { WebViewHide, WebviewInstance, WebviewShow, loadWebview } from './webview/functions';

export const systems = {
    translate: <T extends keyof typeof TRANSLATE>(key: T) => TRANSLATE[key][LANG],
    player: player,
    screens: screens,

    webview: {
        load: loadWebview,
        getInstance: WebviewInstance,
        show: WebviewShow,
        hide: WebViewHide,
    },
    timeweather: {
        getTime: getServerTime,
    },
};
