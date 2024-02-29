import { postComment, userAuth, userName } from './api.js'
import { getCurrentDate } from './getDate.js'
import { mapData } from './main.js'
import { renderLogin } from './renderLogin.js'
import _ from 'lodash'

export const renderComments = ({ comments }) => {
    //let isLoaded;

    const CommentsHtml = comments
        .map((comment, index) => {
            let isLike
            let inputTextHtml
            let textButtonEditSave
            let classButtonEditSave
            //isLoadedPage = true;
            comment.myLike ? (isLike = '-active-like') : false

            comment.isEdit
                ? (textButtonEditSave = 'Сохранить')
                : (textButtonEditSave = 'Редактировать')
            comment.isEdit
                ? (classButtonEditSave = 'comment-text-save')
                : (classButtonEditSave = 'comment-text-edit')
            comment.isEdit
                ? (inputTextHtml = `<textarea id="form-text" type="textarea" class="add-form-text" placeholder="Введите ваш коментарй" rows="4">${comment.text}</textarea>`)
                : (inputTextHtml = `<div data-index="${index}" class="comment-text">${comment.text}</div>`)

            return `<li class="comment">
            <div class="comment-header">
              <div>${comment.author}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              ${inputTextHtml}
            </div>
            <button data-edit="${index}" class="${classButtonEditSave}">${textButtonEditSave}</button>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likeCount}</span>
                <button class="like-button ${isLike}" id="like-button" data-islike="${index}"></button>
              </div>
            </div>
          </li>`
        })
        .join('')

    const container = document.getElementById('app')
    const authComment = document.getElementById('auth-comment')
    let blockAuthDisplay
    let blockAddCommentDisplay

    console.log(userAuth)
    const appHtml = `
<div class="container">
      <ul class="comments" id="comment-list">
        ${CommentsHtml}
      </ul>
      <span class="comment-loader">Пожайлуйста подождите, комментарий добавляется</span>
</div>
`

    container.innerHTML = appHtml

    if (userAuth) {
        blockAuthDisplay = 'none'
        blockAddCommentDisplay = 'block'
    } else {
        blockAuthDisplay = 'block'
        blockAddCommentDisplay = 'none'
    }

    const blcAuthComment = `
<div id="block-auth" class="mrgn-tp-20 mrgn-btm-20" style="display: ${blockAuthDisplay}">
      <span>Добавлять комментарии могут только авторизованные пользователи</span>
      <br>
      <button class="add-form-button" id="to-auth-button">Авторизоваться</button>
    </div>
    <div class="add-form mrgn-tp-20 mrgn-btm-20" id="forma" style="display: ${blockAddCommentDisplay}">
      <input
        type="text"
        id="form-name"
        class="add-form-name"
        placeholder="Введите ваше имя"
        value="${userName}"
        readonly
      />
      <textarea
        id="form-text"
        type="textarea"
        class="add-form-text"
        placeholder="Введите ваш коментарий"
        rows="4"
      ></textarea>
      <div class="add-form-row">
        <button class="add-form-button" id="add-form-button">Написать</button>
      </div>
      <div class="add-form-row">
        <!--<button class="delete-form-button" id="delete-form-button">Удалить последний коммент</button>-->
      </div>
    </div>
`

    authComment.innerHTML = blcAuthComment

    // Запрет на действие по умолчанию для textArea - gthеход на новую строку. Иначе функция addComment будет выполняться,
    // если заполнено поле с именеи и в поле комментария есть переход на новую строку

    // eslint-disable-next-line no-unused-vars
    const textArea = document
        .getElementById('form-text')
        .addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault()
            }
        })

    // eslint-disable-next-line no-unused-vars
    const commentList = document.getElementById('comment-list')
    const buttonAddComment = document.getElementById('add-form-button')
    const inputName = document.getElementById('form-name')
    const inputText = document.getElementById('form-text')
    const loaderAddComment = document.querySelector('.comment-loader')
    const loaderPage = document.querySelector('.page-loader')

    const formaComment = document.getElementById('forma')

    // Функция ответа на комментарий

    function initAnswerComment2() {
        const commentTexts = document.querySelectorAll('.comment-text')

        commentTexts.forEach((commentText, index) => {
            commentText.addEventListener('click', () => {
                inputText.value =
                    '> ' +
                    comments[index].text +
                    '\n' +
                    comments[index].author +
                    ', '
            })
        })
    }

    // Функция разблокировки кнопки "Написать", если поле с именем не пустое

    inputName.addEventListener('input', () => {
        buttonAddComment.disabled = false
    })

    // Функция разблокировки кнопки "Написать", если поле с текстом комментария не пустое

    inputText.addEventListener('input', () => {
        buttonAddComment.disabled = false
    })

    // Функция добавления лайка

    const ititAddLikeListener = () => {
        const likeButtons = document.querySelectorAll('.like-button')

        for (const likeButton of likeButtons) {
            likeButton.addEventListener('click', () => {
                let index = likeButton.dataset.islike

                if (comments[index].myLike) {
                    comments[index].myLike = false
                    comments[index].likeCount--
                } else {
                    comments[index].myLike = true
                    comments[index].likeCount++
                }

                renderComments({ comments })
                loaderPage.style.display = 'none'
            })
        }
    }

    // Функция изменения комментария - вызов по кнопке "Редактировать"

    const initEditCommentListener = () => {
        const editButtons = document.querySelectorAll('.comment-text-edit')

        for (const editButton of editButtons) {
            editButton.addEventListener('click', () => {
                let index = editButton.dataset.edit

                comments[index].isEdit = true
                renderComments({ comments })
            })
        }
    }

    // Функция сохранения изменений в комментарии - вызов по кнопке "Сохранить"

    const initSaveEditCommentListener = () => {
        const saveButtons = document.querySelectorAll('.comment-text-save')

        for (const saveButton of saveButtons) {
            saveButton.addEventListener('click', () => {
                let index = saveButton.dataset.edit
                const inputText = document.getElementById('form-text')

                comments[index].text = inputText.value
                comments[index].isEdit = false

                renderComments({ comments })
            })
        }
    }

    initAnswerComment2()
    ititAddLikeListener()
    initEditCommentListener()
    initSaveEditCommentListener()

    const postTask = () => {
        let currentDate = getCurrentDate(new Date())
        postComment({
            text: _.capitalize(inputText.value),
            name: inputName.value,
            date: currentDate,
            likes: 0,
            isLiked: false,
            forceError: true,
        })
            // eslint-disable-next-line no-unused-vars
            .then((resultCommentsData) => {
                return mapData()
            })
            // eslint-disable-next-line no-unused-vars
            .then((resultData) => {
                buttonAddComment.disabled = false
                loaderAddComment.style.display = 'none'
                inputName.value = ''
                inputText.value = ''
            })
            .catch((error) => {
                console.warn(error)
                loaderAddComment.style.display = 'none'
                if (error.message === 'Имя или комментраий короткие') {
                    alert('Имя и комментарий должны быть не короче 3х символов')
                    inputName.classList.add('error-form')
                    inputText.classList.add('error-form')
                } else if (error.message === 'Сервер не отвечает') {
                    //alert ("Сервер сломался, попробуй позже");
                    //buttonAddComment.disabled = false;
                    postTask()
                } else {
                    alert('Кажется, у вас сломался интернет, попробуйте позже')
                    buttonAddComment.disabled = false
                }
            })
    }

    // Функция отправки комментария

    function addComment(event) {
        if (
            event.type === 'click' ||
            (event.type === 'keyup' && event.key === 'Enter')
        ) {
            if (inputName.value === '' && inputText.value !== '') {
                inputName.classList.add('error-form')
                inputText.classList.remove('error-form')
                buttonAddComment.disabled = true
                return
            } else if (inputText.value === '' && inputName.value !== '') {
                inputText.classList.add('error-form')
                inputName.classList.remove('error-form')
                buttonAddComment.disabled = true
                return
            } else if (inputName.value === '' && inputText.value === '') {
                inputName.classList.add('error-form')
                inputText.classList.add('error-form')
                buttonAddComment.disabled = true
                return
            }

            loaderAddComment.style.display = 'block'
            inputName.classList.remove('error-form')
            inputText.classList.remove('error-form')
            buttonAddComment.disabled = true

            postTask()
        }
    }

    const toPageAuth = document.querySelector('.add-form-button')

    toPageAuth.addEventListener('click', () => {
        renderLogin({ mapData })
    })

    buttonAddComment.addEventListener('click', addComment)
    formaComment.addEventListener('keyup', addComment)
}
