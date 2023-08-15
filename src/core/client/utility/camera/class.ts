import * as alt from 'alt-client';
import * as native from 'natives';

export default class Camera {
    private _position: alt.Vector3;
    private _rotation: alt.Vector3;
    private _fov: number = 60;
    private scriptID: Array<number> = [0];
    public active: boolean;
    /**
     * Create a new camera
     *
     * @param {alt.Vector3} position Initial position of the camera
     * @param {alt.Vector3} rotation Initial rotation of the camera
     * @param {number} fov Initial field of view of the camera
     */
    constructor(position: alt.Vector3, rotation: alt.Vector3 = new alt.Vector3(0, 0, 0), fov: number = 60) {
        this._position = position;
        this._rotation = rotation;
        this._fov = fov;

        this.scriptID[0] = native.createCamWithParams(
            'DEFAULT_SCRIPTED_CAMERA',
            this._position.x,
            this._position.y,
            this._position.z,
            this._rotation.x,
            this._rotation.y,
            this._rotation.z,
            this._fov,
            true,
            0
        );

        this.active = true;
    }

    /**
     * @type {number}
     */
    get fov() {
        return this._fov;
    }

    set fov(value: number) {
        this._fov = value;
        native.setCamFov(this.scriptID[0] as number, this._fov);
        this.render();
    }

    /**
     * @type {alt.Vector3}
     */
    position() {
        return this._position;
    }

    setPosition(position: alt.Vector3) {
        this._position = position;
        native.setCamCoord(this.scriptID[0] as number, this._position.x, this._position.y, this._position.z);
        this.render();
    }

    /**
     * @type {alt.Vector3}
     */
    rotation() {
        return this._rotation;
    }

    setRotation(rotation: alt.Vector3) {
        this._rotation = rotation;
        native.setCamRot(this.scriptID[0] as number, this._rotation.x, this._rotation.y, this._rotation.z, 0);

        this.render();
    }

    /**
     * Stops rendering the camera on the screen
     */
    unrender() {
        native.renderScriptCams(false, false, 0, false, false, 0);
    }

    /**
     * Renders the camera view on the screen
     */
    render() {
        native.setCamActive(this.scriptID[0] as number, true);
        native.renderScriptCams(true, false, 0, true, false, 0);
    }

    /**
     * Destroys the camera
     */
    destroy() {
        this.scriptID.forEach((val, i) => {
            native.destroyCam(this.scriptID[i] as number, false);
        });

        this.scriptID = [0];
        this.active = false;
        this.unrender();
    }

    /**
     * Rotates camera so it points straight to a ped's specific bone
     *
     * @param {number} entity Ped handle that owns the bone
     * @param {number} bone Bone index
     * @param {number} xOffset Position offset of the camera X
     * @param {number} yOffset Position offset of the camera Y
     * @param {number} zOffset Position offset of the camera Z
     */
    pointAtBone(entity: number, bone: number, xOffset: number, yOffset: number, zOffset: number) {
        native.pointCamAtPedBone(this.scriptID[0] as number, entity, bone, xOffset, yOffset, zOffset, false);
        this.render();
    }

    /**
     * Rotates camera so it points straight to a position
     *
     * @param {alt.Vector3} position Vector3 to where to point the camera at
     */
    pointAtCoord(position: alt.Vector3) {
        native.pointCamAtCoord(this.scriptID[0] as number, position.x, position.y, position.z);
        this.render();
    }

    /**
     * Moves camera with interpolation
     *
     * @param {alt.Vector3} position Vector3 new camera
     * @param {alt.Vector3} position Vector3 camera looking at
     * @param {number} duration time
     */
    interpolate(pos: alt.Vector3, lookAt: alt.Vector3, duration: number) {
        const newCam = native.createCamWithParams(
            'DEFAULT_SCRIPTED_CAMERA',
            pos.x,
            pos.y,
            pos.z,
            0,
            0,
            0,
            this._fov,
            true,
            0
        );
        this.scriptID.unshift(newCam);

        if (this.scriptID.length > 3) {
            const cam = this.scriptID.pop();
            native.destroyCam(cam as number, true);
        }
        native.pointCamAtCoord(this.scriptID[0] as number, lookAt.x, lookAt.y, lookAt.z);
        native.setCamActiveWithInterp(this.scriptID[0] as number, this.scriptID[1] as number, duration, 1, 1);
        native.renderScriptCams(true, false, 0, true, false, 0);
    }
}
