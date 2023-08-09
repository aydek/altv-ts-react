import { useEffect, useState } from 'react';
import { LANG } from '../../../../src/core/shared/locales/language';
import { FuelIcon, LightsIcon, SeatBeltIcon } from '../../components/SVG';
import { twMerge } from 'tailwind-merge';
import LinearProgress from '../../components/LinearProgress';
import { SpeedometerEvents } from '../../../../src/core/shared/enums/events/webviewEvents';

const rpmLines = 35;

const Speedometer = () => {
    const [show, setShow] = useState(!('alt' in window));
    const [speed, setSpeed] = useState(22);
    const [rpm, setRpm] = useState(0);
    const [fuel, setFuel] = useState(100);
    const [gear, setGear] = useState('1');
    const [tankSize, setTankSize] = useState(100);
    const [lights, setLight] = useState(false);
    const [belt, setBelt] = useState(false);

    useEffect(() => {
        if ('alt' in window) {
            alt.on(SpeedometerEvents.show, showSpeedo);
            alt.on(SpeedometerEvents.hide, hideSpeedo);
            alt.on(SpeedometerEvents.update, updateSpeedo);
        }
        return () => {
            if ('alt' in window) {
                alt.off(SpeedometerEvents.show, showSpeedo);
                alt.off(SpeedometerEvents.hide, hideSpeedo);
                alt.off(SpeedometerEvents.update, updateSpeedo);
            }
        };
    }, []);

    const showSpeedo = () => {
        setShow(true);
    };

    const hideSpeedo = () => {
        setShow(false);
    };

    const updateSpeedo = (dataString: string) => {
        const data = JSON.parse(dataString);
        setSpeed(data.speed);
        setRpm(data.rpm);
        setGear(data.gear);
        setFuel(data.fuel);
        setTankSize(data.tankSize);
        setLight(data.lights);
        setBelt(data.belt);
    };

    const calculateRpm = () => {
        return rpm * rpmLines;
    };

    function formatNumberWithZeros(number: number) {
        const formattedNumber = String(number).padStart(3, '0');
        return [formattedNumber[0], formattedNumber[1], formattedNumber[2]];
    }

    return (
        <div
            className={twMerge(
                'fixed bottom-4 right-[1%] font-oswald h-[150px] w-[270px] transition-all',
                show ? 'opacity-100' : 'opacity-0'
            )}
        >
            <div className="w-full h-[80px] flex items-end justify-between">
                <div className="border-4 border-success text-success text-3xl rounded-full w-16 h-16 mr-0 flex items-center justify-center">
                    {gear}
                </div>
                <div className="flex text-8xl italic justify-center">
                    <div
                        className={speed > 99 ? 'text-whitesmoke' : 'text-background'}
                        style={{
                            textShadow:
                                speed > 99 &&
                                '#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px',
                        }}
                    >
                        {formatNumberWithZeros(speed)[0]}
                    </div>
                    <div
                        className={speed > 9 ? 'text-whitesmoke' : 'text-background'}
                        style={{
                            textShadow:
                                speed > 9 &&
                                '#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px',
                        }}
                    >
                        {formatNumberWithZeros(speed)[1]}
                    </div>
                    <div
                        className={speed > 0 ? 'text-whitesmoke' : 'text-background'}
                        style={{
                            textShadow:
                                speed > 0 &&
                                '#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px,#000 0px 0px 1px,   #000 0px 0px 1px,   #000 0px 0px 1px',
                        }}
                    >
                        {formatNumberWithZeros(speed)[2]}
                    </div>
                </div>
                <div className="font-bold ml-4 flex flex-col items-center">
                    <div className="text-lg text-background italic uppercase">{LANG === 'en' ? 'MPH' : 'KMH'}</div>
                    <SeatBeltIcon className={belt ? 'fill-darkgreen' : 'fill-background'} size={30} />
                    <LightsIcon className={lights ? 'fill-darkgreen' : 'fill-background'} size={30} />
                </div>
            </div>
            <div className="flex  font-bold italic space-x-[3px] mt-2">
                {[...Array(rpmLines)].map((item, index) => (
                    <div
                        key={index + 'key'}
                        className={twMerge(
                            'w-1 h-4 bg-whitesmoke rounded-sm rotate-12',
                            index + 1 > calculateRpm() && 'bg-background'
                        )}
                    ></div>
                ))}
                {[...Array(4)].map((item, index) => (
                    <div
                        key={index + 'key'}
                        className={twMerge('w-1 h-9 bg-darkred rounded-sm rotate-12', rpm >= 1 && 'bg-error')}
                    ></div>
                ))}
            </div>
            <div className="-translate-y-[18px] flex items-center pr-8">
                <FuelIcon className="fill-background" />
                <LinearProgress
                    max={tankSize}
                    value={fuel}
                    className={twMerge('bg-background  ml-1 h-3', fuel < 20 && 'bg-darkred')}
                    color={fuel > 20 ? 'bg-whitesmoke' : 'bg-error'}
                />
            </div>
        </div>
    );
};

export default Speedometer;