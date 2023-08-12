import * as alt from 'alt-client';
import { AnimationEvents } from '@shared/enums/events/appieranceEvents';
import { systems } from '../../systems';

alt.onServer(AnimationEvents.playAnimation, handlePlayAnimation);

function handlePlayAnimation(dict: string, name: string, duration: number, flag: number) {
    systems.player.animations.play(dict, name, duration, flag);
}
