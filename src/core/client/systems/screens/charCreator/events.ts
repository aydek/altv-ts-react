import * as alt from 'alt-client';
import * as native from 'natives';
import { systems } from '../../systems';
import { getCreatorOpen, setCreatorOpen } from './functions';
import { CCreatorEvents, CSelectionEvents } from '../../../../shared/enums/events/webviewEvents';
import { CREATOR_HEADING, LOGIN_CORDS, LOGIN_HEADING } from '../../../../shared/config';
import { getFronOfPoint } from '../../../../shared/utility/vector';
import { IAppearanceState, IClothesState, IEyesState, IFeaturesState, IHairState } from './interfaces';
import { PROPS_MALE_HATS } from '../../../../shared/constants/clothing/props_male_hats';
import { PROPS_FEMALE_HATS } from '../../../../shared/constants/clothing/props_female_hats';
import { PROPS_MALE_GLASSES } from '../../../../shared/constants/clothing/props_male_glasses';
import { PROPS_FEMALE_GLASSES } from '../../../../shared/constants/clothing/props_female_glasses';
import { PROPS_MALE_WATCHES } from '../../../../shared/constants/clothing/props_male_watches';
import { PROPS_FEMALE_WATCHES } from '../../../../shared/constants/clothing/props_female_watches';
import { PROPS_MALE_EARS } from '../../../../shared/constants/clothing/props_male_ears';
import { PROPS_FEMALE_EARS } from '../../../../shared/constants/clothing/props_female_ears';
import { PROPS_MALE_BRACELETS } from '../../../../shared/constants/clothing/props_male_bracelets';
import { PROPS_FEMALE_BRACELETS } from '../../../../shared/constants/clothing/props_female_bracelets';
import { femaleTorsoCombos, maleTorsoCombos } from '../../../../shared/constants/clothing/torsoCombos';
import { MALE_TOPS } from '../../../../shared/constants/clothing/male_tops';
import { MALE_UNDERSHIRTS } from '../../../../shared/constants/clothing/male_undershirts';
import { FEMALE_TOPS } from '../../../../shared/constants/clothing/female_tops';
import { FEMALE_UNDERSHIRTS } from '../../../../shared/constants/clothing/female_undershirts';
import { MALE_LEGS } from '../../../../shared/constants/clothing/male_legs';
import { FEMALE_LEGS } from '../../../../shared/constants/clothing/female_legs';
import { MALE_SHOES } from '../../../../shared/constants/clothing/male_shoes';
import { FEMALE_SHOES } from '../../../../shared/constants/clothing/female_shoes';
import { defaultData } from './defaultData';

const webview = systems.webview.getInstance();
const player = alt.Player.local;
let allowRotation: boolean = true;
let dataSex: number = 0;
let initialHeading: number = CREATOR_HEADING;
let addedHeading: number = 0;
let parentData = defaultData.parentData;
let hairData = defaultData.hairData;
let eyesData = defaultData.eyesData;
let featuresData = {
    featureValue: defaultData.featureValue,
};
let appearanceData = {
    appearanceValue: defaultData.appearanceValue,
};

let equipment = defaultData.equipment;

webview.on(CCreatorEvents.allowRotation, handleAllowRotation);
webview.on(CCreatorEvents.exit, handleExit);
webview.on(CCreatorEvents.changeCam, handleChangeCam);
webview.on(CCreatorEvents.updateData, handleUpdateData);

function handleAllowRotation(allow: boolean) {
    allowRotation = allow;
}

async function handleExit(reason: string = 'back', firstname: string = '', lastname: string = '', age: number = 20) {
    const LOGIN_CAM = systems.screens.login.getCam();
    allowRotation = true;
    native.doScreenFadeOut(1000);
    systems.webview.hide('charCreator', true);
    setCreatorOpen(false);
    await alt.Utils.wait(1100);
    native.setEntityCoords(player, LOGIN_CORDS.x, LOGIN_CORDS.y, LOGIN_CORDS.z, false, false, false, true);
    native.setEntityHeading(player, LOGIN_HEADING);
    native.setEntityVisible(player, false, false);
    await alt.Utils.wait(200);

    const cPos = getFronOfPoint(alt.Player.local.pos, 4, LOGIN_HEADING);
    LOGIN_CAM.setPosition(new alt.Vector3(cPos.x, cPos.y, cPos.z));
    LOGIN_CAM.pointAtCoord(alt.Player.local.pos);
    await alt.Utils.wait(200);
    systems.screens.charSelect.open();
    native.doScreenFadeIn(1000);
    if (reason === 'save') {
        alt.emitServer(
            CCreatorEvents.new,
            firstname,
            lastname,
            age,
            JSON.stringify({
                sex: dataSex,
                ...parentData,
                ...hairData,
                ...eyesData,
                ...appearanceData,
                ...featuresData,
            }),
            equipment
        );
    } else alt.emitServer(CSelectionEvents.fetch);
    alt.emitServer(CCreatorEvents.exit);
}

function handleChangeCam(id: number) {
    const LOGIN_CAM = systems.screens.login.getCam();
    native.playSound(-1, 'NAV_UP_DOWN', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true, 0, true);
    const pPos = alt.Player.local.pos;
    switch (id) {
        case 0: {
            const endPos = getFronOfPoint(pPos, 2, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z),
                new alt.Vector3(pPos.x, pPos.y, pPos.z),
                1000
            );
            break;
        }
        case 6:
        case 7: {
            const endPos = getFronOfPoint(pPos, 1, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z + 0.2),
                new alt.Vector3(pPos.x, pPos.y, pPos.z + 0.1),
                1000
            );
            break;
        }
        case 1:
        case 5: {
            const endPos = getFronOfPoint(pPos, 1, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z + 0.55),
                new alt.Vector3(pPos.x, pPos.y, pPos.z + 0.5),
                1000
            );
            break;
        }
        case 2:
        case 3:
        case 4: {
            const endPos = getFronOfPoint(pPos, 0.5, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z + 0.55),
                new alt.Vector3(pPos.x, pPos.y, pPos.z + 0.5),
                1000
            );
            break;
        }
        case 8: {
            const endPos = getFronOfPoint(pPos, 1.3, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z - 0.5),
                new alt.Vector3(pPos.x, pPos.y, pPos.z - 0.5),
                1000
            );
            break;
        }
        case 9: {
            const endPos = getFronOfPoint(pPos, 1, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z - 0.9),
                new alt.Vector3(pPos.x, pPos.y, pPos.z - 0.9),
                1000
            );
            break;
        }
        case 10: {
            const endPos = getFronOfPoint(pPos, 2.5, initialHeading);
            LOGIN_CAM.interpolate(
                new alt.Vector3(endPos.x, endPos.y, endPos.z),
                new alt.Vector3(pPos.x, pPos.y, pPos.z),
                1000
            );
            break;
        }
    }
}

async function handleUpdateData(dataType: string, sex: number, values: string) {
    let timeout = 0;
    /**
     * HANDLE SEX CHANGE
     */
    if (sex !== dataSex) {
        timeout = 100;
        dataSex = sex;
        native.setEntityVisible(player, false, false);
        native.playSound(-1, 'NAV_UP_DOWN', 'HUD_FRONTEND_DEFAULT_SOUNDSET', true, 0, true);
        native.doScreenFadeOut(50);
        await alt.Utils.wait(100);
        systems.player.appearance.setModel(sex == 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01');
        await alt.Utils.wait(100);
        if (sex === 0) {
            native.setPedComponentVariation(player, 3, 15, 0, 2);
            native.setPedComponentVariation(player, 4, 14, 0, 2);
            native.setPedComponentVariation(player, 6, 5, 0, 2);
            native.setPedComponentVariation(player, 8, 15, 0, 2);
            native.setPedComponentVariation(player, 11, 15, 0, 2);
        } else if (sex === 1) {
            native.setPedComponentVariation(player, 3, 15, 0, 2);
            native.setPedComponentVariation(player, 4, 14, 0, 2);
            native.setPedComponentVariation(player, 6, 5, 0, 2);
            native.setPedComponentVariation(player, 8, 15, 0, 2);
            native.setPedComponentVariation(player, 11, 15, 0, 2);
        }
        native.setEntityVisible(player, true, false);
        systems.player.animations.play('abigail_mcs_2-0', 'prop_cs_frank_photo-0', -1, 2);
        await alt.Utils.wait(200);
        native.doScreenFadeIn(500);
    }

    const data = JSON.parse(values);

    await alt.Utils.wait(timeout);
    if (dataType === 'parentData') {
        native.setPedHeadBlendData(
            player,
            data.motherID,
            data.fatherID,
            0,
            data.motherID,
            data.fatherID,
            0,
            data.resemblance / 100,
            data.skintone / 100,
            0,
            false
        );
        parentData = data;
        return;
    }
    if (dataType === 'hairData') {
        const data: IHairState = JSON.parse(values);
        native.setPedComponentVariation(player, 2, data.hairID, 0, 2);
        native.setPedHeadOverlay(player, 1, data.facialHairIndex - 1, data.facialHairOpacity / 100);
        native.setPedHeadOverlay(player, 10, data.chestHairIndex - 1, data.chestHairOpacity / 100);
        native.setPedHairTint(player, data.hairColor, data.highlightColor);
        native.setPedHeadOverlayTint(player, 1, 1, data.facialHairColor, 0);
        native.setPedHeadOverlayTint(player, 10, 1, data.chestHairColor, 0);
        hairData = data;
        return;
    }

    if (dataType === 'eyesData') {
        const data: IEyesState = JSON.parse(values);
        native.setHeadBlendEyeColor(player, data.eyeIndex);
        native.setPedHeadOverlay(player, 2, data.eyebrowsIndex - 1, data.eyebrowsOpacity / 100);
        native.setPedHeadOverlayTint(player, 2, 1, data.eyebrowsColor, 0);
        eyesData = data;
        return;
    }

    if (dataType === 'featuresData') {
        const data: IFeaturesState = JSON.parse(values);
        data.featureValue.map((val: string, i: number) => {
            native.setPedMicroMorph(player, i, parseFloat(val));
        });
        featuresData = data;
        return;
    }

    if (dataType === 'appearanceData') {
        const data: IAppearanceState = JSON.parse(values);
        for (let i = 0; i < data.appearanceValue.length; i++) {
            if (i === 1 || i === 2) continue;
            native.setPedHeadOverlay(
                player,
                i,
                data.appearanceValue[i].index - 1,
                data.appearanceValue[i].opacity / 100
            );
            if (i === 5) native.setPedHeadOverlayTint(player, 5, 2, data.appearanceValue[i].color, 0);
            if (i === 8) native.setPedHeadOverlayTint(player, 8, 2, data.appearanceValue[i].color, 0);
        }
        appearanceData = data;
        return;
    }
    if (dataType === 'clothesData') {
        updateClothes(sex, values);
        return;
    }
}

function updateClothes(sex: number, values: string) {
    const data: IClothesState = JSON.parse(values);
    let response: IClothesState = JSON.parse(values);
    /**
     * HATS
     */
    if (data.hats[1] == -1) {
        native.clearPedProp(player, 0, 0);
        equipment.hats = [-1, 0, 'Default'];
        response.hats[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(PROPS_MALE_HATS[data.hats[1]]).forEach((v, index) => {
                if (PROPS_MALE_HATS[data.hats[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(PROPS_FEMALE_HATS[data.hats[1]]).forEach((v, index) => {
                if (PROPS_FEMALE_HATS[data.hats[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedPropIndex(player, 0, data.hats[1], colors[data.hats[2]], true, 0);
        equipment.hats = [data.hats[1], colors[data.hats[2]], 'Default'];
        response.hats[3] = colors;
    }
    /**
     * GLASSES
     */
    if (data.glasses[1] == -1) {
        native.clearPedProp(player, 1, 0);
        equipment.glasses = [-1, 0, 'Default'];
        response.glasses[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(PROPS_MALE_GLASSES[data.glasses[1]]).forEach((v, index) => {
                if (PROPS_MALE_GLASSES[data.glasses[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(PROPS_FEMALE_GLASSES[data.glasses[1]]).forEach((v, index) => {
                if (PROPS_FEMALE_GLASSES[data.glasses[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedPropIndex(player, 1, data.glasses[1], colors[data.glasses[2]], true, 0);
        equipment.glasses = [data.glasses[1], colors[data.glasses[2]], 'Default'];
        response.glasses[3] = colors;
    }
    /**
     * WATCHES
     */
    if (data.watches[1] == -1) {
        native.clearPedProp(player, 6, 0);
        equipment.watches = [-1, 0, 'Default'];
        response.watches[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(PROPS_MALE_WATCHES[data.watches[1]]).forEach((v, index) => {
                if (PROPS_MALE_WATCHES[data.watches[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(PROPS_FEMALE_WATCHES[data.watches[1]]).forEach((v, index) => {
                if (PROPS_FEMALE_WATCHES[data.watches[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedPropIndex(player, 6, data.watches[1], colors[data.watches[2]], true, 0);
        equipment.watches = [data.watches[1], colors[data.watches[2]], 'Default'];
        response.watches[3] = colors;
    }
    /**
     * EARS
     */
    if (data.ears[1] == -1) {
        native.clearPedProp(player, 2, 0);
        equipment.ears = [-1, 0, 'Default'];
        response.ears[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(PROPS_MALE_EARS[data.ears[1]]).forEach((v, index) => {
                if (PROPS_MALE_EARS[data.ears[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(PROPS_FEMALE_EARS[data.ears[1]]).forEach((v, index) => {
                if (PROPS_FEMALE_EARS[data.ears[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedPropIndex(player, 2, data.ears[1], colors[data.ears[2]], true, 0);
        equipment.ears = [data.ears[1], colors[data.ears[2]], 'Default'];
        response.ears[3] = colors;
    }
    /**
     * BRACELETS
     */
    if (data.bracelets[1] == -1) {
        native.clearPedProp(player, 7, 0);
        equipment.bracelets = [-1, 0, 'Default'];
        response.bracelets[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(PROPS_MALE_BRACELETS[data.bracelets[1]]).forEach((v, index) => {
                if (PROPS_MALE_BRACELETS[data.bracelets[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(PROPS_FEMALE_BRACELETS[data.bracelets[1]]).forEach((v, index) => {
                if (PROPS_FEMALE_BRACELETS[data.bracelets[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedPropIndex(player, 7, data.bracelets[1], colors[data.bracelets[2]], true, 0);
        equipment.bracelets = [data.bracelets[1], colors[data.bracelets[2]], 'Default'];
        response.bracelets[3] = colors;
    }
    /**
     * TOPS
     */
    if (data.tops[1] == -1) {
        equipment.tops = [-1, 0, 0, 0, 'Default'];
        response.tops[3] = [0];
        systems.player.appearance.setTop(15, 0, 0, 0);
    } else {
        let undershirts: Array<number> = [];
        if (sex === 0) {
            maleTorsoCombos[data.tops[1]].map((val, index) => {
                undershirts.push(val.undershirt);
            });
        } else if (sex === 1) {
            femaleTorsoCombos[data.tops[1]].map((val, index) => {
                undershirts.push(val.undershirt);
            });
        }

        let colors: Array<number> = [];
        let undershirtcolors: Array<number> = [];
        if (sex === 0) {
            Object.keys(MALE_TOPS[data.tops[1]]).forEach((v, index) => {
                if (MALE_TOPS[data.tops[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
            Object.keys(MALE_UNDERSHIRTS[undershirts[data.tops[4]]]).forEach((v, index) => {
                if (MALE_UNDERSHIRTS[undershirts[data.tops[4]]][index].GXT !== 'NO_LABEL') {
                    undershirtcolors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(FEMALE_TOPS[data.tops[1]]).forEach((v, index) => {
                if (FEMALE_TOPS[data.tops[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
            Object.keys(FEMALE_UNDERSHIRTS[undershirts[data.tops[4]]]).forEach((v, index) => {
                if (FEMALE_UNDERSHIRTS[undershirts[data.tops[4]]][index].GXT !== 'NO_LABEL') {
                    undershirtcolors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        if (undershirtcolors.length < 1) undershirtcolors = [0];
        systems.player.appearance.setTop(
            data.tops[1],
            colors[data.tops[2]],
            data.tops[4],
            undershirtcolors[data.tops[6]]
        );

        equipment.tops = [data.tops[1], colors[data.tops[2]], data.tops[4], undershirtcolors[data.tops[6]], 'Default'];

        response.tops[3] = colors;
        response.tops[5] = undershirts.length;
        response.tops[7] = undershirtcolors;
    }
    /**
     * LEGS
     */
    if (data.pants[1] == -1) {
        native.setPedComponentVariation(player, 4, 14, 0, 2);
        equipment.pants = [-1, 0, 'Default'];
        response.pants[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(MALE_LEGS[data.pants[1]]).forEach((v, index) => {
                if (MALE_LEGS[data.pants[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(FEMALE_LEGS[data.pants[1]]).forEach((v, index) => {
                if (FEMALE_LEGS[data.pants[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedComponentVariation(player, 4, data.pants[1], colors[data.pants[2]], 2);
        equipment.pants = [data.pants[1], colors[data.pants[2]], 'Default'];
        response.pants[3] = colors;
    }
    /**
     * SHOES
     */
    if (data.shoes[1] == -1) {
        native.setPedComponentVariation(player, 6, 5, 0, 2);
        equipment.shoes = [-1, 0, 'Default'];
        response.shoes[3] = [0];
    } else {
        let colors: Array<number> = [];
        if (sex === 0) {
            Object.keys(MALE_SHOES[data.shoes[1]]).forEach((v, index) => {
                if (MALE_SHOES[data.shoes[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        } else if (sex === 1) {
            Object.keys(FEMALE_SHOES[data.shoes[1]]).forEach((v, index) => {
                if (FEMALE_SHOES[data.shoes[1]][index].GXT !== 'NO_LABEL') {
                    colors.push(index);
                }
            });
        }
        if (colors.length < 1) colors = [0];
        native.setPedComponentVariation(player, 6, data.shoes[1], colors[data.shoes[2]], 2);
        equipment.shoes = [data.shoes[1], colors[data.shoes[2]], 'Default'];
        response.shoes[3] = colors;
    }
    webview.emit(CCreatorEvents.updateColors, JSON.stringify(response));
}

let pressingA = false;
let pressingD = false;

alt.everyTick(() => {
    if (!getCreatorOpen() || !allowRotation) return;
    if (pressingA) {
        if (addedHeading < -90) return;
        addedHeading -= 0.5;
        native.setEntityHeading(player, initialHeading + addedHeading);
    }
    if (pressingD) {
        if (addedHeading > 90) return;
        addedHeading += 0.5;
        native.setEntityHeading(player, initialHeading + addedHeading);
    }
});

alt.on('keydown', (key: number) => {
    if (key === 65) return (pressingA = true);
    if (key === 68) return (pressingD = true);
    return true;
});

alt.on('keyup', (key: number) => {
    if (key === 65) return (pressingA = false);
    if (key === 68) return (pressingD = false);
    return true;
});
