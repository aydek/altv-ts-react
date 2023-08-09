import * as alt from 'alt-client';
import * as native from 'natives';
import { CREATOR_HEADING } from '../../../../shared/config';
import { systems } from '../../systems';
import { getFronOfPoint } from '../../../../shared/utility/vector';

let creatorOpen: boolean = false;

const player = alt.Player.local;

export async function openCharacterCreator() {
    const LOGIN_CAM = systems.screens.login.getCam();
    creatorOpen = true;
    native.setEntityHeading(player, CREATOR_HEADING);
    systems.webview.show('charCreator', true);
    systems.player.appearance.setModel('mp_m_freemode_01');
    const endPos = getFronOfPoint(alt.Player.local.pos, 2, CREATOR_HEADING);
    LOGIN_CAM.setPosition(new alt.Vector3(endPos.x, endPos.y, endPos.z));
    LOGIN_CAM.pointAtCoord(new alt.Vector3(alt.Player.local.pos.x, alt.Player.local.pos.y, alt.Player.local.pos.z));
    await alt.Utils.wait(100);
    native.setPedComponentVariation(player, 3, 15, 0, 2);
    native.setPedComponentVariation(player, 4, 14, 0, 2);
    native.setPedComponentVariation(player, 6, 5, 0, 2);
    native.setPedComponentVariation(player, 8, 15, 0, 2);
    native.setPedComponentVariation(player, 11, 15, 0, 2);
    systems.player.animations.play('abigail_mcs_2-0', 'prop_cs_frank_photo-0', -1, 2);
    await alt.Utils.wait(100);
    native.setEntityVisible(player, true, false);
    await alt.Utils.wait(100);
    native.doScreenFadeIn(500);
}

export function setCreatorOpen(state: boolean) {
    creatorOpen = state;
}

export function getCreatorOpen() {
    return creatorOpen;
}
