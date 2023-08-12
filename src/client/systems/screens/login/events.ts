import * as alt from 'alt-client';
import * as native from 'natives';
import { DefaultEvents } from '@shared/enums/events/defaultEvents';
import { CSelectionEvents, LoginEvents } from '@shared/enums/events/webviewEvents';
import { systems } from '../../systems';
import { LOGIN_CORDS, LOGIN_HEADING } from '@shared/config';
import { getFronOfPoint } from '@shared/utility/vector';
import { utility } from '../../../utility/utility';
import Camera from '@/utility/camera/class';

const player = alt.Player.local;
const DISCORD_APP_ID = '955250749867175966';
let LOGIN_CAM: Camera;

export function getCameraInstance() {
    return LOGIN_CAM;
}

alt.onServer(DefaultEvents.playerConnect, handleLogin);
alt.onServer(LoginEvents.loginDone, handleLoginDone);

function handleLoginDone() {
    systems.screens.charSelect.open();
    alt.emitServer(CSelectionEvents.fetch);
}

async function handleLogin() {
    await systems.webview.load;
    const webview = systems.webview.getInstance();

    native.triggerScreenblurFadeIn(0);
    native.doScreenFadeOut(0);
    native.doScreenFadeIn(500);
    native.freezeEntityPosition(player, true);
    native.setEntityInvincible(player, true);
    native.setEntityVisible(player, false, false);
    native.displayRadar(false);

    native.setEntityCoords(player, LOGIN_CORDS.x, LOGIN_CORDS.y, LOGIN_CORDS.z, false, false, false, true);
    native.setEntityHeading(player, LOGIN_HEADING);
    LOGIN_CAM = new utility.camera(
        getFronOfPoint(
            new alt.Vector3(LOGIN_CORDS.x, LOGIN_CORDS.y, LOGIN_CORDS.z + 1),
            4,
            native.getEntityHeading(player)
        )
    );
    LOGIN_CAM.render();
    LOGIN_CAM.pointAtCoord(new alt.Vector3(LOGIN_CORDS.x, LOGIN_CORDS.y, LOGIN_CORDS.z + 1));

    systems.webview.show('login', true);
    systems.screens.notifications.init();

    webview.on(LoginEvents.loginBegin, handleDiscordLogin);

    async function handleDiscordLogin() {
        webview.off(LoginEvents.loginBegin, handleDiscordLogin);
        try {
            const token = await alt.Discord.requestOAuth2Token(DISCORD_APP_ID);
            alt.emitServer(LoginEvents.loginBegin, token);
        } catch (error) {
            alt.log(error);
            alt.emitServer(LoginEvents.loginBegin, undefined);
        }
    }
}
