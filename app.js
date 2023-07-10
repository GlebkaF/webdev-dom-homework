//переменные элементов
const nameInput = document.querySelector('#name-input')
const commentInput = document.querySelector('#comment-input')
const addButton = document.querySelector('#add-button')
const commentsBox = document.querySelector('#comments-box')
const removeButton = document.querySelector('#delete-button')
const loadingCommentsBox = document.querySelector('#loading-comments')
const loadingHeadBox = document.querySelector('#loading-head')
const inputsBox = document.querySelector('.add-form')




// переводим список комментов в массив
let commentsList = []

//переменная включающая или отключающая загрузку
let isLoadingToComments = false
let isLoadingToStartApp = true

// Функция повторного отправки, если статус 500
function tryPostAgain(error) {
    if (error.message === 'Сервер упал') {
        addComment()
    //В ином случае алертим сообщение об ошибке
    } else {
        alert(error)
    }
}
// Функция для имитации запросов в API
function delay(interval = 300) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, interval);
    });
}

// функция подправки времени.
function fullTime(number) {
    if (String(number).length < 2) {
       return number = `0${number}`
    } else {
       return number = number
    }
}

//функция скрытия или отображения загрузки для нового коммента
function enableLoadingToNewComment(boolean) {
  if (boolean) {
    loadingCommentsBox.classList.remove('loading_hidden')
    inputsBox.classList.add('loading_hidden')
  } else {
    loadingCommentsBox.classList.add('loading_hidden')
    inputsBox.classList.remove('loading_hidden')
  }
}

//функция скрытия или отображения загрузки при старте приложения
function enableLoadingToStartApp(boolean) {
    if (boolean) {
      loadingHeadBox.classList.remove('loading_hidden')      
    } else {
      loadingHeadBox.classList.add('loading_hidden')      
    }
}


//ВСЕ ЧТО СВЯЗАННО С API

// Получение списка комментариев с API
//завернутый в функцию GET запрос
function getCommentList() {
    enableLoadingToStartApp(isLoadingToStartApp)
    return fetch("https://wedev-api.sky.pro/api/v1/georgi-silanyev/comments", {
        method: "GET",
    })
    .then((response) => response.json())        
    .then((responseData) => {
            const rightResponse = responseData.comments.map((comment) => {
                return {
                    userName: comment.author.name,
                    currDate: `${new Date(comment.date).toLocaleDateString('ru-RU', {month: 'numeric', day: 'numeric'})}.${String(new Date(comment.date).getFullYear()).slice(2)} ${fullTime(new Date(comment.date).getHours())}:${fullTime(new Date(comment.date).getMinutes())}` ,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                    text: comment.text,
                }
            })
            commentsList = rightResponse
            isLoadingToStartApp = false
            enableLoadingToStartApp(isLoadingToStartApp)
            renderCommentList()
    })
    .catch(() => {
        //Если что-то пойдет не так при получении списка комментариев
        if (navigator.onLine) {
            alert('Что-то пошло не так')
        } else {
            alert('Похоже у Вас пропал интернет =(')
        }
    }) 

}

getCommentList();

//функция добавления комментария на страиницу и в список API 
function addComment() {
    isLoadingToComments = true
    enableLoadingToNewComment(isLoadingToComments)
    addButton.classList.add('add-form-button_disable')
    fetch("https://wedev-api.sky.pro/api/v1/georgi-silanyev/comments", {
        method: "POST",
        body : JSON.stringify({
            text: secureReplace(commentInput.value),
            name: secureReplace(nameInput.value),
            date: new Date(),
            likes: 0,
            isLiked: false,
            forceError: true
        })
    })
    .then((response) => {
        //если статус 201 просто продолжаем цепочку промисов
        if (response.status === 201) {
            return response.json()
        // в ином случае проверяем код статуса и по разному обрабатываем
        } else {
            //просто попробовать на практике switch/case
            switch (response.status) {
                case 400: throw new Error('Имя и комментарий не могут быть меньше 3-х символов')
                case 500: throw new Error('Сервер упал')
                default: throw new Error('Что-то пошло не так, попробуйте позже')
            }
        }
        
    })
    .then(() => getCommentList())
    .then(() => {
        isLoadingToComments = false
        enableLoadingToNewComment(isLoadingToComments)
        addButton.classList.remove('add-form-button_disable')
        nameInput.value = ''
        commentInput.value = ''
    })
    .catch((error) => {
        // проверяем находимся ли мы в сети (обработка выключенного интернета)
        if (navigator.onLine) {
            //если был код ошибки 500 т.е выключенного сервера (повторяем запрос)
            tryPostAgain(error)
        // алертим сообщение что интернет отсутствует
        } else {
            alert('похоже у Вас пропал интернет =(')
        }        
        isLoadingToComments = false
        enableLoadingToNewComment(isLoadingToComments)
        addButton.classList.remove('add-form-button_disable')
    })


    
}

//Функция замены тегов
function secureReplace(string) {
    return string
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
}




//ВСЕ ЧТО СВЯЗАНО С РЕНДЕРОМ И СОЗДАНИЕМ КОЛЛЕКЦИЙ В ДИНАМИЧЕСКИХ ЭЛЕМЕНТАХ

// рендерим наш массив в HTML
const renderCommentList = () => {
   const commentsHtml = commentsList.map((comments, index) => {
        return `<li class="comment">
              <div class="comment-header">
                <div>${comments.userName}</div>
                <div>${comments.currDate}</div>
              </div>
              <div class="comment-body">
                <div data-answer='${index}' class="comment-text">
                  ${(comments.isEdit) ? `<textarea class="comment-edit">${comments.text}</textarea>` : `${comments.text}` }
                </div>
                <button id='edit-button' data-index='${index}' class="add-form-button">${comments.isEdit ? `Сохранить` : 'Редактировать'}</button>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comments.likes}</span>
                  <button data-like='${index}' class="like-button ${(comments.isLiked) ? `-active-like` : ''}"></button>
                </div>
              </div>
        </li>    
        `
    }).join('')
    

    commentsBox.innerHTML = commentsHtml.replaceAll("→", "<div class='quote'>").replaceAll("←", "</div class='quote'>");
    
    //инициализируем все коллекции в ренедер-функцию
    initLikeButtonsListeners();
    initEditButtonsListeners();
    initCommentAnswerListeners();
}

// Функция создания ответа на комментарий
const initCommentAnswerListeners = () => {
    const commentAnswer = document.querySelectorAll(".comment-text")
    commentAnswer.forEach((answer, index) => {
        answer.addEventListener('click', () => {
           if(answer.children.length == 0) { //Дополнительная проверка, чтоб не отрабатывал клик на редактируемый комментарий
            commentInput.value = `→${commentsList[index].userName}

${commentsList[index].text}←
            
`
           }
        })
    })
}

// Функция создания коллекции и навешивания ивентов на все кнопки Like
const initLikeButtonsListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', () => {
            likeButton.classList.add('-loading-like')
            delay(2000).then(() => {
                if (commentsList[index].isLiked === false ) {
                    commentsList[index].isLiked = true;
                    commentsList[index].likes += 1
                } else {
                    commentsList[index].isLiked = false;
                    commentsList[index].likes -= 1
                    
                }
                likeButton.classList.remove('-loading-like')
                renderCommentList()
            })
           
        })
    })
}

//Функция создания коллекции и навешивания ивентов на все кнопки РЕДАКТИРОВАТЬ и СОХРАНИТЬ
//Так же логика измений кнопки с РЕДАКТИРОВАТЬ на СОХРАНИТЬ и обратно
const initEditButtonsListeners = () => {
    const editButtons = document.querySelectorAll('#edit-button')
    editButtons.forEach((editButton, index) => {
        editButton.addEventListener('click', () => {
            const editCommentText = document.querySelector('.comment-edit')
           if (commentsList[index].isEdit) {           
            if (!editCommentText.value == '') {
                commentsList[index].isEdit = false
                commentsList[index].commentText = editCommentText.value
            } else {
                commentsList[index].isEdit = false
                commentsList[index].commentText = `Комментарий не может быть пустым`
            }
           } else {            
            commentsList[index].isEdit = true
           }
           
           renderCommentList();
        })
    })
}



//ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ НА СТАТИЧЕСКИХ ЭЛЕМЕНТАХ

// Выключение кнопки при не соблюдении условий
function disableBtn() {
    if (!nameInput.value == '' && !commentInput.value == '') {
        addButton.classList.remove('add-form-button_disable')
    } else {
        addButton.classList.add('add-form-button_disable')
    }
}

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте имени
nameInput.addEventListener('input', () => {
    disableBtn()
    nameInput.classList.remove('add-form-name_error')
})

nameInput.addEventListener('blur', () => {
    if (nameInput.value == '') {
        nameInput.classList.add('add-form-name_error')
    } else {
        nameInput.classList.remove('add-form-name_error')
    }
})

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте комментариев
commentInput.addEventListener('input', () => {
    disableBtn()
    commentInput.classList.remove('add-form-comment_error')
})

commentInput.addEventListener('blur', () => {
    if (commentInput.value == '') {
        commentInput.classList.add('add-form-comment_error')
    } else {
        commentInput.classList.remove('add-form-comment_error')
    }
})

//логика кнопки добавления комментария
addButton.addEventListener('click', () => {
    addComment()
    renderCommentList()
    addButton.classList.add('add-form-button_disable')
    addButton.blur()
})

// Обработка нажатия на enter
window.addEventListener('keyup',(event) => {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        if (!nameInput.value == '' && !commentInput.value == ''){
            addComment()
            renderCommentList()
            nameInput.value = ''
            commentInput.value = ''
            addButton.classList.add('add-form-button_disable')
        }
    }
})