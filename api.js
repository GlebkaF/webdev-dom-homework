import { newName, newComment } from "./comments.js";
import { renderComments, renderLoaderComments, renderForm } from "./renderComments.js";
import { cleareInputs} from "./utilis.js";



let allComments = []

function getComments () {
    renderLoaderComments()
    return fetch("https://webdev-hw-api.vercel.app/api/v1/anna-makhortova/comments", {
        method: "GET",
      }).then((response) => {
        if (response.status === 200) {
          return response.json()
        } if (response.status === 500) {
          return Promise.reject(new Error("произошел сбой сервера"))
        } else {
          return Promise.reject(new Error("неизвестная ошибка"))
        }
      }).then((responseData) => {
        allComments = responseData.comments.map((comment) => {
       return {
            name: comment.author.name,
            date: new Date(comment.date),
            text: comment.text,
            likes: comment.likes,
            isLiked: comment.isLiked,
          }
        })
        let loadedComment = false
        renderForm(loadedComment)
        renderComments();
      }).catch((error) => {
        console.log(error)
        alert(error)
        let loadedComment = false
        renderForm(loadedComment)
        });
      }

      getComments()
    
    function postComments () {
      return fetch("https://webdev-hw-api.vercel.app/api/v1/anna-makhortova/comments", {
    method: "POST",
    body: JSON.stringify({
      forceError: true,
    "text": newComment.value.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replace("|", "<div class='quote'>")
          .replace("|", "</div>"),
    "name": newName.value.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
    })}).then((response) => {
      if (response.status === 201) {
        return response.json()
      } if (response.status === 400 || newComment.value.length < 3 && newName.value.length < 3) {
        return Promise.reject(new Error("Имя или комментарий слишком короткие"))
      } if (response.status === 500) {
        return Promise.reject(new Error("произошел сбой сервера"))
      } else {
        console.log(response.status)
        return Promise.reject(new Error("неизвестная ошибка"))
      }
    }).then((responseData) => {
      getComments()
      cleareInputs()
        renderComments();
    }).catch((error) => {
      alert(error.message)
      let loadedComment = false
      renderForm(loadedComment)
      if (error.message === "произошел сбой сервера") {
        postComments()
      } if (error.message === 'Failed to fetch') {
        alert('Похоже интернет не работает, попробуйте позже')
      } else {
        alert(error.message)
      }
    });
    }
    
    
    export {allComments, postComments}
    