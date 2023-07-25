// Функция текущая дата
export function currentDate(date) {
  let dateZero = date.getDate(),
    monthsZero = date.getMonth(),
    hour = date.getHours(),
    minute = date.getMinutes();
  if (hour < 10) {
    hour += "0";
  }
  if (minute < 10) {
    minute += "0";
  }
  if (monthsZero < 10) {
    monthsZero = "0" + (monthsZero + 1);
  }
  if (dateZero < 10) {
    dateZero += "0";
  }
  return `${dateZero}.${monthsZero}.${date
    .getFullYear()
    .toString()
    .substr(-2)} ${hour}:${minute}`;
}
