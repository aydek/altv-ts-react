declare interface IMarker {
    id?: number;
    type: number;
    pos: Vector3;
    dir: Vector3;
    rot: Vector3;
    scale: Vector3;
    rgba: RGBA;
    options: {
        bobUpAndDown: boolean;
        faceCamera: boolean;
        p19: number;
        rotate: boolean;
        textureDict: string | null;
        textureName: string | null;
        drawOnEnts: boolean;
        drawDistance: number;
    };
    colshapepos?: Vector3;
    inMarker?: boolean;
    drawMarker?: boolean;
}
