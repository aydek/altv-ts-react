import * as alt from 'alt-client';
import * as native from 'natives';
import { systems } from '../../systems';

const player = alt.Player.local;

export function openCharSelect() {
    systems.webview.show('charSelect', true);

    native.setEntityVisible(player, false, false);
    native.triggerScreenblurFadeOut(500);
}
