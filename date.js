export function getDate(date) {
    let myDate = new Date(date)


    let hours = myDate.getHours()
    let minutes = myDate.getMinutes()

    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    let day = myDate.getDate()
    let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    let year = Number(String(myDate.getFullYear()).substring(2))
    let userDate = day + "." + month[myDate.getMonth()] + "." + year + ' ' + hours + ":" + minutes
    return userDate
}