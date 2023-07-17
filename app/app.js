import { getCommentList, postNewComment } from "./modules/api.js" // GET and POST запросы
import { secureReplace } from "./modules/sanitizeHtml.js" // Реплейсы тегов
import { enableLoadingToNewComment, enableLoadingToStartApp } from "./modules/loadingFunctions.js" // Функции лоадинг-баров (отобразить/скрыть)
import { renderCommentList } from "./modules/renderCommentList.js" // Отрисовка полученного списка комментов
import { fullTime, rightDateFormat } from "./modules/editAndGetTimeFunctions.js" // Функция подправки времени и получения правильного формата времени/даты
import { disableBtn } from "./modules/disableBtn.js" // Отключение/включение кнопки
import { delay } from "./modules/delay.js" // Иммитация API для лайков(либо просто контролируемый дилэй)
import { tryPostAgain } from "./modules/tryPostAgain.js" // Повторный POST при получении 500 статуса

// Переменные элементов
const nameInput = document.querySelector('#name-input')
const commentInput = document.querySelector('#comment-input')
const addButton = document.querySelector('#add-button')
const commentsBox = document.querySelector('#comments-box')
const loadingCommentsBox = document.querySelector('#loading-comments')
const loadingHeadBox = document.querySelector('#loading-head')
const inputsBox = document.querySelector('.add-form')

// Создаем массив для хранения списка комментариев
let commentsList = []

// Переменные включающие или отключающие загрузку
let isLoadingToComments = false
let isLoadingToStartApp = true

// Получение и рендер списка комментариев с API
function getAndRenderCommentList() {
    enableLoadingToStartApp(isLoadingToStartApp, loadingHeadBox)        
    getCommentList()
    .then((responseData) => {
        const rightResponse = responseData.comments.map((comment) => {
            return {
                userName: comment.author.name,
                currDate: rightDateFormat(fullTime, comment.date),
                likes: comment.likes,
                isLiked: comment.isLiked,
                text: comment.text,
            }
        })
        commentsList = rightResponse
        isLoadingToStartApp = false
        enableLoadingToStartApp(isLoadingToStartApp, loadingHeadBox)
        renderCommentList(commentsList, commentsBox, initLikeButtonsListeners, initEditButtonsListeners, initCommentAnswerListeners)
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

getAndRenderCommentList();

// Функция добавления комментария на страиницу и в список API 
function addComment() {
    isLoadingToComments = true
    enableLoadingToNewComment(isLoadingToComments, loadingCommentsBox, inputsBox)
    addButton.classList.add('add-form-button_disable')
    postNewComment(commentInput.value, nameInput.value, secureReplace)
    .then(() => getAndRenderCommentList())
    .then(() => {
        isLoadingToComments = false
        enableLoadingToNewComment(isLoadingToComments, loadingCommentsBox, inputsBox)
        addButton.classList.add('add-form-button_disable')
        nameInput.value = ''
        commentInput.value = ''
    })
    .catch((error) => {
        // проверяем находимся ли мы в сети (обработка выключенного интернета)
        if (navigator.onLine) {
            //если был код ошибки 500 т.е выключенного сервера (повторяем запрос)
            tryPostAgain(error, addComment)
        // алертим сообщение, что интернет отсутствует
        } else {
            alert('похоже у Вас пропал интернет =(')
        }        
        isLoadingToComments = false
        enableLoadingToNewComment(isLoadingToComments, loadingCommentsBox, inputsBox)
        addButton.classList.remove('add-form-button_disable')
    })


    
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
                renderCommentList(commentsList, commentsBox, initLikeButtonsListeners, initEditButtonsListeners, initCommentAnswerListeners)
            })
           
        })
    })
}

// Функция создания коллекции и навешивания ивентов на все кнопки РЕДАКТИРОВАТЬ и СОХРАНИТЬ
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
           
           renderCommentList(commentsList, commentsBox, initLikeButtonsListeners, initEditButtonsListeners, initCommentAnswerListeners);
        })
    })
}

// ВАЛИДАЦИЯ ФОРМЫ

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте имени
nameInput.addEventListener('input', () => {
    disableBtn(nameInput, commentInput, addButton)
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
    disableBtn(nameInput, commentInput, addButton)
    commentInput.classList.remove('add-form-comment_error')
})

commentInput.addEventListener('blur', () => {
    if (commentInput.value == '') {
        commentInput.classList.add('add-form-comment_error')
    } else {
        commentInput.classList.remove('add-form-comment_error')
    }
})

// Логика кнопки добавления комментария
addButton.addEventListener('click', () => {
    addComment()
    renderCommentList(commentsList, commentsBox, initLikeButtonsListeners, initEditButtonsListeners, initCommentAnswerListeners)
    addButton.classList.add('add-form-button_disable')
    addButton.blur()
})

// Обработка нажатия на enter
window.addEventListener('keyup',(event) => {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        if (!nameInput.value == '' && !commentInput.value == ''){
            addComment()
            renderCommentList(commentsList, commentsBox, initLikeButtonsListeners, initEditButtonsListeners, initCommentAnswerListeners)
            nameInput.value = ''
            commentInput.value = ''
            addButton.classList.add('add-form-button_disable')
        }
    }
})