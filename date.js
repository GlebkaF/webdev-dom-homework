//функция для работы со временем
export const formatDate = (dateString) => {
    //Работа со временем
    const datePublish = new Date(dateString); //создание времени
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']; //Правильная расстановка месяцей
    let dayPublish = datePublish.getDate(); //Получение дня
    let monthPublish = months[datePublish.getMonth()]; //Получение месяца
    let yearPublish = datePublish.getFullYear().toString().slice(-2); //Получение года
    let hoursPublish = datePublish.getHours(); //Получение часов
    let minutesPublish = datePublish.getMinutes(); //Получение минус
    //Проверки на нули для красоты
    if (dayPublish < 10) {
        dayPublish = '0' + dayPublish;
    }
    if (hoursPublish < 10) {
        hoursPublish = '0' + hoursPublish;
    }
    if (minutesPublish < 10) {
        minutesPublish = '0' + minutesPublish;
    }
    //Передача всех параметров в одну переменную
    return `${dayPublish}.${monthPublish}.${yearPublish} ${hoursPublish}:${minutesPublish}`;
}