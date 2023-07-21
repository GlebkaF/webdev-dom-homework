import { formElement, loaderListElement, loaderCommentElement } from "../main.js";
import { getComments } from "./api.js";
import { renderListElement } from "./renderListElement.js";

export const fetchGet = ({ listElementData }) => {
    getComments().then((responseData) => {
      console.log(responseData)
      
      const appComments = responseData.comments.map((comment) => {
        let myDate = new Date(comment.date);
        return {
          name: comment.author.name,
          date: myDate,
          comment: comment.text,
          like: comment.isLiked,
          likeNumber: comment.likes,
          id: comment.id,
        }
      })

      listElementData = appComments;
      renderListElement({ listElementData });
      loaderListElement.style.display = 'none';
    })
    .catch((error) => {
      if (error === 'Сервер сломался, попробуй позже') {
        alert('Сервер сломался, попробуй позже');
      }
      else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      console.warn(error);
      formElement.style.display = 'flex';
      loaderCommentElement.style.display = 'none';
    });
  } 