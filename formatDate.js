// Функция преобразования даты, получаемой из API
export const dataFormat = (date) => {
    let comHours = (new Date(date)).getHours();
    let comMinuts = (new Date(date)).getMinutes();

    if (comHours < 10) { // если минут будет меньше 10,
        comHours = "0" + comHours; // то перед ними поставим 0
    }

    if (comMinuts < 10) { // если минут будет меньше 10,
        comMinuts = "0" + comMinuts; // то перед ними поставим 0
    }
    const outputDate = `${(new Date(date)).toLocaleDateString()}  ${comHours}:${comMinuts}`;


    // let outputDate = `${(new Date(date)).toDateString()}`
    return (outputDate);
};