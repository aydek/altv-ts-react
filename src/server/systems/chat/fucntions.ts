import * as alt from 'alt-server';
import { CommandFlags } from '@shared/enums/flags';
import { ChatEvents } from '@shared/enums/events/webviewEvents';
import { systems } from '../systems';
import { utility } from '../../utility/utility';

let cmdHandlers: any = {};
let cmdFlags: any = {};
let playerCommands: Array<{ command: string; description: string }> = [];
let adminCommands: Array<{ command: string; description: string }> = [];
let devCommands: Array<{ command: string; description: string }> = [];
let vipCommands: Array<{ command: string; description: string }> = [];

export function getAvailableCommand(player: alt.Player) {
    const allCommands = [];
    allCommands.push(...playerCommands);
    if (player.developer) {
        allCommands.push(...devCommands, ...adminCommands, ...vipCommands);
    } else {
        if (player.vip === 1) allCommands.push(...vipCommands);
        if (player.admin === 1) allCommands.push(...adminCommands);
    }
    return allCommands;
}

interface callbackType {
    (player: alt.Player, args: any[]): void;
}

export function registerCommand(cmd: string, description: string, flags: Array<number>, callback: callbackType) {
    if (cmdHandlers[cmd] !== undefined) {
        utility.log.error(`Failed to register command /${cmd}, already registered`);
    } else {
        cmdHandlers[cmd] = callback;
        cmdFlags[cmd] = [...flags];
        flags.forEach((flag) => {
            switch (flag) {
                case CommandFlags.player: {
                    playerCommands = [...playerCommands, { command: '/' + cmd, description: description }];

                    break;
                }
                case CommandFlags.admin: {
                    adminCommands = [...adminCommands, { command: '/' + cmd, description: description }];
                    break;
                }
                case CommandFlags.vip: {
                    vipCommands = [...vipCommands, { command: '/' + cmd, description: description }];
                    break;
                }
                case CommandFlags.dev: {
                    devCommands = [...devCommands, { command: '/' + cmd, description: description }];
                    break;
                }
            }
        });
    }
}

export function invokeCmd(player: alt.Player, cmd: string, args: any[]) {
    const callback = cmdHandlers[cmd];
    if (callback && player.developer) {
        callback(player, args);
        return;
    }
    if (callback && cmdFlags[cmd].includes(CommandFlags.admin) && player.admin > 0) {
        callback(player, args);
        return;
    }
    if (callback && cmdFlags[cmd].includes(CommandFlags.vip) && player.vip > 1) {
        callback(player, args);
        return;
    }
    if (callback && cmdFlags[cmd].includes(CommandFlags.player)) {
        callback(player, args);
        return;
    }
    sendChatMessage(player, `${systems.translate('UNKNOWN_COMMAND')}`, 'error');
}

export function sendChatMessage(player: alt.Player, message: string, icon: string = '') {
    alt.emitClient(player, ChatEvents.pushLine, message, icon);
}

export function broadcastChatMessage(message: string, icon: string = '') {
    alt.emitAllClients(ChatEvents.pushLine, message, icon);
}
