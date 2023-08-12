import alt from 'alt-server';
import { systems } from '../systems';

export interface IGroundItems {
    id: number;
    quantity: number;
    description: string;
    pos: alt.Vector3;
    index?: number;
    marker?: alt.Marker;
    p1?: any;
    p2?: any;
    p3?: any;
    p4?: any;
}

export const groundItems: Array<IGroundItems> = [];

export function addGroundItem(data: IGroundItems, player: alt.Player, playAnim = true) {
    const marker = new alt.Marker(
        2,
        new alt.Vector3(data.pos.x, data.pos.y, data.pos.z - 0.8),
        new alt.RGBA(255, 255, 255, 120)
    );

    marker.scale = new alt.Vector3(0.3, 0.3, 0.3);

    const length = groundItems.push({ ...data, marker: marker });

    const newitem = groundItems[length - 1];

    if (newitem) groundItems[length - 1] = { ...newitem, index: length - 1 };

    if (playAnim) systems.player.animations.play(player, 'pickup_object', 'putdown_low', 1200);
    return groundItems[length - 1];
}
