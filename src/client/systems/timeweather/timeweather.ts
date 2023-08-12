let currentServerTime = {
    hour: 0,
    minute: 0,
};

export function getServerTime() {
    return currentServerTime;
}

export function setTime(hour: number, minute: number) {
    currentServerTime = { hour, minute };
}
