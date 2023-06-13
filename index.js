"use strict";
// Код писать здесь


let comments = [
]
let token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k"

// token = null

function getApiFunction() {
    return fetch('https://wedev-api.sky.pro/api/v2/sergey-bondarenko/comments', {
        method: "GET",
        headers: {
            Authorization: token
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            }
            else {
                throw new Error()
            }
        })
        .then((responseData) => {
            const appComents = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: comment.date,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })
            comments = appComents
            renderApp()
        })
        .then(() => {
            // commentsLoader.innerHTML = ""
        })
        .catch(() => {
            // commentsLoader.innerHTML = 'Проблемы с сервером или отсутствует интернет соединение, попробуйте перезагрузить страницу'
        })
}

getApiFunction()

function postApiFunction() {

    let addFormButton = document.getElementById('add-form-button')
    let addFormName = document.getElementById('add-form-name')
    let addFormText = document.getElementById('add-form-text')

    return fetch('https://wedev-api.sky.pro/api/v2/sergey-bondarenko/comments', {
        method: "POST",
        body: JSON.stringify({
            //   name: addFormName.value,
            text: addFormText.value
        }),
        headers: {
            Authorization: token
        }
    })
        .then((response) => {
            // console.log(response);
            if (response.status === 201) {
                return response.json()
            }
            else if (response.status === 400) {
                throw new Error("Ошибка ввода")
            }
            else if (response.status === 500) {
                throw new Error("Ошибка сервера")
            }
            else {
                throw new Error("Ошибка")
            }
        })
        .then((responseData) => {
            return getApiFunction()
        })
        .then(() => {
            addFormButton.disabled = false
            addFormButton.textContent = "Написать"
            addFormName.value = ''
            addFormText.value = ''
        })
        .catch((error) => {
            addFormButton.disabled = false
            if (error.message === "Ошибка ввода") {
                alert('Поле ввода имени должно содержать минимум 3 символа')
            }
            else if (error.message === "Ошибка сервера") {
                alert('Сервер временно недоступен, попробуйте позже')
            }
            else {
                alert('Отсутствует подключение к интернету')
            }
        })

}

const editCommentText = () => {
    let addFormText = document.getElementById('add-form-text')
    const commentElements = document.querySelectorAll('.comment')
    for (const comment of commentElements) {
        comment.addEventListener('click', () => {
            const index = comment.dataset.index
            const userName = comments[index].name
            const text = comments[index].text
            addFormText.value = `>${text} \n${userName}, `
        })
    }

}
editCommentText()

const initLikeButtons = () => {
    const likeButtonElements = document.querySelectorAll('.like-button')
    const likeCountElements = document.querySelectorAll('.likes-counter')
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (e) => {
            e.stopPropagation()
            const comment = comments[likeButtonElement.dataset.index]
            comment.likes = comment.isLiked ? comment.likes - 1 : comment.likes + 1
            comment.isLiked = !comment.isLiked
            renderApp()
        })
    }
}
initLikeButtons()

const renderApp = () => {
    const appEl = document.getElementById('app')

    if (!token) {
        let appHtml = `<div class="container">
  <div class="add-form">
  <div class="form-header">Форма входа</div>
  <input type="text" id="get-form-name" class="add-form-name entrance-inputs" placeholder="Введите ваше имя" />
  <input type="text" id="get-form-login" class="add-form-name entrance-inputs" placeholder="Введите ваш логин" />
  <input type="password" id="get-form-password" class="add-form-name entrance-inputs"
    placeholder="Введите ваш пароль" />
  <div class="add-form-row entrance-buttons">
    <button id="reg-form-button" class="add-form-button">Войти</button>
    <button id="reg-form-button" class="reg-form-button">Зарегистрироваться</button>
  </div>
  </div>`
        appEl.innerHTML = appHtml
    }

    else {
        const commentsHtml = comments.map((comment, index) => {
            return `<li class="comment" data-index="${index}">
      <div class="comment-header">
        <div class="comment-name" data-index="${index}">${comment.name
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")}</div>
        <div>
          ${getDate(comment.date)}
          </div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment.text
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")}
          </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
        </div>
      </div>
    </li>`
        }).join('')

        let appHtml = `<div class="container">
  <div class="add-form">
  <div class="form-header">Форма входа</div>
  <input type="text" id="get-form-name" class="add-form-name entrance-inputs" placeholder="Введите ваше имя" />
  <input type="text" id="get-form-login" class="add-form-name entrance-inputs" placeholder="Введите ваш логин" />
  <input type="password" id="get-form-password" class="add-form-name entrance-inputs"
    placeholder="Введите ваш пароль" />
  <div class="add-form-row entrance-buttons">
    <button id="reg-form-button" class="add-form-button">Войти</button>
    <button id="reg-form-button" class="reg-form-button">Зарегистрироваться</button>
  </div>
  </div>
  <div class="comments-loader"></div>
  <ul id="comments" class="comments">
  <!-- rendering from JS -->
  ${commentsHtml}
  </ul>
  <div class="add-form">
  <input type="text" id="add-form-name" class="add-form-name" placeholder="Введите ваше имя" />
  <textarea type="textarea" id="add-form-text" class="add-form-text" placeholder="Введите ваш коментарий"
    rows="4"></textarea>
  <div class="add-form-row">
    <button id="add-form-button" class="add-form-button">Написать</button>
  </div>
  </div>
  </div>`
        appEl.innerHTML = appHtml
    }




    let commentsContainer = document.getElementById('comments')
    let addFormButton = document.getElementById('add-form-button')
    let addFormName = document.getElementById('add-form-name')
    let addFormText = document.getElementById('add-form-text')
    let commentForm = document.querySelector('.add-form')
    // const commentsLoader = document.querySelector('.comments-loader')

    // commentsLoader.innerHTML = "Комментарии загружаются"


    initLikeButtons()
    editCommentText()
    addFormButton.addEventListener('click', () => {
        // addFormName.classList.remove('error')
        addFormText.classList.remove('error')
        //   if (addFormName.value === "") {
        //     return addFormName.classList.add('error')
        //   }
        if (addFormText.value === "") {
            return addFormText.classList.add('error')
        }
        addFormButton.disabled = true
        addFormButton.textContent = "Отправка"
        postApiFunction()

        renderApp()
        // initLikeColor()
        // initLikeButtons()


    })

}

renderApp()


function getDate(date) {
    let myDate = new Date(date)


    let hours = myDate.getHours()
    let minutes = myDate.getMinutes()

    if (hours < 10) {
        hours = '0' + hours
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    let day = myDate.getDate()
    let month = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    let year = Number(String(myDate.getFullYear()).substring(2))
    let userDate = day + "." + month[myDate.getMonth()] + "." + year + ' ' + hours + ":" + minutes
    return userDate
}



console.log("It works!");