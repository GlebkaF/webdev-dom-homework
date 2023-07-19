import { getComments } from "./api.js";
import { renderListElement } from "./renderListElement.js";

export const fetchGet = ({ listElement, listElementData, commentTextareaElement, nameInputElement, loaderListElement }) => {
    getComments().then((responseData) => {
      console.log(responseData)
      
      const appComments = responseData.comments.map((comment) => {
        let currentDate = new Date(comment.date);
        let myDate = currentDate.toLocaleDateString('ru-RU', { day: 'numeric', month: 'numeric', year: '2-digit' }) + ' ' + currentDate.toLocaleTimeString('ru-RU', { hour: 'numeric', minute: 'numeric' });
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
      renderListElement({ listElement, listElementData, commentTextareaElement, nameInputElement });
      loaderListElement.style.display = 'none';
    })
    .catch((error) => {
      if (error === 'Сервер сломался, попробуй позже') {
        alert('Сервер сломался, попробуй позже')
      }
      else {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      console.warn(error);
      formElement.style.display = 'flex';
      loaderCommentElement.style.display = 'none';
    });;
  } 