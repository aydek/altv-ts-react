import * as alt from 'alt-server';
import { femaleTorsoCombos, maleTorsoCombos } from '@shared/constants/clothing/torsoCombos';
import { ClothesComponent, PropComponent } from '@shared/enums/clothing';

export function setTop(player: alt.Player, top: number, toptexture: number, under: number, undertexture: number) {
    let sex = player.model === alt.hash('mp_f_freemode_01') ? 1 : 0;

    const topCombos = sex === 1 ? femaleTorsoCombos[top] : maleTorsoCombos[top];
    if (topCombos === undefined || topCombos[under] === undefined) return;
    const underCombos = topCombos[under];
    if (underCombos === undefined) return;
    const selectedTorso = underCombos.torso;
    const selectedUndershirt = underCombos.undershirt;

    player.setClothes(ClothesComponent.top, top, toptexture, 2);

    if (under == null) {
        under = 0;
        undertexture = 0;
    }

    player.setClothes(ClothesComponent.torso, selectedTorso, 0, 2);
    player.setClothes(ClothesComponent.undershirt, selectedUndershirt, undertexture || 0, 2);
}

export function updatePlayerAppearance(player: alt.Player, customData: IDna | undefined = undefined) {
    const data = customData ? customData : player.dna;

    // DNA
    player.setHeadBlendData(data.mother, data.father, 0, data.mother, data.father, 0, data.resemblance, data.skintone, 0);

    // HAIR//
    if (data.hair > -1) {
        player.setClothes(ClothesComponent.hair, data.hair, 0, 2);
    } else {
        //
        player.setClothes(ClothesComponent.hair, 0, 0, 2);
    }

    if (data.facialHair > -1) {
        player.setHeadOverlay(1, data.facialHair, data.facialHairOpacity);
    } else {
        player.removeHeadOverlay(1);
    }

    if (data.chestHairIndex > -1) {
        player.setHeadOverlay(10, data.chestHairIndex, data.chestHairOpacity);
    } else {
        player.removeHeadOverlay(10);
    }

    player.setHairColor(data.hairColor);
    player.setHairHighlightColor(data.highlightColor);
    player.setHeadOverlayColor(1, 1, data.facialHairColor, 0);
    player.setHeadOverlayColor(10, 1, data.chestHairColor, 0);

    // EYES
    player.setEyeColor(data.eyesColor);

    if (data.eyebrows > -1) {
        player.setHeadOverlay(2, data.eyebrows, data.eyebrowsOpacity / 100);
    } else {
        player.removeHeadOverlay(2);
    }

    player.setHeadOverlayColor(2, 1, data.eyebrowsColor, 0);

    // FEATURES
    data.features.forEach((value: number, i: number) => {
        player.setFaceFeature(i, value);
    });

    // APPEARANCE
    for (let i = 0; i < data.appearance.length; i++) {
        if (i === 1 || i === 2) continue;

        const appearanceEntry = data.appearance[i];
        if (appearanceEntry && appearanceEntry.index > -1) {
            player.setHeadOverlay(i, appearanceEntry.index, appearanceEntry.opacity / 100);
        } else {
            player.removeHeadOverlay(i);
        }

        if (appearanceEntry && i === 5) {
            player.setHeadOverlayColor(5, 2, appearanceEntry.color, 0);
        }

        if (appearanceEntry && i === 8) {
            player.setHeadOverlayColor(8, 2, appearanceEntry.color, 0);
        }
    }
}

export function updatePlayerClothes(player: alt.Player, sex: number, customData: IEquipment | undefined = undefined) {
    const data = customData ? customData : player.equipment;

    if (data.hats !== undefined && data.hats[0] !== -1) {
        player.setProp(PropComponent.hat, data.hats[0], data.hats[1]);
    } else {
        player.clearProp(PropComponent.hat);
    }

    if (data.glasses !== undefined && data.glasses[0] !== -1) {
        player.setProp(PropComponent.glasses, data.glasses[0], data.glasses[1]);
    } else {
        player.clearProp(PropComponent.glasses);
    }

    if (data.watches !== undefined && data.watches[0] !== -1) {
        player.setProp(PropComponent.watch, data.watches[0], data.watches[1]);
    } else {
        player.clearProp(PropComponent.watch);
    }

    if (data.ears !== undefined && data.ears[0] !== -1) {
        player.setProp(PropComponent.ears, data.ears[0], 0);
    } else {
        player.clearProp(PropComponent.ears);
    }

    if (data.bracelets !== undefined && data.bracelets[0] !== -1) {
        player.setProp(PropComponent.bracelet, data.bracelets[0], 0);
    } else {
        player.clearProp(PropComponent.bracelet);
    }

    if (data.tops && data.tops[0] !== -1) {
        setTop(player, data.tops[0], data.tops[1], data.tops[2], data.tops[3]);
    } else {
        setTop(player, 15, 0, 0, 0);
    }

    if (data.pants !== undefined && data.pants[0] !== -1) {
        player.setClothes(ClothesComponent.legs, data.pants[0], data.pants[1], 2);
    } else {
        player.setClothes(ClothesComponent.legs, 14, 0, 2);
    }

    if (data.shoes !== undefined && data.shoes[0] !== -1) {
        player.setClothes(ClothesComponent.shoes, data.shoes[0], data.shoes[1], 2);
    } else {
        player.setClothes(ClothesComponent.shoes, 34 + sex, 0, 2);
    }

    if (data.masks !== undefined && data.masks[0] !== -1) {
        player.setClothes(ClothesComponent.mask, data.masks[0], data.masks[1], 2);
    } else {
        player.setClothes(ClothesComponent.mask, 0, 0, 2);
    }

    if (data.bags !== undefined && data.bags[0] !== -1) {
        player.setClothes(ClothesComponent.bag, data.bags[0], data.bags[1], 2);
    } else {
        player.setClothes(5, 0, 0, 2);
    }

    if (data.ties !== undefined && data.ties[0] !== -1) {
        player.setClothes(ClothesComponent.accesory, data.ties[0], data.ties[1], 2);
    } else {
        player.setClothes(ClothesComponent.accesory, 0, 0, 2);
    }

    let top = 15;
    if (data.tops !== undefined && data.tops[0] !== -1) {
        top = data.tops[0];
    }

    const combos = sex === 0 ? maleTorsoCombos[top] : femaleTorsoCombos[top];
    if (combos === undefined) return;
    const armour = combos[0]?.armour;

    if (data.armours !== undefined && data.armours[0] !== -1) {
        player.setClothes(9, armour as number, data.armours[1], 2);
    } else player.setClothes(9, 0, 0, 2);
}
