declare interface IEquipment {
    hats: [number, number, string];
    glasses: [number, number, string];
    watches: [number, number, string];
    ears: [number, number, string];
    bracelets: [number, number, string];
    tops: [number, number, number, number, string];
    pants: [number, number, string];
    shoes: [number, number, string];
    masks: [number, number, string];
    ties: [number, number, string];
    bags: [number, number, string];
    armours: [number, number, string];
}

declare interface IDna {
    sex: number;
    mother: number;
    father: number;
    resemblance: number;
    skintone: number;
    hair: number;
    facialHair: number;
    facialHairOpacity: number;
    chestHairIndex: number;
    chestHairOpacity: number;
    hairColor: number;
    highlightColor: number;
    facialHairColor: number;
    chestHairColor: number;
    eyesColor: number;
    eyebrows: number;
    eyebrowsOpacity: number;
    eyebrowsColor: number;
    features: number[];
    appearance: {
        index: number;
        opacity: number;
        color: number;
    }[];
}

declare interface IInventory {
    id: number;
    quantity: number;
    description: string;
    p1?: any;
    p2?: any;
    p3?: any;
    p4?: any;
}