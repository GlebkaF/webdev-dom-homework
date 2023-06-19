import { format } from "date-fns";

export const now = (date) => {
    let formateDate = format(new Date(date), "yyyy-MM-dd hh.mm.ss");
    return formateDate;
};

// export const formatDate = (commentDate) => { 
//     let month = (commentDate.getMonth() + 1).toString().padStart(2, '0'); 
//     let day = commentDate.getDate().toString().padStart(2, '0'); 
//     let year = commentDate.getFullYear().toString().substr(-2); 
//     let hours = commentDate.getHours().toString().padStart(2, '0'); 
//     let minutes = commentDate.getMinutes().toString().padStart(2, '0'); 
//     let seconds = commentDate.getSeconds().toString().padStart(2, '0'); 
//     const resultDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
//     return resultDate;
//   }