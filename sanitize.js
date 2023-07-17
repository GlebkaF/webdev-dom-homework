// Функция очистки вводимых данных от спец символов
export const sanitizeHtml = (htmlString) => {
    return htmlString
        .replaceAll("<", "&lt")
        .replaceAll(">", "&gt")
        .replaceAll("&", "&amp")
        .replaceAll('"', "&quot")
};