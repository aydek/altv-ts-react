import * as alt from 'alt-server';

import { Character } from '../../../database/models/characters';
import { Account } from '../../../database/models/accounts';
import { systems } from '../../systems';
import { utility } from '../../../utility/utility';

export async function loadCharacter(player: alt.Player, dbID: string) {
    const result = await Character.findOne({ _id: dbID, owner: player.discord_id });
    if (result) {
        player.model = result.dna.sex === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
        player.pos = new alt.Vector3(result.position.x, result.position.y, result.position.z);
        player.cash = result.cash;
        player.pendingLogin = false;
        player.dBID = dbID;
        player.vip = result.vip;
        player.dimension = result.dimension;
        player.inventory = result.inventory;
        player.rpName = result.rpName;
        player.invCapacity = result.invCapacity;
        player.equipment = result.equipment;
        player.dna = result.dna;
        systems.player.appearance.updateAppearance(player, undefined);
        systems.player.appearance.updateClothes(player, player.dna.sex, undefined);
        player.setDateTime(
            15,
            7,
            new Date().getFullYear(),
            systems.timeweather.getTime().hour as alt.DateTimeHour,
            systems.timeweather.getTime().minute as alt.DateTimeMinute,
            0
        );
    } else {
        utility.log.error(
            `[dB]  Character.findOne({ _id: dbID, owner: player.discord_id }); error. dbID: ${dbID} owner: ${player.discord_id}`
        );
        player.kick(systems.translate('DATA_NOT_FOUND'));
        return;
    }
    const accResult = await Account.findOne({ discordID: player.discord_id });
    if (accResult) {
        player.admin = accResult.admin;
        player.developer = accResult.developer;
    } else {
        utility.log.error(
            `[dB] Account.findOne({ discordID: player.discord_id }); error. discordID: ${player.discord_id}`
        );
    }
}

export async function saveCharacter(player: alt.Player) {
    const data = {
        pos: player.pos,
        cash: player.cash,
        dimension: player.dimension,
        vip: player.vip,
        inventory: player.inventory,
        equipment: player.equipment,
        dna: player.dna,
    };
    const result = await Character.findOne({ _id: player.dBID, discordID: player.discord_id });
    if (result) {
        result.position = data.pos;
        result.cash = data.cash;
        result.vip = data.vip;
        result.dimension = data.dimension;
        result.inventory = data.inventory;
        result.equipment = player.equipment;
        result.dna = player.dna;
        result.save();
    } else {
        utility.log.error(`[db]: save character, doc not found. ID: ${player.dBID} discordID: ${player.discord_id}`);
    }
}
