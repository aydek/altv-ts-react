import * as alt from 'alt-server';
import { Account } from '../../database/models/accounts';
import { LoginEvents } from '../../../shared/enums/events/webviewEvents';
import { utility } from '../../utility/utility';

alt.onClient(LoginEvents.loginBegin, handleDiscordLogin);

async function handleDiscordLogin(player: alt.Player, token: string) {
    if (!token) {
        player.kick(`Discord Application was not launched. Rejoin with Discord Launched.`);
        return;
    }

    const request = await fetch('https://discordapp.com/api/users/@me', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${token}`,
        },
    }).catch((err) => {
        console.log(err);
        return undefined;
    });

    if (!request || !request.ok) {
        player.kick('Could not authorize with bearer token. Rejoin server.');
        return;
    }

    const data = await request.json();
    if (!data.username || !data.id) {
        player.kick('Discord data was invalid. Rejoin server.');
        return;
    }

    player.discord_id = data.id;

    let doc = await Account.findOne({ discordID: data.id });

    if (!doc) {
        doc = new Account({
            discordID: data.id,
            discordName: data.username,
            discordAvatar: data.avatar,
            altName: player.name,
            ip: player.ip,
            socialID: player.socialID,
            hwidHash: player.hwidHash,
            hwidExHash: player.hwidExHash,
        });
        await doc.save();
        utility.log.system(
            `Player just registered. Name: ${player.name} DiscordID: ${data.id} Discord name: ${data.username}`
        );
    }

    player.emit(LoginEvents.loginDone);
}
