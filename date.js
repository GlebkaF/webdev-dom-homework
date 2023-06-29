export const getCurrentDate = (date) => {
  return date.getDate().toString().padStart(2, '0') + '.' +
    (date.getMonth() + 1).toString().padStart(2, '0') + '.' +
    date.getFullYear().toString().slice(-2) + " " +
    date.toLocaleTimeString().slice(0, -3);

}