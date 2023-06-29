// Функция для даты
export function takeDate(currentDate) {
    let day = currentDate.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = +currentDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = currentDate.getFullYear();
    let arrYear = Array.from(String(year));
    year = arrYear[2] + arrYear[3];
    let hour = currentDate.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    let minute = currentDate.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    return `${day}.${month}.${year} ${hour}:${minute}`;
}