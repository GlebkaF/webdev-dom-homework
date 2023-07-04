   //import { formatDateToRu, formatDateToUs } from "./lib/formarDate/formatDate.js";
 
 //const formatDate = (date) => {
//  return `${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}/${date.getFullYear()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}` }
 // const country = "ru";


 const getCommentsList = (comment, index) => {
  const createDate = format(new Date(comment.date), "yyyy-mm-dd hh.mm.ss");
    return   `
    
    
    <li class = 'comment' class = 'whiteSpace'   data-index ="${index}"> 
    <div class = 'comment-header'>
        <div>${comment.name}</div> 
        <div>${createDate}</div>
       </div>  
       
           <div class = 'comment-body'>
         <div class = "comment-text">
         ${comment.textElement}
         </div>
         </div>
       
       
         <div class = "comment-footer" >
           <div class = 'likes'>      
               <span class="likes-counter">${comment.likesNumber}</span>
           <button data-index = '${index}' class=" like-button ${comment.propertyColorLike}"></button>
                   </div> 
       </div>

    </li>
           `;
 };

 
export {getCommentsList};  
