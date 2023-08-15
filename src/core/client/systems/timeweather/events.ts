import * as alt from 'alt-client';
import * as native from 'natives';
import { WorldEvents } from '../../../shared/enums/events/worldEvents';
import { setTime } from './timeweather';

const weathers = [
    'EXTRASUNNY',
    'CLEAR',
    'CLOUDS',
    'SMOG',
    'FOGGY',
    'OVERCAST',
    'RAIN',
    'THUNDER',
    'CLEARING',
    'NEUTRAL',
    'SNOW',
    'BLIZZARD',
    'SNOWLIGHT',
    'XMAS',
    'HALLOWEEN',
];

alt.onServer(WorldEvents.fetchClient, fetchTime);

function fetchTime(hour: number, minute: number): void {
    setTime(hour, minute);
}

alt.onServer(WorldEvents.changeWeather, changeWeather);

function changeWeather(oldWeather: number, newWeather: number, time: number): void {
    let percent = 0;
    const interval = alt.setInterval(() => {
        percent++;
        native.setCurrWeatherState(
            native.getHashKey(weathers[oldWeather] as string),
            native.getHashKey(weathers[newWeather] as string),
            percent / 100
        );
        if (percent >= 100) alt.clearInterval(interval);
    }, time / 100);
    if (newWeather == 13) {
        native.useSnowWheelVfxWhenUnsheltered(true);
        native.useSnowFootVfxWhenUnsheltered(true);
    } else {
        native.useSnowWheelVfxWhenUnsheltered(false);
        native.useSnowFootVfxWhenUnsheltered(false);
    }
}
