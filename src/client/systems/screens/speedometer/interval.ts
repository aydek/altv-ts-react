import * as alt from 'alt-client';
import * as native from 'natives';
import { systems } from '../../systems';
import { SpeedometerEvents } from '@shared/enums/events/webviewEvents';
import { LANG } from '@shared/locales/language';

let active = false;

alt.setInterval(() => {
    const player = alt.Player.local;
    const webview = systems.webview.getInstance();

    if (active && !player.vehicle) {
        webview.emit(SpeedometerEvents.hide);
        active = false;
        return;
    }

    if (!active && player.vehicle) {
        webview.emit(SpeedometerEvents.show);
        active = true;
        return;
    }

    if (!player.vehicle) return;

    const speed = player.vehicle.speed;
    const realSpeed = LANG === 'en' ? speed * 2.236936 : speed * 3.6;
    const gear = player.vehicle.gear;
    const realGear = realSpeed > 0 && gear === 0 ? 'R' : gear.toString();
    const lights = native.getVehicleLightsState(player.vehicle);
    const lightState = lights[2] ? 2 : lights[1] ? 1 : 0;

    const data = {
        speed: realSpeed.toFixed(),
        rpm: player.vehicle.rpm,
        gear: realGear,
        fuel: 100,
        tankSize: 100,
        lights: lightState,
        belt: true,
    };
    webview.emit(SpeedometerEvents.update, JSON.stringify(data));
}, 50);
