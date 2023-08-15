import * as alt from 'alt-client';
import * as native from 'natives';
import { NoclipEvents } from '../../../shared/enums/events/utilityEvents';

// DO NOT EDIT //
let NoclipActive = false;
let MovingSpeed = 0;
let Scale = -1;
let FollowCamMode = true;

// THIS CAN YOU EDIT //

const SpeedsCount = 7;
const speeds = {
    0: 'Very Slow',
    1: 'Slow',
    2: 'Normal',
    3: 'Fast',
    4: 'Very Fast',
    5: 'Extremely Fast',
    6: 'Extremely Fast v2.0',
    7: 'Max Speed',
};

const KeyInfos = {
    SpeedKey: '~INPUT_SPRINT~',
    LeftRightKey: '~INPUT_MOVE_LR~',
    MoveKey: '~INPUT_MOVE_UD~',
    DownKey: '~INPUT_VEH_HORN~',
    UpKey: '~INPUT_COVER~',
    CamModeKey: '~INPUT_VEH_HEADLIGHT~',
};

const KeyControls = {
    ToggleAltV: 116,
    ToggleGTA: 166,

    MoveUpOnly: 32,
    MoveDownOnly: 33,
    MoveLeftOnly: 34,
    MoveRightOnly: 35,

    MoveUP: 268,
    MoveDown: 269,
    MoveLeft: 266,
    MoveRight: 267,

    MoveUD: 31,
    MoveLR: 30,

    Cover: 44,
    Spring: 21,
    RadioWheel: 85,
    Horn: 86,
    HeadLight: 74,
};

// CODE - DO NOT EDIT

alt.everyTick(() => {
    if (NoclipActive) {
        Scale = native.requestScaleformMovie('INSTRUCTIONAL_BUTTONS');

        if (!native.isHudHidden()) {
            native.beginScaleformMovieMethod(Scale, 'CLEAR_ALL');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(0);
            native.scaleformMovieMethodAddParamTextureNameString(KeyInfos.SpeedKey);
            native.scaleformMovieMethodAddParamTextureNameString(
                'Change Speed (' + speeds[MovingSpeed as keyof typeof speeds] + ')'
            );
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(1);
            native.scaleformMovieMethodAddParamTextureNameString(KeyInfos.LeftRightKey);
            native.scaleformMovieMethodAddParamTextureNameString('Turn Left/Right');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(2);
            native.scaleformMovieMethodAddParamTextureNameString(KeyInfos.MoveKey);
            native.scaleformMovieMethodAddParamTextureNameString('Move');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(3);
            native.scaleformMovieMethodAddParamTextureNameString(KeyInfos.DownKey);
            native.scaleformMovieMethodAddParamTextureNameString('Down');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(4);
            native.scaleformMovieMethodAddParamTextureNameString(KeyInfos.UpKey);
            native.scaleformMovieMethodAddParamTextureNameString('Up');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(5);
            native.scaleformMovieMethodAddParamTextureNameString(KeyInfos.CamModeKey);
            native.scaleformMovieMethodAddParamTextureNameString('Cam Mode');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'SET_DATA_SLOT');
            native.scaleformMovieMethodAddParamInt(6);
            native.scaleformMovieMethodAddParamTextureNameString(
                native.getControlInstructionalButtonsString(0, KeyControls.ToggleGTA, true)
            );
            native.scaleformMovieMethodAddParamTextureNameString('Toggle NoClip');
            native.endScaleformMovieMethod();

            native.beginScaleformMovieMethod(Scale, 'DRAW_INSTRUCTIONAL_BUTTONS');
            native.scaleformMovieMethodAddParamInt(0);
            native.endScaleformMovieMethod();

            native.drawScaleformMovieFullscreen(Scale, 255, 255, 255, 255, 0);
        }

        let noclipEntity = alt.Player.local.vehicle ? alt.Player.local.vehicle : alt.Player.local;
        let newPos;

        native.disableControlAction(0, KeyControls.MoveUpOnly, true);
        native.disableControlAction(0, KeyControls.MoveUP, true);
        native.disableControlAction(0, KeyControls.MoveUD, true);
        native.disableControlAction(0, KeyControls.MoveDown, true);
        native.disableControlAction(0, KeyControls.MoveDownOnly, true);
        native.disableControlAction(0, KeyControls.MoveLeft, true);
        native.disableControlAction(0, KeyControls.MoveLeftOnly, true);
        native.disableControlAction(0, KeyControls.MoveLR, true);
        native.disableControlAction(0, KeyControls.MoveRight, true);
        native.disableControlAction(0, KeyControls.MoveRightOnly, true);
        native.disableControlAction(0, KeyControls.Cover, true);
        native.disableControlAction(0, KeyControls.Horn, true);
        native.disableControlAction(0, KeyControls.HeadLight, true);
        if (alt.Player.local.vehicle) native.disableControlAction(0, KeyControls.RadioWheel, true);

        let yoff = 0.0;
        let zoff = 0.0;

        if (native.updateOnscreenKeyboard() !== 0 && alt.isGameFocused()) {
            if (native.isControlJustPressed(0, KeyControls.Spring)) {
                MovingSpeed++;
                if (MovingSpeed === SpeedsCount) {
                    MovingSpeed = 0;
                }
            }

            if (native.isDisabledControlPressed(0, KeyControls.MoveUpOnly)) {
                yoff = 0.5;
            }
            if (native.isDisabledControlPressed(0, KeyControls.MoveDownOnly)) {
                yoff = -0.5;
            }
            if (!FollowCamMode && native.isDisabledControlPressed(0, KeyControls.MoveLeftOnly)) {
                native.setEntityHeading(
                    alt.Player.local.scriptID,
                    native.getEntityHeading(alt.Player.local.scriptID) + 3
                );
            }
            if (!FollowCamMode && native.isDisabledControlPressed(0, KeyControls.MoveRightOnly)) {
                native.setEntityHeading(
                    alt.Player.local.scriptID,
                    native.getEntityHeading(alt.Player.local.scriptID) - 3
                );
            }
            if (native.isDisabledControlPressed(0, KeyControls.Cover)) {
                zoff = 0.21;
            }
            if (native.isDisabledControlPressed(0, KeyControls.Horn)) {
                zoff = -0.21;
            }
            if (native.isDisabledControlJustPressed(0, KeyControls.HeadLight)) {
                FollowCamMode = !FollowCamMode;
            }
        }

        let moveSpeed = MovingSpeed;
        if (MovingSpeed > SpeedsCount / 2) {
            moveSpeed *= 1.8;
        }
        moveSpeed = (moveSpeed / (1 / native.getFrameTime())) * 60;
        newPos = native.getOffsetFromEntityInWorldCoords(
            noclipEntity.scriptID,
            0,
            yoff * (moveSpeed + 0.3),
            zoff * (moveSpeed + 0.3)
        );

        let heading = native.getEntityHeading(noclipEntity.scriptID);
        native.setEntityVelocity(noclipEntity.scriptID, 0, 0, 0);
        native.setEntityRotation(noclipEntity.scriptID, 0, 0, 0, 0, false);
        native.setEntityHeading(
            noclipEntity.scriptID,
            FollowCamMode ? native.getGameplayCamRelativeHeading() : heading
        );
        native.setEntityCoordsNoOffset(noclipEntity.scriptID, newPos.x, newPos.y, newPos.z, true, true, true);
    }
});

function toggleNoclip() {
    NoclipActive = !NoclipActive;

    let noclipEntity = alt.Player.local.vehicle ? alt.Player.local.vehicle : alt.Player.local;
    if (NoclipActive) {
        native.freezeEntityPosition(noclipEntity.scriptID, true);
        native.setEntityCollision(noclipEntity.scriptID, false, false);
        alt.emitServer(NoclipEvents.visible, false);
    } else {
        native.freezeEntityPosition(noclipEntity.scriptID, false);
        native.setEntityCollision(noclipEntity.scriptID, true, true);
        alt.emitServer(NoclipEvents.visible, true);
    }
}

alt.on('keyup', (key) => {
    if (key === KeyControls.ToggleAltV) {
        alt.emitServer(NoclipEvents.toogle);
    }
});

alt.onServer(NoclipEvents.toogle, toggleNoclip);
