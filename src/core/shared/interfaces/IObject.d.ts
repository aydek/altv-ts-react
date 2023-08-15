

declare interface IObject {
    id: number;
    model: string;
    position: Vector3;
    rotation: Vector3;
    onGroundProperly: boolean;
    attachData: IAttachedObjectData;
}
