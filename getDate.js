export function getCurrentDate(date) {
    let year = date.getFullYear().toString().slice(-2) // Получаем последние две цифры года
    let month =
        date.getMonth() + 1 < 10
            ? '0' + (date.getMonth() + 1)
            : date.getMonth() + 1 // Получаем месяц с ведущим нулем, если нужно
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() // Получаем день с ведущим нулем, если нужно
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() // Получаем часы с ведущим нулем, если нужно
    let minutes =
        date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() // Получаем минуты с ведущим нулем, если нужно

    let formattedDate = day + '.' + month + '.' + year // Склеиваем день, месяц и год в нужном формате
    let formattedTime = hours + ':' + minutes // Склеиваем часы и минуты в нужном формате

    let currentDate = formattedDate + ' ' + formattedTime
    return currentDate

    //console.log(formattedDate + ' в ' + formattedTime); // Выводим отформатированную дату и время
}
