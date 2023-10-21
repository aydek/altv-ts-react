import React from 'react';
import { availableTops } from '../../data/tops';
import { IClothesState } from '../../data/state';
import ChevronSelector from '../../../../components/ChevronSelector';
import { translate } from '../../../../config';

export const Top = ({
    data,
    setData,
    sex,
}: {
    data: IClothesState;
    setData: React.Dispatch<React.SetStateAction<IClothesState>>;
    sex: number;
}) => {
    const topPrev = () => {
        let copy = data;
        let index = data.tops[0];
        index--;
        if (index < 0) index = availableTops[sex].length - 1;
        copy.tops = [index, availableTops[sex][index], 0, copy.tops[3], 0, 0, 0, [0]];
        setData({ ...copy });
    };

    const topNext = () => {
        let copy = data;
        let index = data.tops[0];
        index++;
        if (index > availableTops[sex].length - 1) index = 0;
        copy.tops = [index, availableTops[sex][index], 0, copy.tops[3], 0, 0, 0, [0]];
        setData({ ...copy });
    };

    const colorPrev = () => {
        let copy = data;
        let index = data.tops[2];
        index--;
        if (index < 0) index = data.tops[3].length - 1;
        copy.tops = [data.tops[0], data.tops[1], index, copy.tops[3], 0, 0, 0, [0]];
        setData({ ...copy });
    };

    const colorNext = () => {
        let copy = data;
        let index = data.tops[2];
        index++;
        if (index > data.tops[3].length - 1) index = 0;
        copy.tops = [data.tops[0], data.tops[1], index, copy.tops[3], 0, 0, 0, [0]];
        setData({ ...copy });
    };

    const colorDisabled = data.tops[3].length > 1 ? false : true;

    const underPrev = () => {
        let copy = data;
        let index = data.tops[4];
        index--;
        if (index < 0) index = data.tops[5] - 1;
        copy.tops = [copy.tops[0], copy.tops[1], copy.tops[2], copy.tops[3], index, copy.tops[5], 0, [0]];
        setData({ ...copy });
    };

    const underNext = () => {
        let copy = data;
        let index = data.tops[4];
        index++;
        if (index > data.tops[5] - 1) index = 0;
        copy.tops = [copy.tops[0], copy.tops[1], copy.tops[2], copy.tops[3], index, copy.tops[5], 0, [0]];
        setData({ ...copy });
    };

    const underColorPrev = () => {
        let copy = data;
        let index = data.tops[6];
        index--;
        if (index < 0) index = data.tops[7].length - 1;
        copy.tops = [
            copy.tops[0],
            copy.tops[1],
            copy.tops[2],
            copy.tops[3],
            copy.tops[4],
            copy.tops[5],
            index,
            copy.tops[7],
        ];
        setData({ ...copy });
    };

    const underColorNext = () => {
        let copy = data;
        let index = data.tops[6];
        index++;
        if (index > data.tops[7].length - 1) index = 0;
        copy.tops = [
            copy.tops[0],
            copy.tops[1],
            copy.tops[2],
            copy.tops[3],
            copy.tops[4],
            copy.tops[5],
            index,
            copy.tops[7],
        ];
        setData({ ...copy });
    };

    const underColorDisabled = data.tops[7].length > 1 ? false : true;

    return (
        <>
            <div className="font-marker text-3xl text-center mb-8">{translate('charCreator', 'top')}</div>

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'top')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.tops[0]}/${availableTops[sex].length - 1}`}
                    onBack={topPrev}
                    onForward={topNext}
                />
            </div>

            <div className="flex items-center justify-between mt-1 mb-3">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.tops[2]}/${data.tops[3].length - 1 < 0 ? 0 : data.tops[3].length - 1}`}
                    onBack={colorPrev}
                    onForward={colorNext}
                    disabled={colorDisabled}
                />
            </div>

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'undershirt')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.tops[4]}/${data.tops[5] - 1 < 0 ? 0 : data.tops[5] - 1}`}
                    onBack={underPrev}
                    onForward={underNext}
                    disabled={data.tops[5] < 2}
                />
            </div>

            <div className="flex items-center justify-between mt-1 mb-3">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.tops[6]}/${data.tops[7].length - 1 < 0 ? 0 : data.tops[7].length - 1}`}
                    onBack={underColorPrev}
                    onForward={underColorNext}
                    disabled={underColorDisabled}
                />
            </div>
        </>
    );
};
