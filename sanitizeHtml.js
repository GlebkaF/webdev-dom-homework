// Модуль sanitizeHtml.js
const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export { sanitizeHtml }
