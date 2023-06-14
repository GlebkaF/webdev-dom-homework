import { listenersOfForm} from "./listeners.js";
import { renderComments, renderLoaderComments, renderForm, renderInputs, canLogined } from "./renderComments.js";
import { cleareInputs} from "./utilis.js";



let allComments = []
let userData = []

function getComments (userData) {
    renderLoaderComments()
    return fetch("https://wedev-api.sky.pro/api/v2/anna-makhortova/comments", {
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
        renderInputs()
      }).catch((error) => {
        console.log(error)
        alert(error)
        let loadedComment = false
        renderForm(loadedComment)
        });
      }

      getComments(newComment)
    
    function postComments () {
      return fetch("https://wedev-api.sky.pro/api/v2/anna-makhortova/comments", {
    method: "POST",
    headers: {
      Authorization: 'Bearer ' + userData.user.token
    },
    body: JSON.stringify({
      forceError: true,
    "text": newComment.value.replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;")
          .replace("|", "<div class='quote'>")
          .replace("|", "</div>"),
    "name": userData.user.name,
    })}).then((response) => {
      if (response.status === 201) {
        return response.json()
      } if (response.status === 400) {
        return Promise.reject(new Error("Имя или комментарий слишком короткие"))
      } if (response.status === 500) {
        return Promise.reject(new Error("произошел сбой сервера"))
      } else {
        console.log(response.status)
        return Promise.reject(new Error("неизвестная ошибка"))
      }
    }).then((responseData) => {
      getComments()
      cleareInputs(newCommen)
        renderComments();
        renderInputs()
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
    
    export function loginUser (regLogin, regName, regPassword) {
      return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
          forceError: false,
          "login": regLogin.value,
      "name": regName.value,
      "password": regPassword.value
        })}).then((response) => {
          if (response.status === 201) {
            return response.json()
          } if (response.status === 400 ) {
            return Promise.reject(new Error("Пользователь с таким логином существует"))
          } if (response.status === 500) {
            return Promise.reject(new Error("произошел сбой сервера"))
          } else {
            console.log(response.status)
            return Promise.reject(new Error("неизвестная ошибка"))
          }
        }).then((responseData) => {
          getComments()
          userData = responseData
          canLogined(userData.user.token)
          listenersOfForm()
          return userData
    
        }).catch((error) => {
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
    
    export function autorisationUser (logLogin, logPassword) {
      return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
          forceError: false,
          "login": logLogin.value,
      "password": logPassword.value
        })}).then((response) => {
          if (response.status === 201) {
            return response.json()
          } if (response.status === 400 ) {
            return Promise.reject(new Error("неверный логин и/или пароль"))
          } if (response.status === 500) {
            return Promise.reject(new Error("произошел сбой сервера"))
          } else {
            console.log(response.status)
            return Promise.reject(new Error("неизвестная ошибка"))
          }
        }).then((responseData) => {
          getComments()
          userData = responseData
          canLogined(userData.user.token)
          listenersOfForm()
          return userData
        }).catch((error) => {
          let loadedComment = false
          renderForm(loadedComment)
          if (error.message === "произошел сбой сервера") {
            postComments()
          } if (error.message === 'Failed to fetch') {
            alert('Похоже интернет не работает, попробуйте позже')
          } else {
            console.log(error.message)
          }
        });
    }
    
    export {allComments, postComments, userData}
    