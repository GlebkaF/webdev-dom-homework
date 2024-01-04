function zero (number) {
    return number.toString().split(' ').map(el => el<10 ? '0'+el : el).join("")
}

export function formatDate(date) {
  return zero(date.getDate()) + "." 
  + zero(date.getMonth()+1) + "." 
  + date.getFullYear().toString().slice(2) + " " 
  + zero(date.getHours()) + ":" 
  + zero(date.getMinutes())
}