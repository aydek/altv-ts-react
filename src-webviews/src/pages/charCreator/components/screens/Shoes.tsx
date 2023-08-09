import React from 'react';
import { availableShoes } from '../../data/shoes';
import { IClothesState } from '../../data/state';
import ChevronSelector from '../../../../components/ChevronSelector';
import Divider from '../../../../components/Divider';
import { translate } from '../../../../config';

export const Shoes = ({
    data,
    setData,
    sex,
}: {
    data: IClothesState;
    setData: React.Dispatch<React.SetStateAction<IClothesState>>;
    sex: number;
}) => {
    const shoesPrev = () => {
        let copy = data;
        let index = data.shoes[0];
        index--;
        if (index < 0) index = availableShoes[sex].length - 1;
        copy.shoes = [index, availableShoes[sex][index], 0, copy.shoes[3]];
        setData({ ...copy });
    };

    const shoesNext = () => {
        let copy = data;
        let index = data.shoes[0];
        index++;
        if (index > availableShoes[sex].length - 1) index = 0;
        copy.shoes = [index, availableShoes[sex][index], 0, copy.shoes[3]];
        setData({ ...copy });
    };

    const colorPrev = () => {
        let copy = data;
        let index = data.shoes[2];
        index--;
        if (index < 0) index = data.shoes[3].length - 1;
        copy.shoes = [data.shoes[0], data.shoes[1], index, copy.shoes[3]];
        setData({ ...copy });
    };

    const colorNext = () => {
        let copy = data;
        let index = data.shoes[2];
        index++;
        if (index > data.shoes[3].length - 1) index = 0;
        copy.shoes = [data.shoes[0], data.shoes[1], index, copy.shoes[3]];
        setData({ ...copy });
    };

    const colorDisabled = data.shoes[3].length > 1 ? false : true;

    return (
        <>
            <div className="font-marker text-3xl text-center">{translate('charCreator', 'shoes')}</div>
            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'shoes')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.shoes[0]}/${availableShoes[sex].length - 1}`}
                    onBack={shoesPrev}
                    onForward={shoesNext}
                />
            </div>

            <div className="flex items-center justify-between mt-2">
                <div>{translate('charCreator', 'color')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={`${data.shoes[2]}/${data.shoes[3].length - 1}`}
                    onBack={colorPrev}
                    onForward={colorNext}
                    disabled={colorDisabled}
                />
            </div>

            <Divider />
        </>
    );
};
