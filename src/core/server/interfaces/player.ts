declare module 'alt-server' {
    export interface Player {
        pendingLogin?: boolean;
        discord_id?: string;
        currentViewCharacter?: string;
        cash?: number;
        vip?: number;
        rpName?: string;
        admin?: number;
        developer?: boolean;
        dBID?: string;
        inventory?: Array<IInventory>;
        invCapacity?: number;
        invSecondaryType?: string;
        equipment?: IEquipment;
        dna?: IDna;
    }
}
