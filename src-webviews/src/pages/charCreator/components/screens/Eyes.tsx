import React from 'react';
import { eyeBrows, eyeColors } from '../../data/eyes';
import { MAX_HAIR_COLORS } from '../../data/hair';
import { IEyesState } from '../../data/state';
import ChevronSelector from '../../../../components/ChevronSelector';
import Slider from '../../../../components/Slider';
import ButtonGroup from '../../../../components/ButtonGroup';
import { IconClose, IconShuffle } from '../../../../components/SVG';
import { translate } from '../../../../config';

export const Eyes = ({
    data,
    setData,
}: {
    data: IEyesState;
    setData: React.Dispatch<React.SetStateAction<IEyesState>>;
}) => {
    const eyeColorName = eyeColors[data.eyeIndex];
    const eyebrowsName = eyeBrows[data.eyebrowsIndex];

    const eyesPrev = () => {
        let index = data.eyeIndex;
        const clone = data;
        index--;
        if (index < 0) index = eyeColors.length - 1;
        clone.eyeIndex = index;
        setData({ ...clone });
    };

    const eyesNext = () => {
        let index = data.eyeIndex;
        const clone = data;
        index++;
        if (index > eyeColors.length - 1) index = 0;
        clone.eyeIndex = index;
        setData({ ...clone });
    };

    const eyebrowsPrev = () => {
        let index = data.eyebrowsIndex;
        const clone = data;
        index--;
        if (index < 0) index = eyeBrows.length - 1;
        clone.eyebrowsIndex = index;
        setData({ ...clone });
    };

    const eyebrowsNext = () => {
        let index = data.eyebrowsIndex;
        const clone = data;
        index++;
        if (index > eyeBrows.length - 1) index = 0;
        clone.eyebrowsIndex = index;
        setData({ ...clone });
    };

    const colorChange = (id: number) => {
        const clone = data;
        clone.eyebrowsColor = id;
        setData({ ...clone });
    };

    const reset = () => {
        const clone = data;
        clone.eyeIndex = 0;
        clone.eyebrowsIndex = 0;
        clone.eyebrowsOpacity = 100;
        clone.eyebrowsColor = 0;
        setData({ ...clone });
    };

    const random = () => {
        const clone = data;
        clone.eyeIndex = Math.floor(Math.random() * eyeColors.length);
        clone.eyebrowsIndex = Math.floor(Math.random() * eyeBrows.length);
        clone.eyebrowsOpacity = Math.floor(Math.random() * 100);
        clone.eyebrowsColor = Math.floor(Math.random() * MAX_HAIR_COLORS);
        setData({ ...clone });
    };

    return (
        <>
            <div className="font-marker text-3xl text-center mb-8">{translate('charCreator', 'eyes')}</div>

            <div className="flex items-center justify-between mb-3">
                <div>{translate('charCreator', 'eyecolor')}:</div>
                <ChevronSelector width="w-44" text={eyeColorName} onBack={eyesPrev} onForward={eyesNext} />
            </div>

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'eyebrows')}:</div>
                <ChevronSelector width="w-44" text={eyebrowsName} onBack={eyebrowsPrev} onForward={eyebrowsNext} />
            </div>
            <div className="flex items-center justify-between mb-3">
                <div>{translate('charCreator', 'opacity')}:</div>

                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={data.eyebrowsOpacity}
                    className="ml-3"
                    onChange={(e) => {
                        setData({ ...data, eyebrowsOpacity: parseInt(e.target.value) });
                    }}
                />
            </div>

            <div>{translate('charCreator', 'eyebrowscolor')}:</div>
            <HairColors colorChange={colorChange} />

            <ButtonGroup
                onFirst={reset}
                firstText={translate('charCreator', 'reset')}
                firstIcon={<IconClose className="-translate-x-5" />}
                onSecond={random}
                secondText={translate('charCreator', 'randomize')}
                secondIcon={<IconShuffle className="translate-x-5" />}
            />
        </>
    );
};

interface IHairColors {
    colorChange: (i: number) => void;
}

const HairColors = (props: IHairColors) => {
    let posX: number = 0;
    let posY: number = 0;
    let indents: JSX.Element[] = [];

    for (let i = 0; i < MAX_HAIR_COLORS; i++) {
        posX = i * -30;
        indents.push(
            <div
                key={i}
                className="color-icons"
                style={{ backgroundPosition: `${posX}px ${posY}px` }}
                onClick={() => props.colorChange(i)}
            ></div>
        );
        if (i === 12 || i === 25 || i === 38 || i === 51) {
            posY += -30;
        }
    }

    return <div style={{ padding: '5px 8px' }}>{indents}</div>;
};
