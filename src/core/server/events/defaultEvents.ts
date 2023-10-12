import * as alt from 'alt-server';
import { systems } from '../systems/systems';
import { utility } from '../utility/utility';
import { DefaultEvents } from '@shared/enums/events/defaultEvents';

alt.on(DefaultEvents.playerConnect, handlePlayerConnect);
alt.on(DefaultEvents.playerDisconnect, playerDisconnect);

function playerDisconnect(player: alt.Player, reason: string) {
    if (!player.pendingLogin) systems.player.database.character.save(player);
}

function handlePlayerConnect(player: alt.Player) {
    utility.log.system(`[${player.id}] ${player.name} has connected to the server.`);
    player.model = 'mp_m_freemode_01';
    player.dimension = player.id + 1;
    player.pendingLogin = true;
    player.admin = 0;
    player.developer = false;
    player.dBID = '';
    player.cash = 0;
    player.vip = 0;
    player.setWeather(0);
    player.setDateTime(0, 0, 0, 20, 0, 0);
    alt.emitClient(player, DefaultEvents.playerConnect);
}
