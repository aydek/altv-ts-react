import React from 'react';
import { availableBracelets, availableEars, availableGlasses, availableWatches } from '../../data/accesories';
import { IClothesState } from '../../data/state';
import ChevronSelector from '../../../../components/ChevronSelector';
import Divider from '../../../../components/Divider';
import { translate } from '../../../../config';

export const Accesories = ({
    data,
    setData,
    sex,
}: {
    data: IClothesState;
    setData: React.Dispatch<React.SetStateAction<IClothesState>>;
    sex: number;
}) => {
    const glassesPrev = () => {
        let copy = data;
        let index = data.glasses[0];
        index--;
        if (index < 0) index = availableGlasses[sex].length - 1;
        copy.glasses = [index, availableGlasses[sex][index], 0, copy.glasses[3]];
        setData({ ...copy });
    };

    const glassesNext = () => {
        let copy = data;
        let index = data.glasses[0];
        index++;
        if (index > availableGlasses[sex].length - 1) index = 0;
        copy.glasses = [index, availableGlasses[sex][index], 0, copy.glasses[3]];
        setData({ ...copy });
    };

    const glassesColorPrev = () => {
        let copy = data;
        let index = data.glasses[2];
        index--;
        if (index < 0) index = data.glasses[3].length - 1;
        copy.glasses = [data.glasses[0], data.glasses[1], index, copy.glasses[3]];
        setData({ ...copy });
    };

    const glassesColorNext = () => {
        let copy = data;
        let index = data.glasses[2];
        index++;
        if (index > data.glasses[3].length - 1) index = 0;
        copy.glasses = [data.glasses[0], data.glasses[1], index, copy.glasses[3]];
        setData({ ...copy });
    };

    const glassesColorDisabled = data.glasses[3].length > 1 ? false : true;

    const watchesPrev = () => {
        let copy = data;
        let index = data.watches[0];
        index--;
        if (index < 0) index = availableWatches[sex].length - 1;
        copy.watches = [index, availableWatches[sex][index], 0, copy.watches[3]];
        setData({ ...copy });
    };

    const watchesNext = () => {
        let copy = data;
        let index = data.watches[0];
        index++;
        if (index > availableWatches[sex].length - 1) index = 0;
        copy.watches = [index, availableWatches[sex][index], 0, copy.watches[3]];
        setData({ ...copy });
    };

    const watchesColorPrev = () => {
        let copy = data;
        let index = data.watches[2];
        index--;
        if (index < 0) index = data.watches[3].length - 1;
        copy.watches = [data.watches[0], data.watches[1], index, copy.watches[3]];
        setData({ ...copy });
    };

    const watchesColorNext = () => {
        let copy = data;
        let index = data.watches[2];
        index++;
        if (index > data.watches[3].length - 1) index = 0;
        copy.watches = [data.watches[0], data.watches[1], index, copy.watches[3]];
        setData({ ...copy });
    };

    const watchesColorDisabled = data.watches[3].length > 1 ? false : true;

    const earsPrev = () => {
        let copy = data;
        let index = data.ears[0];
        index--;
        if (index < 0) index = availableEars[sex].length - 1;
        copy.ears = [index, availableEars[sex][index], 0, copy.ears[3]];
        setData({ ...copy });
    };

    const earsNext = () => {
        let copy = data;
        let index = data.ears[0];
        index++;
        if (index > availableEars[sex].length - 1) index = 0;
        copy.ears = [index, availableEars[sex][index], 0, copy.ears[3]];
        setData({ ...copy });
    };

    const earsColorPrev = () => {
        let copy = data;
        let index = data.ears[2];
        index--;
        if (index < 0) index = data.ears[3].length - 1;
        copy.ears = [data.ears[0], data.ears[1], index, copy.ears[3]];
        setData({ ...copy });
    };

    const earsColorNext = () => {
        let copy = data;
        let index = data.ears[2];
        index++;
        if (index > data.ears[3].length - 1) index = 0;
        copy.ears = [data.ears[0], data.ears[1], index, copy.ears[3]];
        setData({ ...copy });
    };

    const earsColorDisabled = data.ears[3].length > 1 ? false : true;

    const braceletsPrev = () => {
        let copy = data;
        let index = data.bracelets[0];
        index--;
        if (index < 0) index = availableBracelets[sex].length - 1;
        copy.bracelets = [index, availableBracelets[sex][index], 0, copy.bracelets[3]];
        setData({ ...copy });
    };

    const braceletsNext = () => {
        let copy = data;
        let index = data.bracelets[0];
        index++;
        if (index > availableBracelets[sex].length - 1) index = 0;
        copy.bracelets = [index, availableBracelets[sex][index], 0, copy.bracelets[3]];
        setData({ ...copy });
    };

    const braceletsColorPrev = () => {
        let copy = data;
        let index = data.bracelets[2];
        index--;
        if (index < 0) index = data.bracelets[3].length - 1;
        copy.bracelets = [data.bracelets[0], data.bracelets[1], index, copy.bracelets[3]];
        setData({ ...copy });
    };

    const braceletsColorNext = () => {
        let copy = data;
        let index = data.bracelets[2];
        index++;
        if (index > data.bracelets[3].length - 1) index = 0;
        copy.bracelets = [data.bracelets[0], data.bracelets[1], index, copy.bracelets[3]];
        setData({ ...copy });
    };

    const braceletsColorDisabled = data.bracelets[3].length > 1 ? false : true;

    return (
        <>
            <div className="font-marker text-3xl text-center">{translate('charCreator', 'accesories')}</div>
            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'glasses')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.glasses[0]}/${availableGlasses[sex].length - 1}`}
                    onBack={glassesPrev}
                    onForward={glassesNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.glasses[2]}/${data.glasses[3].length === 0 ? 0 : data.glasses[3].length - 1}`}
                    onBack={glassesColorPrev}
                    onForward={glassesColorNext}
                    disabled={glassesColorDisabled}
                />
            </div>
            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'watches')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.watches[0]}/${availableWatches[sex].length - 1}`}
                    onBack={watchesPrev}
                    onForward={watchesNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.watches[2]}/${data.watches[3].length === 0 ? 0 : data.watches[3].length - 1}`}
                    onBack={watchesColorPrev}
                    onForward={watchesColorNext}
                    disabled={watchesColorDisabled}
                />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'ears')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.ears[0]}/${availableEars[sex].length - 1}`}
                    onBack={earsPrev}
                    onForward={earsNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.ears[2]}/${data.ears[3].length === 0 ? 0 : data.ears[3].length - 1}`}
                    onBack={earsColorPrev}
                    onForward={earsColorNext}
                    disabled={earsColorDisabled}
                />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'bracelets')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.bracelets[0]}/${availableBracelets[sex].length - 1}`}
                    onBack={braceletsPrev}
                    onForward={braceletsNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.bracelets[2]}/${data.bracelets[3].length === 0 ? 0 : data.bracelets[3].length - 1}`}
                    onBack={braceletsColorPrev}
                    onForward={braceletsColorNext}
                    disabled={braceletsColorDisabled}
                />
            </div>

            <Divider />
        </>
    );
};
