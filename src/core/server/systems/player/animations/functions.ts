import * as alt from 'alt-server';
import { AnimationEvents } from '../../../../shared/enums/events/appieranceEvents';
import { AnimationFlags } from '../../../../shared/enums/flags';

export function playAnimation(
    player: alt.Player,
    dict: string,
    name: string,
    duration: number = -1,
    flag: number = AnimationFlags.cancelable
) {
    alt.emitClient(player, AnimationEvents.playAnimation, dict, name, duration, flag);
}
