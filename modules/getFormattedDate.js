export function getFormattedDate() {
    const now = new Date();
    const pad = num => String(num).padStart(2, '0');
    const day = pad(now.getDate());
    const month = pad(now.getMonth() + 1);
    const year = now.getFullYear().toString().slice(-2);
    const hours = pad(now.getHours());
    const minutes = pad(now.getMinutes());
    return `${day}.${month}.${year} ${hours}:${minutes}`;
}