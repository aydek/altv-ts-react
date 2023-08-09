import * as alt from 'alt-shared';

export function distance(vector1: alt.Vector3, vector2: alt.Vector3) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(
        Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2) + Math.pow(vector1.z - vector2.z, 2)
    );
}

export function distance2d(vector1: alt.Vector2, vector2: alt.Vector2) {
    if (vector1 === undefined || vector2 === undefined) {
        throw new Error('AddVector => vector1 or vector2 is undefined');
    }

    return Math.sqrt(Math.pow(vector1.x - vector2.x, 2) + Math.pow(vector1.y - vector2.y, 2));
}

export function getClosestVector(pos: alt.Vector3, arrayOfPositions: alt.Vector3[]) {
    arrayOfPositions.sort((a, b) => {
        return distance(pos, a) - distance(pos, b);
    });

    return arrayOfPositions[0];
}

export function getClosestVectorByPos<T>(pos: alt.Vector3, arrayOfPositions: T[], posVariable: string = 'pos'): T {
    arrayOfPositions.sort((a, b) => {
        return distance(pos, a[posVariable]) - distance(pos, b[posVariable]);
    });

    return arrayOfPositions[0];
}

export function getFronOfPoint(pos: alt.Vector3, distance: number, cusomHeading: number = 9999) {
    const x = pos.x;
    const y = pos.y;
    const z = pos.z;
    const radians = (-cusomHeading * Math.PI) / 180;
    const nx = x + distance * Math.sin(radians);
    const ny = y + distance * Math.cos(radians);
    return new alt.Vector3(nx, ny, z);
}
