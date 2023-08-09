import * as alt from 'alt-server';
import { ComponentVariation } from '../../../../shared/enums/clothing';
import { femaleTorsoCombos, maleTorsoCombos } from '../../../../shared/constants/clothing/torsoCombos';

export function setTop(player: alt.Player, top: number, toptexture: number, under: number, undertexture: number) {
    let sex = 0;
    if (player.model === alt.hash('mp_f_freemode_01')) {
        sex = 1;
    }

    player.setClothes(ComponentVariation.top, top, toptexture, 2);
    if (under == null) {
        under = 0;
        undertexture = 0;
    }
    if (sex === 1) {
        player.setClothes(ComponentVariation.torso, femaleTorsoCombos[top][under].torso, 0, 2);
        player.setClothes(
            ComponentVariation.undershirt,
            femaleTorsoCombos[top][under].undershirt,
            undertexture ? undertexture : 0,
            2
        );
        return;
    }
    player.setClothes(ComponentVariation.torso, maleTorsoCombos[top][under].torso, 0, 2);
    player.setClothes(
        ComponentVariation.undershirt,
        maleTorsoCombos[top][under].undershirt,
        undertexture ? undertexture : 0,
        2
    );
}

export function updatePlayerAppearance(player: alt.Player, customData: IDna | undefined = undefined) {
    const data = customData ? customData : player.dna;
    /**
     * DNA
     */
    player.setHeadBlendData(
        data.mother,
        data.father,
        0,
        data.mother,
        data.father,
        0,
        data.resemblance,
        data.skintone,
        0
    );
    /**
     * HAIR
     */
    if (data.hair > -1) player.setClothes(ComponentVariation.hair_style, data.hair, 0, 2);
    else player.setClothes(ComponentVariation.hair_style, 0, 0, 2);
    if (data.facialHair > -1) player.setHeadOverlay(1, data.facialHair, data.facialHairOpacity);
    else player.removeHeadOverlay(1);
    if (data.chestHairIndex > -1) player.setHeadOverlay(10, data.chestHairIndex, data.chestHairOpacity);
    else player.removeHeadOverlay(10);
    player.setHairColor(data.hairColor);
    player.setHairHighlightColor(data.highlightColor);
    player.setHeadOverlayColor(1, 1, data.facialHairColor, 0);
    player.setHeadOverlayColor(10, 1, data.chestHairColor, 0);
    /**
     * EYES
     */
    player.setEyeColor(data.eyesColor);
    if (data.eyebrows > -1) player.setHeadOverlay(2, data.eyebrows, data.eyebrowsOpacity / 100);
    else player.removeHeadOverlay(2);
    player.setHeadOverlayColor(2, 1, data.eyebrowsColor, 0);
    /**
     * FEATURES
     */
    data.features.map((value: number, i: number) => {
        player.setFaceFeature(i, value);
    });
    /**
     * APPEARANCE
     */
    for (let i = 0; i < data.appearance.length; i++) {
        if (i === 1 || i === 2) continue;

        if (data.appearance[i].index > -1)
            player.setHeadOverlay(i, data.appearance[i].index, data.appearance[i].opacity / 100);
        else player.removeHeadOverlay(i);
        if (i === 5) player.setHeadOverlayColor(5, 2, data.appearance[i].color, 0);
        if (i === 8) player.setHeadOverlayColor(8, 2, data.appearance[i].color, 0);
    }
}

export function updatePlayerClothes(player: alt.Player, sex: number, customData: IEquipment | undefined = undefined) {
    const data = customData ? customData : player.equipment;

    if (data.hats != undefined && data.hats[0] != -1) player.setProp(0, data.hats[0], data.hats[1]);
    else player.clearProp(0);

    if (data.glasses != undefined && data.glasses[0] != -1) player.setProp(1, data.glasses[0], data.glasses[1]);
    else player.clearProp(1);

    if (data.watches != undefined && data.watches[0] != -1) player.setProp(6, data.watches[0], data.watches[1]);
    else player.clearProp(6);

    if (data.ears != undefined && data.ears[0] != -1) player.setProp(2, data.ears[0], 0);
    else player.clearProp(2);

    if (data.bracelets != undefined && data.bracelets[0] != -1) player.setProp(7, data.bracelets[0], 0);
    else player.clearProp(7);

    if (data.tops != undefined && data.tops[0] != -1)
        setTop(player, data.tops[0], data.tops[1], data.tops[2], data.tops[3]);
    else setTop(player, 15, 0, 0, 0);

    if (data.pants != undefined && data.pants[0] != -1)
        player.setClothes(ComponentVariation.legs, data.pants[0], data.pants[1], 2);
    else player.setClothes(4, 14, 0, 2);

    if (data.shoes != undefined && data.shoes[0] != -1)
        player.setClothes(ComponentVariation.shoes, data.shoes[0], data.shoes[1], 2);
    else player.setClothes(6, 34 + sex, 0, 2);

    if (data.masks != undefined && data.masks[0] != -1)
        player.setClothes(ComponentVariation.mask, data.masks[0], data.masks[1], 2);
    else player.setClothes(1, 0, 0, 2);

    if (data.bags != undefined && data.bags[0] != -1)
        player.setClothes(ComponentVariation.bag, data.bags[0], data.bags[1], 2);
    else player.setClothes(5, 0, 0, 2);

    if (data.ties != undefined && data.ties[0] != -1)
        player.setClothes(ComponentVariation.accesories, data.ties[0], data.ties[1], 2);
    else player.setClothes(ComponentVariation.accesories, 0, 0, 2);

    let top = 15;
    if (data.tops != undefined && data.tops[0] != -1) top = data.tops[0];
    if (data.armours != undefined && data.armours[0] != -1) {
        if (sex === 0) player.setClothes(ComponentVariation.armors, maleTorsoCombos[top][0].armour, data.armours[1], 2);
        else player.setClothes(ComponentVariation.armors, femaleTorsoCombos[top][0].armour, data.armours[1], 2);
    } else player.setClothes(ComponentVariation.armors, 0, 0, 2);
}
