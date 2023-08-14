import Camera from './camera/class';
import { showButtons } from './iButtons/functions';
import { logError, logSystem } from './logs/functions';

export const utility = {
    camera: Camera,
    log: {
        system: logSystem,
        error: logError,
    },
    buttons: {
        show: showButtons,
        hide: () => showButtons({ clear: true }),
    },
};
