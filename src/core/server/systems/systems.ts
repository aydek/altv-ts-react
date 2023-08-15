import { LANG } from '../../shared/locales/language';
import { TRANSLATE } from '../../shared/locales/locales';
import {
    broadcastChatMessage,
    getAvailableCommand,
    invokeCmd,
    registerCommand,
    sendChatMessage,
} from './chat/fucntions';
import { player } from './player/player';
import { changeWeather, getCurrentTime, getCurrentWeather, lockWeather, setCurentTime } from './timeweather/functions';
import { showNotification } from './notifications/functions';
import { addItem } from './inventory/functions';

export const systems = {
    chat: {
        registerCommand: registerCommand,
        invoke: invokeCmd,
        send: sendChatMessage,
        broadcast: broadcastChatMessage,
        allCommands: getAvailableCommand,
    },
    timeweather: {
        lock: lockWeather,
        getTime: getCurrentTime,
        getWeather: getCurrentWeather,
        setTime: setCurentTime,
        changeWeather: changeWeather,
    },
    player: player,
    notifications: {
        show: showNotification,
    },
    inventory: {
        addItem: addItem,
    },
    translate: <T extends keyof typeof TRANSLATE>(key: T) => (TRANSLATE[key] as Record<typeof LANG, string>)[LANG],
};
