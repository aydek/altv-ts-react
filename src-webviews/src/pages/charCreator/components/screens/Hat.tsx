import React from 'react';
import { availableHats } from '../../data/hat';
import { IClothesState } from '../../data/state';
import ChevronSelector from '../../../../components/ChevronSelector';
import Divider from '../../../../components/Divider';
import { translate } from '../../../../config';

export const Hat = ({
    data,
    setData,
    sex,
}: {
    data: IClothesState;
    setData: React.Dispatch<React.SetStateAction<IClothesState>>;
    sex: number;
}) => {
    const hatPrev = () => {
        let copy = data;
        let index = data.hats[0];
        index--;
        if (index < 0) index = availableHats[sex].length - 1;
        copy.hats = [index, availableHats[sex][index], 0, copy.hats[3]];
        setData({ ...copy });
    };

    const hatNext = () => {
        let copy = data;
        let index = data.hats[0];
        index++;
        if (index > availableHats[sex].length - 1) index = 0;
        copy.hats = [index, availableHats[sex][index], 0, copy.hats[3]];
        setData({ ...copy });
    };

    const colorPrev = () => {
        let copy = data;
        let index = data.hats[2];
        index--;
        if (index < 0) index = data.hats[3].length - 1;
        copy.hats = [data.hats[0], data.hats[1], index, copy.hats[3]];
        setData({ ...copy });
    };

    const colorNext = () => {
        let copy = data;
        let index = data.hats[2];
        index++;
        if (index > data.hats[3].length - 1) index = 0;
        copy.hats = [data.hats[0], data.hats[1], index, copy.hats[3]];
        setData({ ...copy });
    };

    const colorDisabled = data.hats[3].length > 1 ? false : true;

    return (
        <>
            <div className="font-marker text-3xl text-center">{translate('charCreator', 'hat')}</div>
            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'hat')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.hats[0]}/${availableHats[sex].length - 1}`}
                    onBack={hatPrev}
                    onForward={hatNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.hats[2]}/${data.hats[3].length - 1}`}
                    onBack={colorPrev}
                    onForward={colorNext}
                    disabled={colorDisabled}
                />
            </div>

            <Divider />
        </>
    );
};
