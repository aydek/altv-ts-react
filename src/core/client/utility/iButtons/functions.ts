import * as alt from 'alt-client';
import * as native from 'natives';

let interval: number | undefined;
let buttons: { text: string; input: string; input2?: string }[] = [];
let scaleform: number | undefined;

native.displayOnscreenKeyboard(0, 'FMMC_KEY_TIP8', '', '', '', '', '', 128);

function draw() {
    if (buttons.length <= 0) {
        return;
    }

    if (!scaleform) {
        return;
    }

    // Offset alt:V Logo
    native.drawScaleformMovie(scaleform, 0.4, 0.48, 1, 1, 255, 255, 255, 255, 0);
}

async function setFunc(_buttons: { text: string; input: string; input2?: string }[]) {
    buttons = _buttons;

    if (buttons.length <= 0) {
        return;
    }

    if (scaleform) {
        native.setScaleformMovieAsNoLongerNeeded(scaleform);
        scaleform = undefined;
    }

    scaleform = native.requestScaleformMovie('INSTRUCTIONAL_BUTTONS');

    await alt.Utils.waitFor(() => native.hasScaleformMovieLoaded(scaleform as number));

    native.beginScaleformMovieMethod(scaleform, 'CLEAR_ALL');
    native.endScaleformMovieMethod();

    for (let i = 0; i < buttons.length; i++) {
        const btn = buttons[i];
        if (!btn) {
            return;
        }
        native.beginScaleformMovieMethod(scaleform, 'SET_DATA_SLOT');
        native.scaleformMovieMethodAddParamInt(i);
        native.scaleformMovieMethodAddParamPlayerNameString(btn.input);
        if (btn.input2) native.scaleformMovieMethodAddParamPlayerNameString(btn.input2);
        native.scaleformMovieMethodAddParamTextureNameString(btn.text);
        native.endScaleformMovieMethod();
    }

    native.beginScaleformMovieMethod(scaleform, 'DRAW_INSTRUCTIONAL_BUTTONS');
    native.endScaleformMovieMethod();

    if (interval) {
        return;
    }

    interval = alt.setInterval(draw, 0);
}

function clearFunc() {
    if (interval) {
        alt.clearInterval(interval);
        interval = undefined;
    }

    if (scaleform) {
        native.setScaleformMovieAsNoLongerNeeded(scaleform);
    }
    scaleform = undefined;
    buttons = [];
}

export function showButtons(options: {
    set?: Array<{ text: string; input: string; input2?: string }>;
    clear?: boolean;
}) {
    if (typeof options !== 'object') {
        return;
    }

    const { set, clear } = options;

    if (set) {
        setFunc(set);
    }

    if (clear) {
        clearFunc();
    }
}
