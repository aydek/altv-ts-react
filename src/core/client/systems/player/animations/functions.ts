import * as alt from 'alt-client';
import * as native from 'natives';
import { AnimationFlags } from '../../../../shared/enums/flags';

const player = alt.Player.local;

export function clearAnimations() {
    native.clearPedTasks(player);
    if (!alt.Player.local.vehicle) {
        native.clearPedSecondaryTask(player);
    }
}

export async function playAnimation(
    dict: string,
    name: string,
    duration: number = -1,
    flag: number = AnimationFlags.cancelable
) {
    native.clearPedTasks(player);
    native.clearPedSecondaryTask(player);
    await alt.Utils.requestAnimDict(dict);

    native.taskPlayAnim(player, dict, name, 8.0, 8.0, duration, flag, 0, false, false, false);
}
