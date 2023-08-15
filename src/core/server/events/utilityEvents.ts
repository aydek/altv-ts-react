import * as alt from 'alt-server';
import { NoclipEvents } from '../../shared/enums/events/utilityEvents';

alt.onClient(NoclipEvents.toogle, handleNoclip);
alt.onClient(NoclipEvents.visible, handleVisible);

function handleNoclip(player: alt.Player) {
    if (player.developer) {
        alt.emitClient(player, NoclipEvents.toogle);
    }
}

function handleVisible(player: alt.Player, state: boolean) {
    player.visible = state;
}
