import React from 'react';
import { chestHair, facialHair, hairList, MAX_HAIR_COLORS } from '../../data/hair';
import { IHairState } from '../../data/state';
import Divider from '../../../../components/Divider';
import ChevronSelector from '../../../../components/ChevronSelector';
import Slider from '../../../../components/Slider';
import Accordion from '../../../../components/Accordion';
import { IconClose, IconShuffle } from '../../../../components/SVG';
import ButtonGroup from '../../../../components/ButtonGroup';
import { translate } from '../../../../config';

export const Hair = ({
    data,
    setData,
    sex,
}: {
    data: IHairState;
    setData: React.Dispatch<React.SetStateAction<IHairState>>;
    sex: number;
}) => {
    const hairName = hairList[sex][data.hairIndex].Name;
    const facialHairName = facialHair[data.facialHairIndex];
    const chestHairName = chestHair[data.chestHairIndex];

    const [expansion, setExpansion] = React.useState(-1);

    const expandPanel = (index: number) => {
        setExpansion((prevIndex) => (prevIndex === index ? -1 : index));
    };

    const changeHair = (up: boolean) => () => {
        if (!up) {
            if (data.hairIndex === 0) {
                setData({
                    ...data,
                    hairIndex: hairList[sex].length - 1,
                    hairID: hairList[sex][hairList[sex].length - 1].ID,
                });
                return;
            }
            setData({ ...data, hairIndex: data.hairIndex - 1, hairID: hairList[sex][data.hairIndex - 1].ID });
            return;
        }
        if (data.hairIndex === hairList[sex].length - 1) {
            setData({ ...data, hairIndex: 0, hairID: hairList[sex][0].ID });
            return;
        }
        setData({ ...data, hairIndex: data.hairIndex + 1, hairID: hairList[sex][data.hairIndex + 1].ID });
    };

    const changeBeard = (up: boolean) => () => {
        if (!up) {
            if (data.facialHairIndex === 0) {
                setData({ ...data, facialHairIndex: facialHair.length - 1 });
                return;
            }
            setData({ ...data, facialHairIndex: data.facialHairIndex - 1 });
            return;
        }
        if (data.facialHairIndex === facialHair.length - 1) {
            setData({ ...data, facialHairIndex: 0 });
            return;
        }
        setData({ ...data, facialHairIndex: data.facialHairIndex + 1 });
    };

    const changeChestHair = (up: boolean) => () => {
        if (!up) {
            if (data.chestHairIndex === 0) {
                setData({ ...data, chestHairIndex: chestHair.length - 1 });
                return;
            }
            setData({ ...data, chestHairIndex: data.chestHairIndex - 1 });
            return;
        }
        if (data.chestHairIndex === chestHair.length - 1) {
            setData({ ...data, chestHairIndex: 0 });
            return;
        }
        setData({ ...data, chestHairIndex: data.chestHairIndex + 1 });
    };

    const colorChange = (cat: number, i: number) => {
        if (cat === 0) setData({ ...data, hairColor: i });
        if (cat === 1) setData({ ...data, highlightColor: i });
        if (cat === 2) setData({ ...data, facialHairColor: i });
        if (cat === 3) setData({ ...data, chestHairColor: i });
    };

    const reset = () => {
        setData({
            ...data,
            hairIndex: 0,
            hairID: hairList[sex][0].ID,
            facialHairIndex: 0,
            chestHairIndex: 0,
            facialHairOpacity: 100,
            chestHairOpacity: 100,
            hairColor: 0,
            highlightColor: 0,
            facialHairColor: 0,
            chestHairColor: 0,
        });
    };

    const random = () => {
        const index = Math.floor(Math.random() * hairList[sex].length);
        const facialIndex = Math.floor(Math.random() * facialHair.length);
        const chestIndex = Math.floor(Math.random() * chestHair.length);
        const facialO = sex === 0 ? Math.floor(Math.random() * 100) : 0;
        const chestO = sex === 0 ? Math.floor(Math.random() * 100) : 0;
        const color = Math.floor(Math.random() * MAX_HAIR_COLORS);
        const highlightColor = Math.floor(Math.random() * MAX_HAIR_COLORS);
        const facialColor = Math.floor(Math.random() * MAX_HAIR_COLORS);
        const chestColor = Math.floor(Math.random() * MAX_HAIR_COLORS);
        setData({
            ...data,
            hairIndex: index,
            hairID: hairList[sex][index].ID,
            facialHairIndex: facialIndex,
            chestHairIndex: chestIndex,
            facialHairOpacity: facialO,
            chestHairOpacity: chestO,
            hairColor: color,
            highlightColor: highlightColor,
            facialHairColor: facialColor,
            chestHairColor: chestColor,
        });
    };

    return (
        <>
            <div className="font-marker text-3xl text-center">{translate('charCreator', 'hair')}</div>
            <Divider />
            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'hairstyle')}:</div>
                <ChevronSelector width="w-44" text={hairName} onBack={changeHair(false)} onForward={changeHair(true)} />
            </div>
            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'facialhair')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={facialHairName}
                    onBack={changeBeard(false)}
                    onForward={changeBeard(true)}
                />
            </div>
            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'opacity')}:</div>

                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={data.facialHairOpacity}
                    className="ml-3"
                    onChange={(e) => {
                        setData({ ...data, facialHairOpacity: parseInt(e.target.value) });
                    }}
                />
            </div>

            <Divider />

            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'chesthair')}:</div>
                <ChevronSelector
                    width="w-44"
                    text={chestHairName}
                    onBack={changeChestHair(false)}
                    onForward={changeChestHair(true)}
                />
            </div>
            <div className="flex items-center justify-between">
                <div>{translate('charCreator', 'opacity')}:</div>

                <Slider
                    min={0}
                    max={100}
                    step={1}
                    value={data.chestHairOpacity}
                    className="ml-3"
                    onChange={(e) => {
                        setData({ ...data, chestHairOpacity: parseInt(e.target.value) });
                    }}
                />
            </div>
            <Divider />
            <Accordion
                title={translate('charCreator', 'haircolor')}
                index={0}
                openIndex={expansion}
                setOpenIndex={() => expandPanel(0)}
            >
                <HairColors colorChange={colorChange} panel={0} />
            </Accordion>
            <Accordion
                title={translate('charCreator', 'hairhighlights')}
                index={1}
                openIndex={expansion}
                setOpenIndex={() => expandPanel(1)}
            >
                <HairColors colorChange={colorChange} panel={1} />
            </Accordion>
            <Accordion
                title={translate('charCreator', 'facialcolor')}
                index={2}
                openIndex={expansion}
                setOpenIndex={() => expandPanel(2)}
            >
                <HairColors colorChange={colorChange} panel={2} />
            </Accordion>
            <Accordion
                title={translate('charCreator', 'chestcolor')}
                index={3}
                openIndex={expansion}
                setOpenIndex={() => expandPanel(3)}
            >
                <HairColors colorChange={colorChange} panel={3} />
            </Accordion>

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
    colorChange: (cat: number, i: number) => void;
    panel: number;
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
                onClick={() => props.colorChange(props.panel, i)}
            ></div>
        );
        if (i === 12 || i === 25 || i === 38 || i === 51) {
            posY += -30;
        }
    }

    return <div style={{ padding: '0 8px' }}>{indents}</div>;
};
