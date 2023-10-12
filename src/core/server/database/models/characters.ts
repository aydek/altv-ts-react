import mongoose from 'mongoose';
import * as alt from 'alt-server';
import { SPAWN_POSITION } from '@shared/config';

interface ICharacter {
    owner: string;
    rpName: string;
    cash: number;
    job: number;
    phone: string;
    age: number;
    dimension: number;
    vip: number;
    position: alt.Vector3;
    inventory: Array<IInventory>;
    invCapacity: number;
    dna: IDna;
    equipment: IEquipment;
    created_at: Date;
    updated_at: Date;
}

const characterSchema = new mongoose.Schema<ICharacter>(
    {
        owner: { type: String, required: true },
        rpName: { type: String, required: true },
        cash: { type: Number, default: 0 },
        job: { type: Number, default: 0 },
        phone: { type: String, default: 'No' },
        age: { type: Number, required: true },
        dimension: { type: Number, default: 0 },
        vip: { type: Number, default: 0 },
        position: { type: {}, default: SPAWN_POSITION },
        inventory: [{ type: {} }],
        invCapacity: { type: Number, default: 0 },
        dna: { type: {} },
        equipment: { type: {} },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

export const Character = mongoose.model('Character', characterSchema);
