import * as alt from 'alt-client';
import * as native from 'natives';
import { VehicleKeybinds } from '../../../shared/enums/events/vehicleEvents';
import { KeyCode, PedConfigFlag } from '../../../shared/enums/altv';

const player = alt.Player.local;

alt.on('enteredVehicle', () => {
    native.setPedConfigFlag(player, PedConfigFlag.DisableStartingVehicleEngine, true);
    native.setPedConfigFlag(player, PedConfigFlag.DisableStoppingVehicleEngine, true);
    native.setPedConfigFlag(player, PedConfigFlag.PutOnMotorcycleHelmet, false);
    native.setPedConfigFlag(player, PedConfigFlag.PreventAutoShuffleToDriversSeat, true);
    native.setPedConfigFlag(player, PedConfigFlag.CanFlyThruWindscreen, true);
});

alt.on('keydown', (key: number) => {
    if (!player.vehicle) return;
    if (key == KeyCode.E) {
        alt.emitServer(VehicleKeybinds.toogleEngine);
    }
});
