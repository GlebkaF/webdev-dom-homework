
const months = ["01", '02', '03', "04", '05','06','07','08','09','10', '11', '12', '13', '14', '15', '16','17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30','31'] 

let NowDate= new Date()
function todayDate(NowDate) {
   MyDate=  NowDate.getDate() + ':' + months [NowDate.getMonth()] + ':' + NowDate.getFullYear() 
   MyTime= NowDate.toTimeString()

   return MyDate + ' ' + MyTime

   console.log(MyDate, MyTime);
}
console.log(todayDate(NowDate ) );
