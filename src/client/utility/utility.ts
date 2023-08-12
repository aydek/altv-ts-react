import Camera from './camera/class';
import { logError, logSystem } from './logs/functions';

export const utility = {
    camera: Camera,
    log: {
        system: logSystem,
        error: logError,
    },
};
