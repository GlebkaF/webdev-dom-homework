function addZero(z) {
    return (z < 10) ? '0' + z : z;
  }
  
  export function currentDate(d = new Date()) {
    let year = d.getFullYear().toString().substr(-2);
    let month = addZero(d.getMonth() + 1);
    let day = addZero(d.getDate());
    let hour = addZero(d.getHours());
    let minute = addZero(d.getMinutes());
    return `${day}.${month}.${year} ${hour}:${minute}`
  }