export function getFormattedDate() {
    const currentDate = new Date();
    return `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes()}`;
  }