import * as alt from 'alt-server';
import { MILLISECONDS_IN_MINUTE } from '../../../shared/config';
import { WorldEvents } from '../../../shared/enums/events/worldEvents';
import { WeatherType } from './constants';
import { utility } from '../../utility/utility';

let currentTime: { hour: number; minute: number } = {
    hour: 12,
    minute: 0,
};

let currentWeather = {
    id: WeatherType.ExtraSunny,
    locked: false,
};

let weatherTimeLeft = Date.now() + MILLISECONDS_IN_MINUTE * 60;

export function lockWeather(state: boolean) {
    currentWeather.locked = state;
}

export function getCurrentTime() {
    return currentTime;
}

export function getCurrentWeather() {
    return currentWeather;
}

export function setCurentTime(hour: number, minute: number) {
    currentTime = { hour, minute };
}

export function getWeatherTimeLeft() {
    return weatherTimeLeft;
}

export function changeWeather(cWeather: number, nWeather: number, time: number = 10000): void {
    utility.log.system(`Weather changed ${cWeather} >>> ${nWeather}`);

    currentWeather.id = nWeather;
    weatherTimeLeft = Date.now() + getWeatherChangeTime(nWeather);
    for (const player of alt.Player.all) {
        if (!player.pendingLogin) alt.emitClient(player, WorldEvents.changeWeather, cWeather, nWeather, time);
    }
}

function getWeatherChangeTime(weather: number): number {
    if (weather === WeatherType.ExtraSunny) return MILLISECONDS_IN_MINUTE * 60 * 3;
    if (weather === WeatherType.Clear) return MILLISECONDS_IN_MINUTE * 60;
    if (weather === WeatherType.Clouds) return MILLISECONDS_IN_MINUTE * 20;
    if (weather === WeatherType.Smog) return MILLISECONDS_IN_MINUTE * 20;
    if (weather === WeatherType.Foggy) return MILLISECONDS_IN_MINUTE * 30;
    if (weather === WeatherType.Overcast) return MILLISECONDS_IN_MINUTE * 20;
    if (weather === WeatherType.Rain) return MILLISECONDS_IN_MINUTE * 30;
    if (weather === WeatherType.Thunder) return MILLISECONDS_IN_MINUTE * 30;
    if (weather === WeatherType.Clearing) return MILLISECONDS_IN_MINUTE * 20;
    if (weather === WeatherType.Neutral) return MILLISECONDS_IN_MINUTE * 60;
    return 0;
}

export function getNextWeather(current: number): number {
    if (current === WeatherType.ExtraSunny) {
        const available = [WeatherType.Clouds, WeatherType.Neutral, WeatherType.ExtraSunny];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Clear) {
        const available = [WeatherType.Neutral, WeatherType.ExtraSunny];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Clouds) {
        const available = [
            WeatherType.Rain,
            WeatherType.Thunder,
            WeatherType.Neutral,
            WeatherType.Clear,
            WeatherType.Overcast,
        ];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Smog) {
        const available = [WeatherType.Clear, WeatherType.ExtraSunny, WeatherType.Neutral];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Foggy) {
        const available = [WeatherType.Clear, WeatherType.ExtraSunny, WeatherType.Neutral];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Overcast) {
        const available = [WeatherType.Rain, WeatherType.Thunder];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Rain) {
        const available = [WeatherType.Clearing];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Thunder) {
        const available = [WeatherType.Clearing];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Clearing) {
        const available = [WeatherType.ExtraSunny, WeatherType.Clear, WeatherType.Neutral];
        return available[Math.floor(Math.random() * available.length)];
    }
    if (current === WeatherType.Neutral) {
        const available = [
            WeatherType.ExtraSunny,
            WeatherType.Clear,
            WeatherType.Overcast,
            WeatherType.Smog,
            WeatherType.Clouds,
        ];
        return available[Math.floor(Math.random() * available.length)];
    }
    return 0;
}
