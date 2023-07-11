"use strict";

//date of comment
const getCommentDate = (date) => {
    let currentDate = new Date(date);
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = String(currentDate.getFullYear()).split('').slice(2).join('');
    let hour = currentDate.getHours();
    let minute = currentDate.getMinutes()
  
    if (day < 10) { 
      day = "0" + day; 
    }
    if (month < 10) { 
      month = "0" + month; 
    }
    if (hour < 10) { 
      hour = "0" + hour;
    };
    if (minute < 10) { 
      minute = "0" + minute; 
    }
    let commentDate = day + '.' + month + '.' + year + ' ' + hour + ':' + minute;
    return commentDate;
  }


  export default getCommentDate;

  