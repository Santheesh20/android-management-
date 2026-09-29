function getCurrentDate() {
    return new Date();
}

function addMilliseconds(date, milliseconds) {
    return new Date(date.getTime() + milliseconds);
}

function addSeconds(date, seconds) {
    return addMilliseconds(date, seconds * 1000);
}

function addMinutes(date, minutes) {
    return addSeconds(date, minutes * 60);
}

function addHours(date, hours) {
    return addMinutes(date, hours * 60);
}

function addDays(date, days) {
    return addHours(date, days * 24);
}

module.exports = {
    getCurrentDate,
    addMilliseconds,
    addSeconds,
    addMinutes,
    addHours,
    addDays
};