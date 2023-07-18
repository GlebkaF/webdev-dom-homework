const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "<").replaceAll(">", "	&gt;");
};

export {sanitizeHtml};