import { logError } from "alt-server";
import { logSystem } from "./logs/functions";

export const utility = {
    log: {
        error: logError,
        system: logSystem,
    },
};
