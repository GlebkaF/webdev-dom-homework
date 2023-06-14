import { form, newName, newComment, addButton} from "./comments.js";
import {allComments, autorisationUser, loginUser, userData } from "./api.js";
import { AddLikeOrDelLike } from "./utilis.js";
import { addNewComment } from "./utilis.js";
import {  renderRegForm, autorizationForm} from "./renderComments.js";

let commentClickListener = () => {
  
  let boxOfCommentsTexts = document.querySelectorAll('.comment')

  for (let comment of boxOfCommentsTexts) {
    comment.addEventListener('click', () => {
      newComment.setAttribute('style', 'white-space: pre-line;');
      let replace = `${allComments[comment.dataset.id].text} \r\n \r\n ${allComments[comment.dataset.id].name}`
      newComment.value = `| ${replace} \r\n\|`
    })
  }
}

let initEventListeners = () => {

let likeButtons = document.querySelectorAll('.likes');

  for (let likeButton of likeButtons) {
    likeButton.addEventListener('click', (e) => {
      e.stopPropagation()
      AddLikeOrDelLike(e)
    })  

  } 
}

let comments = document.querySelector('.comments');

export function listenersOfForm() {
  let addButton = document.querySelector('.add-form-button')
  let form = document.querySelector('.add-form')


  addButton.addEventListener('click', addNewComment)

  form.addEventListener('keyup', function (event) {
      if (!addButton.attributes.disabled && event.code == 'Enter') {
         addNewComment()
      }
      else{
        return
      }

})


let delButton = document.querySelector('.del-form-button');
  delButton.addEventListener('click', function () {
    comments.removeChild(comments.lastChild)
    allComments.pop()
  })
}

function listenerHref() {
    let href = document.getElementById("reg-href")
    href.addEventListener('click', function (event) {
      event.preventDefault()
      renderRegForm()
      listenerOfReg()
    })
}

function listenerOfReg() {
  let regButton = document.getElementById('reg-button')
  let regLogin = document.getElementById('reg-form-login')
  let regName = document.getElementById('reg-form-name')
  let regPassword = document.getElementById('reg-form-password')
  let loginButton = document.querySelector('.login-form')
  regButton.addEventListener('click', function () {
    loginUser(regLogin, regName, regPassword)
  })
  loginButton.addEventListener('click', function () {
    autorizationForm()
    listenerOfAutoriz()
  })
}

function listenerOfAutoriz() {
  let loginUserButton = document.querySelector('.login')
  let logLogin = document.querySelector('.log-form-login')
  let logPassword= document.querySelector('.log-form-password')
  let regPageButton= document.querySelector('.reg-form-button')
  logLogin.addEventListener('input', function () {
    if (logLogin.value.length >= 3 && logPassword.value.length >= 3) {
      loginUserButton.removeAttribute('disabled')
    }
    else{
      loginUserButton.setAttribute('disabled','disabled')
    }
})

logPassword.addEventListener('input', function () {
  if (logLogin.value.length >= 3 && logPassword.value.length >= 3) {
    loginUserButton.removeAttribute('disabled')
  }
  else {
    loginUserButton.setAttribute('disabled', 'disabled')
    }
})

loginUserButton.addEventListener('click', function () {
  autorisationUser(logLogin, logPassword)
  })
regPageButton.addEventListener('click', function () {
  renderRegForm()
  listenerOfReg()
  })
}


export {commentClickListener, initEventListeners, listenerHref}

