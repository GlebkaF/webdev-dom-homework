export function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear() - 2000);
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
};