import mongoose from 'mongoose';
import { DEFAULT_CHARACTERS_ALLOWED } from '../../../shared/config';

interface IAccount {
    discordID: string;
    discordName: string;
    discordAvatar?: string;
    altName: string;
    ip: string;
    developer: boolean;
    admin: number;
    charactersAllowed: number;
    chatSize: { width: number; height: number };
    hwidHash: string;
    hwidExHash: string;
    socialID: string;
}

const accountSchema = new mongoose.Schema<IAccount>(
    {
        discordID: { type: String, required: true },
        discordName: { type: String, required: true },
        discordAvatar: { type: String },
        altName: { type: String, required: true },
        ip: { type: String, required: true },
        developer: { type: Boolean, default: false },
        admin: { type: Number, default: 0 },
        charactersAllowed: { type: Number, default: DEFAULT_CHARACTERS_ALLOWED },
        chatSize: { width: { type: Number, default: 600 }, height: { type: Number, default: 400 } },
        hwidHash: { type: String, required: true },
        hwidExHash: { type: String, required: true },
        socialID: { type: String, required: true },
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    }
);

export const Account = mongoose.model('Account', accountSchema);
