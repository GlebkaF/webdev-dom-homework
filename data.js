export const now = (commentDate) => {
    let date = new Date();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
    let year = date.getFullYear().toString().substr(-2);
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    const resultDate = `${day}.${month}.${year} ${hours}:${minutes}`;
    return resultDate;
}