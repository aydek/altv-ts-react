import React from 'react';
import { appearanceItemNames, appearanceNames } from '../../data/appearance';
import { MAX_HAIR_COLORS } from '../../data/hair';
import { IAppearanceState } from '../../data/state';
import ButtonGroup from '../../../../components/ButtonGroup';
import Divider from '../../../../components/Divider';
import { IconClose, IconShuffle } from '../../../../components/SVG';
import ChevronSelector from '../../../../components/ChevronSelector';
import Slider from '../../../../components/Slider';
import { translate } from '../../../../config';

export const Appearance = ({
    data,
    setData,
}: {
    data: IAppearanceState;
    setData: React.Dispatch<React.SetStateAction<IAppearanceState>>;
}) => {
    const handleChange = (val: string, i: number) => {
        if (val === 'prev') {
            let copy = data;
            let index = copy.appearanceValue[i].index;
            index--;
            if (index < 0) index = appearanceItemNames[i].length - 1;
            copy.appearanceValue[i].index = index;
            setData({ ...copy });
            return;
        }
        if (val === 'next') {
            let copy = data;
            let index = copy.appearanceValue[i].index;
            index++;
            if (index > appearanceItemNames[i].length - 1) index = 0;
            copy.appearanceValue[i].index = index;
            setData({ ...copy });
            return;
        }
    };
    const opacityChange = (event: any, i: number) => {
        const copy = data;
        copy.appearanceValue[i].opacity = event.target.value;
        setData({ ...copy });
    };

    const colorChange = (event: any, i: number) => {
        const copy = data;
        copy.appearanceValue[i].color = parseInt(event.target.value);
        setData({ ...copy });
    };

    const reset = () => {
        const copy = data;
        copy.appearanceValue.map((val, i) => {
            copy.appearanceValue[i].index = 0;
            copy.appearanceValue[i].opacity = 100;
            copy.appearanceValue[i].color = 0;
        });
        setData({ ...copy });
    };

    const random = () => {
        const copy = data;
        copy.appearanceValue.map((val, i) => {
            copy.appearanceValue[i].index = Math.floor(Math.random() * appearanceItemNames[i].length);
            copy.appearanceValue[i].opacity = Math.floor(Math.random() * 100);
            copy.appearanceValue[i].color = Math.floor(Math.random() * MAX_HAIR_COLORS);
        });
        setData({ ...copy });
    };

    return (
        <>
            <div className="font-marker text-3xl text-center">{translate('charCreator', 'appearance')}</div>
            <Divider />
            <AppearanceContent
                handleChange={handleChange}
                opacityChange={opacityChange}
                colorChange={colorChange}
                state={data}
            />
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

interface IAppearanceContent {
    handleChange: (val: string, i: number) => void;
    opacityChange: (event: any, i: number) => void;
    colorChange: (event: any, i: number) => void;
    state: IAppearanceState;
}

function AppearanceContent(props: IAppearanceContent) {
    const { state, handleChange, opacityChange, colorChange } = props;
    let indents = [];
    for (let i = 0; i < appearanceNames.length; i++) {
        const name = appearanceItemNames[i][state.appearanceValue[i].index];
        if (appearanceNames[i] === 'Skip') continue;
        indents.push(
            <div key={i}>
                <div className="flex items-center justify-between">
                    <div>{appearanceNames[i]}:</div>
                    <ChevronSelector
                        width="w-44"
                        text={name}
                        onBack={() => handleChange('prev', i)}
                        onForward={() => handleChange('next', i)}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div>{translate('charCreator', 'opacity')}:</div>

                    <Slider
                        min={0}
                        max={100}
                        step={1}
                        value={state.appearanceValue[i].opacity}
                        className="ml-3"
                        onChange={(e) => opacityChange(e, i)}
                    />
                </div>

                {appearanceNames[i] === 'Blush' || appearanceNames[i] === 'Lipstick' ? (
                    <div className="flex items-center justify-between">
                        <div>{translate('charCreator', 'color')}:</div>

                        <Slider
                            min={0}
                            max={MAX_HAIR_COLORS}
                            step={1}
                            value={state.appearanceValue[i].color}
                            className="ml-3"
                            onChange={(e) => colorChange(e, i)}
                        />
                    </div>
                ) : (
                    <></>
                )}
                <Divider />
            </div>
        );
    }
    return <>{indents}</>;
}
