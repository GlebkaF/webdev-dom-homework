export const stringHTML = (stringHTML) => {
    return stringHTML.replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('QUOTE_BEGIN', '').replaceAll('QUOTE_END', '');
    };