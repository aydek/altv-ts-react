import React, { useState } from 'react';
import genderIMG from '../images/sex.png';
import Container from '../../../components/Container';
import Divider from '../../../components/Divider';
import { ArrowLeft, Camera, Check } from '../../../components/SVG';
import Dialog from '../../../components/DIalog';
import ButtonGroup from '../../../components/ButtonGroup';
import TextField from '../../../components/Textfield';
import { translate } from '../../../config';

const menuItems: Array<
    'dna' | 'hair' | 'eyes' | 'features' | 'appearance' | 'hat' | 'accesories' | 'top' | 'pants' | 'shoes'
> = ['dna', 'hair', 'eyes', 'features', 'appearance', 'hat', 'accesories', 'top', 'pants', 'shoes'];

export const Mainmenu = ({
    index,
    setIndex,
    sex,
    setSex,
}: {
    index: number;
    setIndex: React.Dispatch<React.SetStateAction<number>>;
    sex: number;
    setSex: (state: number) => void;
}) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [firstNameHelp, setFirstNameHelp] = useState('');
    const [lastName, setLastName] = useState('');
    const [lastNameHelp, setLastNameHelp] = useState('');
    const [age, setAge] = useState('');
    const [ageHelp, setAgeHelp] = useState('');

    const setMenuIndex = (i: number) => () => {
        setIndex(i);
        if ('alt' in window) {
            alt.emit('Webview:Character:Creator:Change:Cam', i);
        }
    };

    const changeCam = (i: number) => () => {
        if ('alt' in window) {
            alt.emit('Webview:Character:Creator:Change:Cam', i);
        }
    };
    const saveCharacter = () => {
        if (firstNameHelp.length > 0 || lastNameHelp.length > 0 || ageHelp.length > 0) return;
        if (firstName.length < 1) {
            setFirstNameHelp(translate('charCreator', 'error_required'));
            return;
        }
        if (lastName.length < 1) {
            setLastNameHelp(translate('charCreator', 'error_required'));
            return;
        }
        if (parseInt(age) < 1) {
            setAgeHelp(translate('charCreator', 'error_required'));
            return;
        }

        if ('alt' in window) alt.emit('Webview:Character:Creator:Exit', 'save', firstName, lastName, age);
    };

    const exitEditor = () => {
        if ('alt' in window) alt.emit('Webview:Character:Creator:Exit');
    };

    const dialogHandler = (open: boolean) => () => {
        setDialogOpen(open);
        setFirstName('');
        setFirstNameHelp('');
        setLastName('');
        setLastNameHelp('');
        setAge('');
        setAgeHelp('');
        if ('alt' in window) {
            alt.emit('Webview:Character:Creator:Allow:Rotation', !open);
        }
    };

    const firstnameChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const regEx = /^[a-zA-Z\u00c0-\u017e]{2,16}$/;
        setFirstName(target.value);
        setFirstNameHelp('');
        if (!regEx.test(target.value)) {
            setFirstNameHelp(translate('charCreator', 'error_name'));
        }
    };

    const lastNameChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        const regEx = /^[a-zA-Z\u00c0-\u017e]{2,16}$/;
        setLastName(target.value);
        setLastNameHelp('');
        if (!regEx.test(target.value)) {
            setLastNameHelp(translate('charCreator', 'error_name'));
        }
    };

    const ageChange = (e: React.SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setAge(target.value);
        setAgeHelp('');
        if (isNaN(parseInt(target.value))) {
            setAgeHelp(translate('charCreator', 'error_age_number'));
            return;
        }
        if (parseInt(target.value) < 18 || parseInt(target.value) > 99) {
            setAgeHelp(translate('charCreator', 'error_age'));
            return;
        }
    };

    return (
        <Container className="absolute top-1/2 -translate-y-1/2 left-12 w-[350px] ">
            <div className="font-marker text-[23px] font-bold text-center">{translate('charCreator', 'title')}</div>
            <Divider />
            <div className="flex">
                <img className="w-[30px] object-contain" src={genderIMG}></img>

                <div className="flex ml-5 w-full h-10">
                    <div
                        className={`rounded-l-md flex justify-center items-center cursor-pointer text w-1/2 p-3 border ${
                            sex === 0
                                ? 'bg-accent border-transparent hover:bg-accenthover'
                                : 'bg-background hover:bg-backgroundhover'
                        }`}
                        onClick={() => setSex(0)}
                    >
                        {translate('charCreator', 'male')}
                    </div>
                    <div
                        className={`rounded-r-md cursor-pointer flex justify-center items-center text w-1/2 p-3 border ${
                            sex === 1
                                ? 'bg-accent border-transparent hover:bg-accenthover'
                                : 'bg-background hover:bg-backgroundhover'
                        }`}
                        onClick={() => setSex(1)}
                    >
                        {translate('charCreator', 'female')}
                    </div>
                </div>
            </div>
            <Divider />
            <div className="flex">
                {menuItems.slice(0, 5).map((item, i) => (
                    <Container
                        className={`flex p-0 items-center flex-col cursor-pointer m-[3px] w-[60px] ${
                            index === i && 'bg-accent'
                        }`}
                        key={i}
                        onClick={setMenuIndex(i)}
                    >
                        <img
                            className="w-[40px] h-[50px] object-contain"
                            src={new URL(`../images/${item}.png`, import.meta.url).href}
                        />
                        <div className="text-[10px] mt-4 mb-1">{translate('charCreator', item)}</div>
                    </Container>
                ))}
            </div>
            <div className="flex">
                {menuItems.slice(5).map((item, i) => (
                    <Container
                        className={`flex p-0 items-center flex-col cursor-pointer m-[3px] w-[60px] ${
                            index === i + 5 && 'bg-accent'
                        }`}
                        key={i}
                        onClick={setMenuIndex(i + 5)}
                    >
                        <img
                            className="w-[40px] h-[50px] object-contain"
                            src={new URL(`../images/${item}.png`, import.meta.url).href}
                        />
                        <div className="text-[10px] mt-4 mb-1">{translate('charCreator', item)}</div>
                    </Container>
                ))}
            </div>
            <Divider />
            <ButtonGroup
                onFirst={exitEditor}
                firstText={translate('charCreator', 'back')}
                firstIcon={<ArrowLeft className="-translate-x-5" />}
                onSecond={dialogHandler(true)}
                secondText={translate('charCreator', 'save')}
                secondIcon={<Check className="translate-x-5" />}
            />

            <Container className="absolute flex right-0 -bottom-16 text-sm px-1 py-2 items-center">
                <div className="rounded-[5px] border p-1 mx-1">A</div>
                <div className="mr-3">{translate('charCreator', 'turn_left')}</div>
                <div className="rounded-[5px] border p-1 mx-1">D</div>
                <div className="mr-3">{translate('charCreator', 'turn_right')}</div>
            </Container>

            <div className="absolute right-[-60px] top-[10px] space-y-3">
                <Container className="w-10 h-10 flex justify-center items-center rounded-full mx-3 cursor-pointer p-1 hover:bg-backgroundhover">
                    <Camera />
                </Container>
                <Container
                    className="w-10 h-10 flex justify-center items-center rounded-full mx-3 cursor-pointer p-1 hover:bg-backgroundhover"
                    onClick={changeCam(10)}
                >
                    <img className="img_white" src={new URL('../images/icons/body.png', import.meta.url).href} />
                </Container>
                <Container
                    className="w-10 h-10 flex justify-center items-center rounded-full mx-3 cursor-pointer p-1 hover:bg-backgroundhover"
                    onClick={changeCam(1)}
                >
                    <img className="img_white" src={new URL('../images/icons/head.png', import.meta.url).href} />
                </Container>
                <Container
                    className="w-10 h-10 flex justify-center items-center rounded-full mx-3 cursor-pointer p-1 hover:bg-backgroundhover"
                    onClick={changeCam(3)}
                >
                    <img className="img_white" src={new URL('../images/icons/face.png', import.meta.url).href} />
                </Container>
                <Container
                    className="w-10 h-10 flex justify-center items-center rounded-full mx-3 cursor-pointer p-1 hover:bg-backgroundhover"
                    onClick={changeCam(7)}
                >
                    <img className="img_white" src={new URL('../images/icons/torso.png', import.meta.url).href} />
                </Container>
                <Container
                    className="w-10 h-10 flex justify-center items-center rounded-full mx-3 cursor-pointer p-1 hover:bg-backgroundhover"
                    onClick={changeCam(8)}
                >
                    <img className="img_white" src={new URL('../images/icons/legs.png', import.meta.url).href} />
                </Container>
            </div>
            <Dialog
                isOpen={dialogOpen}
                title={translate('charCreator', 'title')}
                onClose={dialogHandler(false)}
                onEnter={saveCharacter}
            >
                <TextField
                    label={translate('charCreator', 'firstname')}
                    type="text"
                    value={firstName}
                    onChange={firstnameChange}
                    error={firstNameHelp.length > 0}
                    helperText={firstNameHelp}
                    autoFocus={true}
                />
                <TextField
                    label={translate('charCreator', 'lastname')}
                    type="text"
                    value={lastName}
                    onChange={lastNameChange}
                    error={lastNameHelp.length > 0}
                    helperText={lastNameHelp}
                />
                <TextField
                    label={translate('charCreator', 'age')}
                    type="text"
                    value={age}
                    onChange={ageChange}
                    error={ageHelp.length > 0}
                    helperText={ageHelp}
                />

                <ButtonGroup
                    onFirst={dialogHandler(false)}
                    firstText={translate('charCreator', 'cancel')}
                    firstIcon={<ArrowLeft className="-translate-x-5" />}
                    onSecond={saveCharacter}
                    secondText={translate('charCreator', 'save')}
                    secondIcon={<Check className="translate-x-5" />}
                />
            </Dialog>
        </Container>
    );
};
