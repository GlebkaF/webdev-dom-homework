// Принимает строку и возвращает дату в нужном формате
export function dateString (string) {
    let date = new Date(string);
    let dateDay = (date) => {
      if (date.getDate().toString().length === 1) {
        return "0" + date.getDate();
      } else {
        return date.getDate();
      }
    };
    let dateMonth = (date) => {
      if (date.getMonth().toString() < 9) {
        return '0' + (date.getMonth()+1)
      } else {
        return date.getMonth()+1;
      }
    };
    let dateHour = (date) => {
      if (date.getHours().toString().length === 1) {
        return `0${date.getHours()}`
      } else {
        return date.getHours();
      }
    };
    let dateMinute = (date) => {
      if (date.getMinutes().toString().length === 1) {
        return `0${date.getMinutes()}`
      } else {
        return date.getMinutes();
      }
    };

    return `${dateDay(date)}.${dateMonth(date)}.${date.getFullYear() - 2000} ${dateHour(date)}:${dateMinute(date)}`
};