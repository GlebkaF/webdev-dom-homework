
import {renderComments, formDataComment} from "./render.js"

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
      renderComments(commentArr);      //после того как преобразовали данные, рендерим их на страницу в виде комментария
    })
  }
export {convertServer}