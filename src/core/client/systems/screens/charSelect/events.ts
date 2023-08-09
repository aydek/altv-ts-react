import * as alt from 'alt-client';
import * as native from 'natives';
import { systems } from '../../systems';
import { CSelectionEvents } from '../../../../shared/enums/events/webviewEvents';
import { CREATOR_CORDS, CREATOR_HEADING } from '../../../../shared/config';
import { DefaultEvents } from '../../../../shared/enums/events/defaultEvents';

const webview = systems.webview.getInstance();
const player = alt.Player.local;

webview.on(CSelectionEvents.view, handleView);
webview.on(CSelectionEvents.create, handleCreate);
webview.on(CSelectionEvents.play, handlePlay);
alt.onServer(CSelectionEvents.fetch, handleServerFetch);

async function handleView(id: string) {
    alt.emitServer(CSelectionEvents.view, id);
    native.setEntityHeading(player, 267.0);
    await alt.Utils.wait(500);
    native.setEntityVisible(player, true, false);
}

async function handleCreate() {
    systems.webview.hide('charSelect', true);
    native.setEntityVisible(player, false, false);
    native.doScreenFadeOut(1000);
    await alt.Utils.wait(1100);
    native.setEntityCoords(player, CREATOR_CORDS.x, CREATOR_CORDS.y, CREATOR_CORDS.z, true, true, true, false);
    native.setEntityHeading(player, CREATOR_HEADING);
    await alt.Utils.wait(200);
    systems.screens.charCreator.open();
}

async function handlePlay(id: string) {
    const LOGIN_CAM = systems.screens.login.getCam();
    systems.webview.hide('charSelect', true);
    native.doScreenFadeOut(1000);

    await alt.Utils.wait(1200);

    LOGIN_CAM.destroy();
    alt.toggleGameControls(true);
    native.setEntityInvincible(player, false);
    native.setEntityVisible(player, true, false);
    native.displayRadar(true);
    systems.player.animations.clear();
    alt.emitServer(CSelectionEvents.play, id);

    await alt.Utils.wait(500);

    native.freezeEntityPosition(player, false);
    native.doScreenFadeIn(1000);
    alt.emit(DefaultEvents.playerSpawn);
}

function handleServerFetch(data: string, charactersAllowed: number) {
    webview.emit(CSelectionEvents.fetch, data, charactersAllowed);
}
