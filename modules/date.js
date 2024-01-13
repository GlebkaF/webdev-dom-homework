export const formatDateTime = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // счет месяцев начинается с 0, а не с единицы. Для корректного вывода нужно к числу прибавить единичку.
    const year = String(date.getFullYear() - 2000);
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};
