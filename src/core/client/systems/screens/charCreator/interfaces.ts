export interface IParentState {
    motherIndex: number;
    fatherIndex: number;
    motherID: number;
    fatherID: number;
    resemblance: number;
    skintone: number;
}

export interface IHairState {
    hairIndex: number;
    hairID: number;
    facialHairIndex: number;
    facialHairOpacity: number;
    chestHairIndex: number;
    chestHairOpacity: number;
    hairColor: number;
    highlightColor: number;
    facialHairColor: number;
    chestHairColor: number;
}

export interface IEyesState {
    eyeIndex: number;
    eyebrowsIndex: number;
    eyebrowsOpacity: number;
    eyebrowsColor: number;
}

export interface IFeaturesState {
    featureValue: string[];
}

export interface IAppearanceState {
    appearanceValue: {
        index: number;
        opacity: number;
        color: number;
    }[];
}

export interface IClothesState {
    hats: [number, number, number, number[]];
    glasses: [number, number, number, number[]];
    watches: [number, number, number, number[]];
    ears: [number, number, number, number[]];
    bracelets: [number, number, number, number[]];
    tops: [number, number, number, number[], number, number, number, number[]];
    pants: [number, number, number, number[]];
    shoes: [number, number, number, number[]];
}