import * as alt from 'alt-client';
import { AppearanceEvents } from '../../../../shared/enums/events/appieranceEvents';

export function setTop(top: number, texture: number, undershir: number, undertexture: number) {
    alt.emitServer(AppearanceEvents.setTop, top, texture, undershir, undertexture);
}

export function setModel(model: string) {
    alt.emitServer(AppearanceEvents.model, model);
}
