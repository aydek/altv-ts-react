import React from 'react';
import { featureNames } from '../../data/features';
import { IFeaturesState } from '../../data/state';
import ButtonGroup from '../../../../components/ButtonGroup';
import { IconClose, IconShuffle } from '../../../../components/SVG';
import Slider from '../../../../components/Slider';
import { translate } from '../../../../config';

export const Features = ({
    data,
    setData,
}: {
    data: IFeaturesState;
    setData: React.Dispatch<React.SetStateAction<IFeaturesState>>;
}) => {
    const handleChange = (event: any, i: number) => {
        let clone = data;
        clone.featureValue[i] = event.target.value;
        setData({ ...clone });
    };

    const reset = () => {
        featureNames.map((val, index) => {
            let clone = data;
            clone.featureValue[index] = 0;
            setData({ ...clone });
        });
    };

    const random = () => {
        featureNames.map((val, index) => {
            let clone = data;
            clone.featureValue[index] = Math.random() * 2 - 1;
            setData({ ...clone });
        });
    };

    return (
        <>
            <div className="font-marker text-3xl text-center mb-8">{translate('charCreator', 'features')}</div>

            <FeaturesFetch handleChange={handleChange} value={data.featureValue} />

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

function FeaturesFetch(props: { handleChange: (e: any, i: number) => void; value: number[] }) {
    const { value, handleChange } = props;
    let indents: JSX.Element[] = [];

    for (let i = 0; i < featureNames.length; i++) {
        indents.push(
            <div className="flex items-center justify-between" key={i}>
                <div className="whitespace-nowrap">{featureNames[i]}:</div>

                <Slider
                    min={-1}
                    max={1}
                    step={0.05}
                    value={value[i]}
                    className="ml-3"
                    onChange={(e) => handleChange(e, i)}
                />
            </div>
        );
    }
    return <>{indents}</>;
}
