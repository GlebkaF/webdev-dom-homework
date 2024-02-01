export const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
};