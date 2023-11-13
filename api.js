import { sanitizeHtml } from "./sanitize.js";
import {addForm, comments, commentInputElement, nameInputElement} from './constants.js'
import { renderComments } from "./render.js";
import { answerComment } from "./answers.js";
import { getLike } from "./likes.js";
export const fetchPromisePost = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/daria-alekseeva/comments", {
    method: "POST",
    body: JSON.stringify({
      "text": sanitizeHtml(commentInputElement.value),
      "name": sanitizeHtml(nameInputElement.value)
      })
    })
    .then((responce) => {
      if (responce.status == 500) {
        throw new Error('Сервер сломался');
      } else if (responce.status == 400) {
        throw new Error('Вы ввели слишком мало символов в имя или текст');
      }
       else {
        fetchPromise();
        nameInputElement.value = '';
        commentInputElement.value = '';
      }
    })
    .catch((error) => {
      if (error.message == 'Сервер сломался') {
        console.log('Сервер сломался')
      } else if (error.message == 'Вы ввели слишком мало символов в имя или текст') {
        alert('Вы ввели слишком мало символов в имя или текст')
      } 
      else {
        console.log('ошибка')
      }
      renderComments()
    })
    .then(() => {
      answerComment()
      getLike()
    })
    .finally(() => {
      addForm.style.display = "flex"
    })
}

export const fetchPromise = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/daria-alekseeva/comments", {
    method: "GET"
    })
    .then((responce) => {
      if (responce.status == 500) {
        throw new Error('Сервер сломался');
      } else {
        return responce.json()
      }
    })
    .then((responceData) => {
      const comms = responceData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date).toLocaleString(),
            comment: comment.text,
            likes: comment.likes,
            isLiked: false,
          }
        })
        comments.splice(0, comments.length, ...comms);

        renderComments()
    })
    .then(() => {
      answerComment()
      getLike()
    })

    .catch((error) => {
      if (error.message == 'Сервер сломался') {
        console.log('Сервер сломался')
      } else {
        console.log(error.message)
      }
    })
    .finally(() => {
      addForm.style.display = "flex"
    })
}