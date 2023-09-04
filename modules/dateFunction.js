export function getDateInventor(dateFormat) {
  let date = new Date(dateFormat);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear() % 1000;
  let hour = date.getHours();
  let minute = date.getMinutes();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = "0" + month;
  }
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }
  return `${day}.${month}.${year} ${hour}:${minute}`;
};