// Определяем функцию для очистки и защиты HTML-строк
export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};