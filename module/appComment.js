
import { token } from "./loginCompontnt.js";
import {renderComments, formDataComment, renderApp} from "./render.js"

const convertServer = (response, commentArr) => {
    return response.json().then((responseData) => {
        commentArr = responseData.comments;
        commentArr = commentArr.map((comment) => {
        return {
          name: comment.author.name,
          date: formDataComment(comment.date),
          textComment: comment.text,
          likes: comment.likes,
          isActiveLike: false,
        }
      });
      if(!token){
        renderComments(commentArr); 
      } else renderApp(commentArr);
           
    })
  }
export {convertServer}