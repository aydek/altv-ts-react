import { playAnimation } from './animations/functions';
import { setTop, updatePlayerAppearance, updatePlayerClothes } from './appearance/functions';
import { loadCharacter, saveCharacter } from './database/functions';

export const player = {
    database: {
        character: {
            load: loadCharacter,
            save: saveCharacter,
        },
    },
    animations: {
        play: playAnimation,
    },
    appearance: {
        setTop: setTop,
        updateAppearance: updatePlayerAppearance,
        updateClothes: updatePlayerClothes,
    },
};
