export function formatDate() {
    const commentDate = new Date();
    const year = commentDate.getFullYear() % 100;

    let month = commentDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }

    let day = commentDate.getDate();
    if (day < 10) {
        day = '0' + day;
    }

    let hours = commentDate.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }

    let minutes = commentDate.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    const currentDate = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    return currentDate;
}