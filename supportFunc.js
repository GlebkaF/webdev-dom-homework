// Функция по задержке лайка на комментарий
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

// Замена символов
const replaceValue = (value) => {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

// Формат вывода даты в комментарии
const fixNumbers = number => String(number).length < 2 ? '0' + number : number;

const correctDate = date => {
    let year = (new Date(date)).getFullYear();
    let month = fixNumbers((new Date(date)).getMonth() + 1);
    let day = fixNumbers((new Date(date)).getDate());
    let hours = fixNumbers((new Date(date)).getHours());
    let minutes = fixNumbers((new Date(date)).getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}


export { delay, replaceValue, correctDate };

