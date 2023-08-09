export const date = function (date) {
    const months = ["01", "02", "03", "04", "05", "06",
      "07", "08", "09", "10", "11", "12"];
    let commentDate = new Date(date);
    let currentDate = commentDate.getDate() + "." + months[commentDate.getMonth()] + "." + commentDate.getFullYear();
    let hour = commentDate.getHours();
    let minute = commentDate.getMinutes();
  
    if (minute < 10) {
      minute = "0" + minute;
    }
    let currentTime = hour + ":" + minute;
  
    let fullDate = `${currentDate} ${currentTime}`;
    return fullDate
  }