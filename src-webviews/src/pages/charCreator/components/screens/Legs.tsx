import React from 'react';
import { availablePants } from '../../data/pants';
import { IClothesState } from '../../data/state';
import ChevronSelector from '../../../../components/ChevronSelector';
import { translate } from '../../../../config';

export const Legs = ({
    data,
    setData,
    sex,
}: {
    data: IClothesState;
    setData: React.Dispatch<React.SetStateAction<IClothesState>>;
    sex: number;
}) => {
    const pantsPrev = () => {
        let copy = data;
        let index = data.pants[0];
        index--;
        if (index < 0) index = availablePants[sex].length - 1;
        copy.pants = [index, availablePants[sex][index], 0, copy.pants[3]];
        setData({ ...copy });
    };

    const pantsNext = () => {
        let copy = data;
        let index = data.pants[0];
        index++;
        if (index > availablePants[sex].length - 1) index = 0;
        copy.pants = [index, availablePants[sex][index], 0, copy.pants[3]];
        setData({ ...copy });
    };

    const colorPrev = () => {
        let copy = data;
        let index = data.pants[2];
        index--;
        if (index < 0) index = data.pants[3].length - 1;
        copy.pants = [data.pants[0], data.pants[1], index, copy.pants[3]];
        setData({ ...copy });
    };

    const colorNext = () => {
        let copy = data;
        let index = data.pants[2];
        index++;
        if (index > data.pants[3].length - 1) index = 0;
        copy.pants = [data.pants[0], data.pants[1], index, copy.pants[3]];
        setData({ ...copy });
    };

    const colorDisabled = data.pants[3].length > 1 ? false : true;

    return (
        <>
            <div className="font-marker text-3xl text-center mb-8">{translate('charCreator', 'pants')}</div>

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'pants')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.pants[0]}/${availablePants[sex].length - 1}`}
                    onBack={pantsPrev}
                    onForward={pantsNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.pants[2]}/${data.pants[3].length - 1}`}
                    onBack={colorPrev}
                    onForward={colorNext}
                    disabled={colorDisabled}
                />
            </div>
        </>
    );
};
