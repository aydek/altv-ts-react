import alt from 'alt-server';
import { systems } from '../systems/systems';
import { CommandFlags } from '@shared/enums/flags';
import { CommandEvents } from '@shared/enums/events/commandEvents';
import { Colors } from '@shared/enums/colors';
import { ChatIcons } from '@shared/enums/icons';

systems.chat.registerCommand('q', 'Quit game', [CommandFlags.player], (player: alt.Player, args: Array<any>) => {
    alt.emitClient(player, CommandEvents.quit);
});

systems.chat.registerCommand(
    'gettime',
    'Get server time',
    [CommandFlags.player],
    (player: alt.Player, args: Array<any>) => {
        systems.chat.send(
            player,
            `Current time: {${Colors.blue}}${systems.timeweather.getTime().hour}: ${
                systems.timeweather.getTime().minute
            }`,
            ChatIcons.info
        );
    }
);

systems.chat.registerCommand(
    'getweather',
    'Get server weather',
    [CommandFlags.player],
    (player: alt.Player, args: Array<any>) => {
        systems.chat.send(
            player,
            `Current weather: {${Colors.blue}}${systems.timeweather.getWeather().id}`,
            ChatIcons.info
        );
    }
);

systems.chat.registerCommand(
    'admin',
    'Test admin flag',
    [CommandFlags.admin],
    (player: alt.Player, args: Array<any>) => {
        systems.chat.send(player, `Works!`);
    }
);
