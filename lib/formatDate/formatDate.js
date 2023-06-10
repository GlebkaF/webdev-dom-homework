export const formatDateToSw = (date) => {
    return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + date.getMonth() : date.getMonth()}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}.${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}.${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`;
    
}