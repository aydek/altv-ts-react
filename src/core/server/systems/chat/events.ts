import * as alt from 'alt-server';
import { Account } from '../../database/models/accounts';
import { systems } from '../systems';
import { utility } from '../../utility/utility';
import { ChatEvents } from '@shared/enums/events/webviewEvents';

alt.onClient(ChatEvents.fetchCommands, handleFetchCommands);
alt.onClient(ChatEvents.updateSize, handleUpdateSize);

async function handleFetchCommands(player: alt.Player) {
    alt.emitClient(player, ChatEvents.fetchCommands, JSON.stringify(systems.chat.allCommands(player)));

    const result = await Account.findOne({ discordID: player.discord_id });
    if (result) {
        alt.emitClient(player, ChatEvents.setSize, result.chatSize.width, result.chatSize.height);
    } else utility.log.error(`[db]: update chat size, doc not found. discordID: ${player.discord_id}`);
}

async function handleUpdateSize(player: alt.Player, width: number, height: number) {
    const result = await Account.findOne({ discordID: player.discord_id });
    if (result) {
        if (result.chatSize.width !== width) result.chatSize.width = width;
        if (result.chatSize.height !== height) result.chatSize.height = height;
        result.save();
    } else utility.log.error(`[db]: save chat size, doc not found. discordID: ${player.discord_id}`);
}

alt.onClient(ChatEvents.input, handleInput);

function handleInput(player: alt.Player, msg: string) {
    if (msg[0] === '/') {
        msg = msg.trim().slice(1);

        if (msg.length > 0) {
            utility.log.system('[chat:cmd] ' + player.name + ': /' + msg);

            let args = msg.split(' ');
            let cmd = args.shift();
            systems.chat.invoke(player, cmd as string, args);
        }
    } else {
        msg = msg.trim();

        if (msg.length > 0) {
            alt.emit('onPlayerChat', player, msg.replace(/</g, '&lt;').replace(/'/g, '&#39').replace(/"/g, '&#34'));
        }
    }
}

alt.on('onPlayerChat', (player: alt.Player, message: string) => {
    console.log('onPlayerChat: ' + player.rpName + ': ' + message);
    systems.chat.broadcast(player.rpName + ': ' + message);
});
