import { comments, nameElement, textElement, formComment, messageComment } from "./variables.js";
import { protectionHtml, sentComment } from "./optioncomments.js";
import { convertServer } from "./convertserver.js";

export function fetchComments(){
   return fetch("https://wedev-api.sky.pro/api/v1/Andrey-Nosov/comments", {
      method: "GET",
    }).then((response) => {
      convertServer(response, comments);
    })
  };

export function sentDataServer(){
   return fetch("https://wedev-api.sky.pro/api/v1/Andrey-Nosov/comments", {
        method: "POST",
        body: JSON.stringify({
          name: protectionHtml(nameElement.value),
          text: protectionHtml(textElement.value),
          forceError: true,
        })
      }).then((response) => {
        if (response.status === 201) {
          nameElement.classList.remove('error');
          textElement.classList.remove('error');
          return response.json();
        } else if (response.status === 400) {
          throw new Error ('плохой запрос')
        } else {
          throw new Error ('сервер упал')
        }
      })
      .then(() => {
        formComment.classList.remove('dpnone');
        messageComment.classList.add('dpnone');
        nameElement.value = '';
        textElement.value = '';
        fetchComments()
      }).catch((error) => {
        formComment.classList.remove('dpnone');
        messageComment.classList.add('dpnone');
        if (error.message === 'плохой запрос') {
          alert('Вы ввели слишком короткое имя или комментарий')
          return
        }
        if (error.message === 'сервер упал');
        sentComment();
      })
}