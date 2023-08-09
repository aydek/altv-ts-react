import * as alt from 'alt-server';
import { Character } from '../../database/models/characters';
import { Account } from '../../database/models/accounts';
import { JOBS_INFO } from '../../../shared/constants/jobs';
import { CSelectionEvents } from '../../../shared/enums/events/webviewEvents';
import { systems } from '../../systems/systems';

alt.onClient(CSelectionEvents.fetch, fetchCharactersData);
alt.onClient(CSelectionEvents.view, handleView);
alt.onClient(CSelectionEvents.play, handlePlay);
alt.on(CSelectionEvents.fetch, fetchCharactersData);

function handlePlay(player: alt.Player, id: string) {
    player.dimension = 0;
    systems.player.database.character.load(player, id);
}

async function fetchCharactersData(player: alt.Player) {
    const doc = await Character.find({ owner: player.discord_id });
    const accdoc = await Account.findOne({ discordID: player.discord_id });

    let result = [];
    for (let i = 0; i < doc.length; i++) {
        const job = Object.values(JOBS_INFO).find((job) => job.id === doc[i].job);
        result.push({
            _id: doc[i]._id,
            rpName: doc[i].rpName,
            cash: doc[i].cash,
            job: job.name,
            updated_at: doc[i].updated_at,
        });
    }

    alt.emitClient(player, CSelectionEvents.fetch, JSON.stringify(result), accdoc.charactersAllowed);
}

async function handleView(player: alt.Player, id: string) {
    if (id === player.currentViewCharacter) return;
    const result = await Character.findOne({ _id: id, owner: player.discord_id });
    if (result) {
        player.model = result.dna.sex === 0 ? 'mp_m_freemode_01' : 'mp_f_freemode_01';
        systems.player.appearance.updateAppearance(player, result.dna);
        systems.player.appearance.updateClothes(player, result.dna.sex, result.equipment);
        player.currentViewCharacter = id;
    }
}
