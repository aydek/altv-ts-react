import * as alt from 'alt-server';
import { VehicleKeybinds } from '@shared/enums/events/vehicleEvents';
import { systems } from '../systems';
import { NotificationIcons } from '../../../shared/enums/icons';

alt.onClient(VehicleKeybinds.toogleEngine, hangleEngineToggle);

function hangleEngineToggle(player: alt.Player) {
    if (player.vehicle) {
        if (player.vehicle.engineOn) {
            player.vehicle.engineOn = false;
            systems.notifications.show(player, NotificationIcons.info, 5000, 'Vehicle', 'Engine stopped');
        } else {
            player.vehicle.engineOn = true;
            systems.notifications.show(player, NotificationIcons.info, 5000, 'Vehicle', 'Engine started');
        }
    }
}
