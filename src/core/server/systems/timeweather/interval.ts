import * as alt from 'alt-server';
import {
    changeWeather,
    getCurrentTime,
    getCurrentWeather,
    getNextWeather,
    getWeatherTimeLeft,
    setCurentTime,
} from './functions';
import { WorldEvents } from '@shared/enums/events/worldEvents';
import { MILLISECONDS_IN_MINUTE } from '@shared/config';
import { WeatherType } from '@shared/enums/altv';

alt.setInterval(() => {
    let currentTime = getCurrentTime();
    currentTime.minute++;
    if (currentTime.minute > 59) {
        currentTime.minute = 0;
        currentTime.hour++;
        if (currentTime.hour > 23) {
            currentTime.hour = 0;
        }
    }
    setCurentTime(currentTime.hour, currentTime.minute);
    const date = new Date();
    for (const player of alt.Player.all) {
        if (player.pendingLogin) {
            player.setWeather(WeatherType.ExtraSunny);

            player.setDateTime(15, 7, date.getFullYear(), 20, 0, 0);
        } else {
            player.setDateTime(
                15,
                7,
                date.getFullYear(),
                currentTime.hour as alt.DateTimeHour,
                currentTime.minute as alt.DateTimeMinute,
                0
            );
            alt.emitClient(player, WorldEvents.fetchClient, currentTime.hour, currentTime.minute);
        }
    }
    //Weather
    if (getWeatherTimeLeft() < Date.now() && !getCurrentWeather().locked) {
        changeWeather(getCurrentWeather().id, getNextWeather(getCurrentWeather().id));
    }
}, MILLISECONDS_IN_MINUTE);
