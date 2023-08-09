import alt from 'alt-client';

export function logSystem(text: string) {
    alt.log(`[~g~System~w~] ${text}`);
}

export function logError(text: string) {
    alt.log(`[~r~Error~w~] ${text}`);
}
