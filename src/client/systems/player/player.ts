import { clearAnimations, playAnimation } from './animations/functions';
import { setModel, setTop } from './appearance/functions';

export const player = {
    appearance: {
        setModel: setModel,
        setTop: setTop,
    },
    animations: {
        play: playAnimation,
        clear: clearAnimations,
    },
};
