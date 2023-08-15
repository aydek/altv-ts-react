import alt from 'alt-client';
import native from 'natives';
import { CommandEvents } from '../../shared/enums/events/commandEvents';

alt.onServer(CommandEvents.quit, playerQuit);

function playerQuit() {
    native.restartGame();
}
