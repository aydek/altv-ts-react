import { openCharacterCreator } from './charCreator/functions';
import { openCharSelect } from './charSelect/functions';
import { initChat } from './chat/functions';
import { setReady } from './inventory/functions';
import { getCameraInstance } from './login/events';
import { cancelNotification, initNotifications, showNotification } from './notifications/functions';
import { initHud } from './hud/functions';

export const screens = {
    login: {
        getCam: getCameraInstance,
    },
    charCreator: {
        open: openCharacterCreator,
    },
    charSelect: {
        open: openCharSelect,
    },
    chat: {
        init: initChat,
    },
    notifications: {
        init: initNotifications,
        show: showNotification,
        cancel: cancelNotification,
    },
    inventory: {
        init: setReady,
    },
    hud: {
        init: initHud,
    },
};
