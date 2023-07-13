export function fullTime(number) {
    if (String(number).length < 2) {
       return number = `0${number}`
    } else {
       return number = number
    }
}

export function rightDateFormat(func, getDate) {
    return `${new Date(getDate).toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric'})}.${String(new Date(getDate).getFullYear()).slice(2)} ${func(new Date(getDate).getHours())}:${func(new Date(getDate).getMinutes())}`
}