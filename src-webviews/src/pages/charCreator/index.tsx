import { useRef, useState, useEffect } from 'react';
import { Mainmenu } from './components/Menu';
import { Accesories } from './components/screens/Accesories';
import { Appearance } from './components/screens/Appearance';
import { Eyes } from './components/screens/Eyes';
import { Features } from './components/screens/Features';
import { Hair } from './components/screens/Hair';
import { Hat } from './components/screens/Hat';
import { Legs } from './components/screens/Legs';
import { Parents } from './components/screens/Parents';
import { Shoes } from './components/screens/Shoes';
import { Top } from './components/screens/Top';
import { appearanceState, clothesState, eyesState, featuresState, hairState, parentState } from './data/state';

import './style.css';
import Container from '../../components/Container';

const CharCreator = () => {
    const [menuIndex, setMenuIndex] = useState(0);
    const [sex, setSex] = useState(0);
    const [parentData, setParentData] = useState(parentState);
    const [hairData, setHairData] = useState(hairState);
    const [eyesData, setEyesData] = useState(eyesState);
    const [featuresData, setFeaturesData] = useState(featuresState);
    const [appearanceData, setAppearanceData] = useState(appearanceState);
    const [clothesData, setClothesData] = useState(clothesState);

    const emitClothes = useRef(true);

    useEffect(() => {
        if ('alt' in window)
            alt.emit('Webview:Character:Creator:Update:Data', 'parentData', sex, JSON.stringify(parentData));
    }, [parentData]);

    useEffect(() => {
        if ('alt' in window)
            alt.emit('Webview:Character:Creator:Update:Data', 'hairData', sex, JSON.stringify(hairData));
    }, [hairData]);

    useEffect(() => {
        if ('alt' in window)
            alt.emit('Webview:Character:Creator:Update:Data', 'eyesData', sex, JSON.stringify(eyesData));
    }, [eyesData]);

    useEffect(() => {
        if ('alt' in window)
            alt.emit('Webview:Character:Creator:Update:Data', 'featuresData', sex, JSON.stringify(featuresData));
    }, [featuresData]);

    useEffect(() => {
        if ('alt' in window)
            alt.emit('Webview:Character:Creator:Update:Data', 'appearanceData', sex, JSON.stringify(appearanceData));
    }, [appearanceData]);

    useEffect(() => {
        if ('alt' in window) {
            if (emitClothes.current)
                alt.emit('Webview:Character:Creator:Update:Data', 'clothesData', sex, JSON.stringify(clothesData));
            else emitClothes.current = true;
        }
    }, [clothesData]);

    //Events
    useEffect(() => {
        if ('alt' in window) {
            alt.on('Webview:Character:Creator:Update:Colors', updateColors);
        }
        return () => {
            if ('alt' in window) {
                alt.off('Webview:Character:Creator:Update:Colors', updateColors);
            }
        };
    }, []);

    const setSexState = (state: number) => {
        if (sex === state) return;
        setMenuIndex(0);
        setSex(state);
        setParentData({ ...parentState });
        setHairData({ ...hairState });
        setEyesData({ ...eyesState });
        setFeaturesData({ ...featuresState });
        setAppearanceData({ ...appearanceState });
        setClothesData({ ...clothesState });
    };

    const updateColors = (response: string) => {
        emitClothes.current = false;
        setClothesData(JSON.parse(response));
    };

    return (
        <div className="select-none">
            <Mainmenu index={menuIndex} setIndex={setMenuIndex} sex={sex} setSex={setSexState} />
            <Container className="absolute top-1/2 -translate-y-1/2 right-12 w-[350px]">
                {menuIndex === 0 ? <Parents data={parentData} setData={setParentData} sex={sex} /> : ''}
                {menuIndex === 1 ? <Hair data={hairData} setData={setHairData} sex={sex} /> : ''}
                {menuIndex === 2 ? <Eyes data={eyesData} setData={setEyesData} /> : ''}
                {menuIndex === 3 ? <Features data={featuresData} setData={setFeaturesData} /> : ''}
                {menuIndex === 4 ? <Appearance data={appearanceData} setData={setAppearanceData} /> : ''}
                {menuIndex === 5 ? <Hat data={clothesData} setData={setClothesData} sex={sex} /> : ''}
                {menuIndex === 6 ? <Accesories data={clothesData} setData={setClothesData} sex={sex} /> : ''}
                {menuIndex === 7 ? <Top data={clothesData} setData={setClothesData} sex={sex} /> : ''}
                {menuIndex === 8 ? <Legs data={clothesData} setData={setClothesData} sex={sex} /> : ''}
                {menuIndex === 9 ? <Shoes data={clothesData} setData={setClothesData} sex={sex} /> : ''}
            </Container>
        </div>
    );
};

export default CharCreator;
