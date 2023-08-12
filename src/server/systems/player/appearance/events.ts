import * as alt from 'alt-server';
import { AppearanceEvents } from '@shared/enums/events/appieranceEvents';
import { systems } from '../../systems';

alt.onClient(AppearanceEvents.model, handleModelChange);
alt.onClient(AppearanceEvents.setTop, handleSetTop);

function handleModelChange(player: alt.Player, model: string) {
    player.model = model;
}

function handleSetTop(player: alt.Player, top: number, texture: number, undershirt: number, undertexture: number) {
    systems.player.appearance.setTop(player, top, texture, undershirt, undertexture);
}
