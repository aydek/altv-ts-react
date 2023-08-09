import React from 'react';
import { fathers, mothers } from '../../data/parents';
import { IParentState } from '../../data/state';
import Divider from '../../../../components/Divider';
import ChevronSelector from '../../../../components/ChevronSelector';
import Slider from '../../../../components/Slider';
import ButtonGroup from '../../../../components/ButtonGroup';
import { IconClose, IconShuffle } from '../../../../components/SVG';
import { translate } from '../../../../config';

export const Parents = ({
    data,
    setData,
    sex,
}: {
    data: IParentState;
    setData: React.Dispatch<React.SetStateAction<IParentState>>;
    sex: number;
}) => {
    const motherName = mothers[data.motherIndex].name;
    const fatherName = fathers[data.fatherIndex].name;

    const changeMother = (up: boolean) => () => {
        if (!up) {
            if (data.motherIndex === 0) {
                setData({ ...data, motherIndex: mothers.length - 1, motherID: mothers[mothers.length - 1].id });
                return;
            }
            setData({ ...data, motherIndex: data.motherIndex - 1, motherID: mothers[data.motherIndex - 1].id });
            return;
        }
        if (data.motherIndex === mothers.length - 1) {
            setData({ ...data, motherIndex: 0, motherID: mothers[0].id });
            return;
        }
        setData({ ...data, motherIndex: data.motherIndex + 1, motherID: mothers[data.motherIndex + 1].id });
    };

    const changeFather = (up: boolean) => () => {
        if (!up) {
            if (data.fatherIndex === 0) {
                setData({ ...data, fatherIndex: fathers.length - 1, fatherID: fathers[fathers.length - 1].id });
                return;
            }
            setData({ ...data, fatherIndex: data.fatherIndex - 1, fatherID: fathers[data.fatherIndex - 1].id });
            return;
        }
        if (data.fatherIndex === fathers.length - 1) {
            setData({ ...data, fatherIndex: 0, fatherID: fathers[0].id });
            return;
        }
        setData({ ...data, fatherIndex: data.fatherIndex + 1, fatherID: fathers[data.fatherIndex + 1].id });
    };

    const resetParents = () => {
        setData({ ...data, resemblance: 50, skintone: 50, motherIndex: 0, fatherIndex: 0, motherID: 21, fatherID: 0 });
    };

    const randomParents = () => {
        const resemblance = sex === 0 ? 50 + Math.floor(Math.random() * 50) : Math.floor(Math.random() * 50);
        const skintone = Math.floor(Math.random() * 100);
        const mother = Math.floor(Math.random() * mothers.length);
        const father = Math.floor(Math.random() * fathers.length);
        setData({
            ...data,
            resemblance: resemblance,
            skintone: skintone,
            motherIndex: mother,
            fatherIndex: father,
            motherID: mothers[mother].id,
            fatherID: fathers[father].id,
        });
    };

    return (
        <div>
            <div className="font-marker text-3xl text-center">{translate('charCreator', 'dna')}</div>
            <Divider />

            <div className="relative">
                <img className="rounded-md" src={new URL('../../images/mumdadbg.png', import.meta.url).href}></img>
                <div className="absolute bottom-0 w-full">
                    <img
                        className="w-1/2 absolute bottom-0 "
                        src={new URL(`../../images/parents/${motherName}.png`, import.meta.url).href}
                    />
                    <img
                        className="w-1/2 absolute bottom-0 right-0"
                        src={new URL(`../../images/parents/${fatherName}.png`, import.meta.url).href}
                    />
                </div>
                <img
                    className="absolute top-0 rounded-md"
                    src={new URL('../../images/vignette.png', import.meta.url).href}
                ></img>
            </div>
            <div className="flex justify-between w-full my-3">
                <ChevronSelector
                    width="w-20"
                    text={motherName}
                    onBack={changeMother(false)}
                    onForward={changeMother(true)}
                />
                <ChevronSelector
                    width="w-20"
                    text={fatherName}
                    onBack={changeFather(false)}
                    onForward={changeFather(true)}
                />
            </div>

            <div className="flex items-center space-x-2">
                <div>{translate('charCreator', 'resemblance')}: </div>
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={data.resemblance}
                    onChange={(e) => {
                        setData({ ...data, resemblance: parseInt(e.target.value) });
                    }}
                />
            </div>
            <div className="flex items-center space-x-2">
                <div>{translate('charCreator', 'skintone')}: </div>
                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={data.skintone}
                    onChange={(e) => {
                        setData({ ...data, skintone: parseInt(e.target.value) });
                    }}
                />
            </div>
            <Divider />
            <ButtonGroup
                onFirst={resetParents}
                firstText={translate('charCreator', 'reset')}
                firstIcon={<IconClose className="-translate-x-5" />}
                onSecond={randomParents}
                secondText={translate('charCreator', 'randomize')}
                secondIcon={<IconShuffle className="translate-x-5" />}
            />
        </div>
    );
};
