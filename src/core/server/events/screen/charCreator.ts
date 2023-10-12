import * as alt from 'alt-server';
import { Character } from '../../database/models/characters';
import { CCreatorEvents, CSelectionEvents } from '@shared/enums/events/webviewEvents';
import { MAX_INV_ITEMS, SPAWN_POSITION } from '@shared/config';

alt.onClient(CCreatorEvents.exit, handleExit);
alt.onClient(CCreatorEvents.new, handleNewCharacter);

function handleExit(player: alt.Player) {
    player.currentViewCharacter = undefined;
}

async function handleNewCharacter(player: alt.Player, firstname: string, lastname: string, age: number, state: string, equipment: IEquipment) {
    const name = firstname.charAt(0).toUpperCase() + firstname.substring(1);
    const surname = lastname.charAt(0).toUpperCase() + lastname.substring(1);
    const data = JSON.parse(state);
    const array: Array<IInventory> = [];
    for (let i = 0; i < MAX_INV_ITEMS; i++)
        array.push({
            id: -1,
            quantity: 0,
            description: '',
            p1: null,
            p2: null,
            p3: null,
            p4: null,
        });

    let char = new Character();
    char.rpName = `${name} ${surname}`;
    char.age = age;
    char.position = SPAWN_POSITION;
    char.owner = player.discord_id;
    char.equipment = equipment;
    char.inventory = array;
    char.dna = {
        sex: data.sex,
        mother: data.motherID,
        father: data.fatherID,
        resemblance: data.resemblance / 100,
        skintone: data.skintone / 100,
        hair: data.hairID,
        facialHair: data.facialHairIndex - 1,
        facialHairOpacity: data.facialHairOpacity / 100,
        chestHairIndex: data.chestHairIndex - 1,
        chestHairOpacity: data.chestHairOpacity / 100,
        hairColor: data.hairColor,
        highlightColor: data.highlightColor,
        facialHairColor: data.facialHairColor,
        chestHairColor: data.chestHairColor,
        eyesColor: data.eyeIndex,
        eyebrows: data.eyebrowsIndex - 1,
        eyebrowsOpacity: data.eyebrowsOpacity,
        eyebrowsColor: data.eyebrowsColor,
        features: [
            data.featureValue[0],
            data.featureValue[1],
            data.featureValue[2],
            data.featureValue[3],
            data.featureValue[4],
            data.featureValue[5],
            data.featureValue[6],
            data.featureValue[7],
            data.featureValue[8],
            data.featureValue[9],
            data.featureValue[10],
            data.featureValue[11],
            data.featureValue[12],
            data.featureValue[13],
            data.featureValue[14],
            data.featureValue[15],
            data.featureValue[16],
            data.featureValue[17],
            data.featureValue[18],
            data.featureValue[19],
        ],
        appearance: [
            {
                index: data.appearanceValue[0].index - 1,
                opacity: data.appearanceValue[0].opacity,
                color: data.appearanceValue[0].color,
            },
            {
                index: data.appearanceValue[1].index - 1,
                opacity: data.appearanceValue[1].opacity,
                color: data.appearanceValue[1].color,
            },
            {
                index: data.appearanceValue[2].index - 1,
                opacity: data.appearanceValue[2].opacity,
                color: data.appearanceValue[2].color,
            },
            {
                index: data.appearanceValue[3].index - 1,
                opacity: data.appearanceValue[3].opacity,
                color: data.appearanceValue[3].color,
            },
            {
                index: data.appearanceValue[4].index - 1,
                opacity: data.appearanceValue[4].opacity,
                color: data.appearanceValue[4].color,
            },
            {
                index: data.appearanceValue[5].index - 1,
                opacity: data.appearanceValue[5].opacity,
                color: data.appearanceValue[5].color,
            },
            {
                index: data.appearanceValue[6].index - 1,
                opacity: data.appearanceValue[6].opacity,
                color: data.appearanceValue[6].color,
            },
            {
                index: data.appearanceValue[7].index - 1,
                opacity: data.appearanceValue[7].opacity,
                color: data.appearanceValue[7].color,
            },
            {
                index: data.appearanceValue[8].index - 1,
                opacity: data.appearanceValue[8].opacity,
                color: data.appearanceValue[8].color,
            },
            {
                index: data.appearanceValue[9].index - 1,
                opacity: data.appearanceValue[9].opacity,
                color: data.appearanceValue[9].color,
            },
        ],
    };
    await char.save();
    alt.emit(CSelectionEvents.fetch, player);
}
