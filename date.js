export function timeFunction(date) {
let time = new Date(date);
let commentDate = time.getDate();
let commentMonth = time.getMonth() + 1;
let commentYear = () => {
  return ("" + time.getFullYear()).substr(2);
};
let commentHours = time.getHours();
let commentMinutes = time.getMinutes();
  
if (commentDate < 10) {
  commentDate = "0" + commentDate;
}
  
if (commentMonth < 10) {
  commentMonth = "0" + commentMonth;
}
  
if (commentMinutes < 10) {
  commentMinutes = "0" + commentMinutes;
}
  
let commentTime = `${commentDate}.${commentMonth}.${commentYear()} ${commentHours}:${commentMinutes}`;
return commentTime;
};