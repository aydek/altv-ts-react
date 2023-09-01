import * as alt from 'alt-client';
import * as native from 'natives';
import './ipls';

native.setPedDefaultComponentVariation(native.playerPedId());

alt.setStat('stamina', 100);

alt.everyTick(() => {
    native.disableControlAction(0, 37, true); //weapon wheel [tab]
    /** Disable all scroll wheel buttons */
    native.disableControlAction(0, 14, true);
    native.disableControlAction(0, 15, true);
    native.disableControlAction(0, 16, true);
    native.disableControlAction(0, 17, true);
    native.disableControlAction(0, 99, true);
    native.disableControlAction(0, 100, true);
    native.disableControlAction(0, 115, true);
    native.disableControlAction(0, 116, true);
    native.disableControlAction(0, 261, true);
    native.disableControlAction(0, 262, true);
    /** Radio controls */
    native.disableControlAction(0, 81, true);
    native.disableControlAction(0, 82, true);
    native.disableControlAction(0, 83, true);
    native.disableControlAction(0, 84, true);

    native.hideHudComponentThisFrame(6); //HUD_VEHICLE_NAME
    native.hideHudComponentThisFrame(7); //HUD_AREA_NAME
    native.hideHudComponentThisFrame(8); //HUD_VEHICLE_CLASS
    native.hideHudComponentThisFrame(9); //HUD_STREET_NAME
    alt.beginScaleformMovieMethodMinimap('SETUP_HEALTH_ARMOUR');
    native.scaleformMovieMethodAddParamInt(3);
    native.endScaleformMovieMethod();
    if (native.isDisabledControlJustPressed(0, 261)) console.log('up');
    if (native.isDisabledControlJustPressed(0, 262)) console.log('down');
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
