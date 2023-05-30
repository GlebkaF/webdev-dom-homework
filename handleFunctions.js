const delay = (interval = 300) => {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve();
        }, interval);
    });
}
const replaceValue = value => {
    return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
const addZeroBefore = num => String(num).length < 2 ? '0' + num : num;
const editYear = year => String(year)[2] + String(year)[3];
const correctDate = date => {
    let year = editYear((new Date(date)).getFullYear());
    let month = addZeroBefore((new Date(date)).getMonth() + 1);
    let day = addZeroBefore((new Date(date)).getDate());
    let hours = addZeroBefore((new Date(date)).getHours());
    let minutes = addZeroBefore((new Date(date)).getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export { delay, replaceValue, correctDate };