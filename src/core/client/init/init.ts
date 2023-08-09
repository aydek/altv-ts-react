import * as alt from 'alt-client';
import * as native from 'natives';

import './ipls';

native.setPedDefaultComponentVariation(native.playerPedId());

alt.setStat('stamina', 100);

alt.everyTick(() => {
    native.disableControlAction(0, 37, true); //weapon wheel [tab]
    native.disableControlAction(0, 99, true);
    native.disableControlAction(0, 100, true);
    native.hideHudComponentThisFrame(6); //HUD_VEHICLE_NAME
    native.hideHudComponentThisFrame(7); //HUD_AREA_NAME
    native.hideHudComponentThisFrame(8); //HUD_VEHICLE_CLASS
    native.hideHudComponentThisFrame(9); //HUD_STREET_NAME
    alt.beginScaleformMovieMethodMinimap('SETUP_HEALTH_ARMOUR');
    native.scaleformMovieMethodAddParamInt(3);
    native.endScaleformMovieMethod();
});

alt.HandlingData.getForHandlingName(alt.hash('adder')).initialDriveForce = 0.45;
alt.HandlingData.getForHandlingName(alt.hash('adder')).initialDriveGears = 6;
alt.HandlingData.getForHandlingName(alt.hash('adder')).initialDragCoeff = 0.0001;

alt.HandlingData.getForHandlingName(alt.hash('jester4')).initialDriveForce = 0.45;
alt.HandlingData.getForHandlingName(alt.hash('jester4')).initialDriveGears = 6;
alt.HandlingData.getForHandlingName(alt.hash('jester4')).initialDragCoeff = 0.0001;

alt.HandlingData.getForHandlingName(alt.hash('elegy')).initialDriveForce = 0.45;
alt.HandlingData.getForHandlingName(alt.hash('elegy')).initialDriveGears = 6;
alt.HandlingData.getForHandlingName(alt.hash('elegy')).initialDragCoeff = 0.0001;
