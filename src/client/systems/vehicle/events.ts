import * as alt from 'alt-client';
import * as native from 'natives';
import { KeyCode, PedConfigFlag } from 'altv-enums';
import { VehicleKeybinds } from '@shared/enums/events/vehicleEvents';

const player = alt.Player.local;

alt.on('enteredVehicle', () => {
    native.setPedConfigFlag(player, PedConfigFlag.DisableStartingVehicleEngine, true);
});

alt.on('keydown', (key: number) => {
    if (!player.vehicle) return;
    if (key == KeyCode.E) {
        alt.emitServer(VehicleKeybinds.toogleEngine);
    }
});
