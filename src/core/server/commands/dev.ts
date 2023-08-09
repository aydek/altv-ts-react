import alt from 'alt-server';

import { systems } from '../systems/systems';
import { CommandFlags } from '../../shared/enums/flags';
import { Colors } from '../../shared/enums/colors';
import { ChatIcons } from '../../shared/enums/icons';
import { utility } from '../utility/utility';

systems.chat.registerCommand(
    'coords',
    'Get player position',
    [CommandFlags.dev],
    (player: alt.Player, args: Array<any>) => {
        systems.chat.send(
            player,
            `Player coords: {${Colors.blue}} ${player.pos.x.toFixed(4)}, ${player.pos.y.toFixed(
                4
            )}, ${player.pos.z.toFixed(4)}`,
            ChatIcons.info
        );
    }
);

systems.chat.registerCommand(
    'notify',
    '[type] [message] send yourself notification',
    [CommandFlags.dev],
    (player: alt.Player, args: Array<any>) => {
        if (!args[0] || typeof args[0] !== 'string' || !args[1] || typeof args[1] !== 'string') {
            systems.chat.send(player, `Usage: {${Colors.red}}/notify [type] [message]`, ChatIcons.error);
            return;
        }
        systems.notifications.show(player, args[0], 5000, args[0], args[1]);
    }
);

systems.chat.registerCommand(
    'additem',
    'Add item to inventory',
    [CommandFlags.dev],
    (player: alt.Player, args: any[]) => {
        if (!args[0])
            return systems.chat.send(
                player,
                `Usage: {${Colors.red}} /additem [id] [description] [ammount]`,
                ChatIcons.error
            );
        systems.inventory.addItem(
            player,
            parseInt(args[0]),
            args[1],
            parseInt(args[2]),
            args[3],
            args[4],
            args[5],
            args[6]
        );
    }
);

let veh: alt.Vehicle = null;

systems.chat.registerCommand('veh', 'Create vehicle', [CommandFlags.dev], (player: alt.Player, args: Array<any>) => {
    if (veh) {
        try {
            veh.destroy();
        } catch {
            console.log('Wtf?????');
        }
    }
    try {
        veh = new alt.Vehicle(
            args[0],
            player.pos.x + 1,
            player.pos.y,
            player.pos.z,
            player.rot.x,
            player.rot.y,
            player.rot.z
        );
        utility.log.system(`Vehicle created : ` + veh.model);
    } catch {
        console.log('Invalid model??');
    }
});
