export function fullDate() {

    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;// +1 т.к. нумерация месяцев начинается с нуля
    let year = newDate.getFullYear() - 2000;
    let hour = newDate.getHours(); // получаем час из нашей даты
    let minute = newDate.getMinutes(); // получаем минуты

    if (date < 10) {// если количество дней будет меньше 10,
        date = "0" + date;// то перед ними поставим 0
    }
    if (month < 10) {// если количество месяцев будет меньше 10,
        month = "0" + month;// то перед ними поставим 0
    }
    if (hour < 10) { // если количество часов будет меньше 10,
        hour = "0" + hour; // то перед ними поставим 0
    }
    if (minute < 10) { // если минут будет меньше 10,
        minute = "0" + minute; // то перед ними поставим 0
    }
    //Функция fullDate возвращает текущую дату и время: 
    return date + "." + month + "." + year + " " + hour + ":" + minute;
};