export function formattedDate(commentDate) {
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }; 
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(commentDate));
};
