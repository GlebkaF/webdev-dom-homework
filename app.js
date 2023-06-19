//переменные элементов
const nameInput = document.querySelector('#name-input')
const commentInput = document.querySelector('#comment-input')
const addButton = document.querySelector('#add-button')
const commentsBox = document.querySelector('#comments-box')
const removeButton = document.querySelector('#delete-button')
//переменные для даты
const date = new Date()
const optionsForDate = {month: 'numeric', day: 'numeric'}
const currentDate = `${date.toLocaleDateString('ru-RU', optionsForDate)}.${String(date.getFullYear()).slice(2)} ${fullTime(date.getHours())}:${fullTime(date.getMinutes())}`

// функция подправки времени.
function fullTime(number) {
    if (String(number).length < 2) {
       return number = `0${number}`
    } else {
       return number = number
    }
}
// Выключение кнопки при не соблюдении условий
function disableBtn() {
    if (!nameInput.value == '' && !commentInput.value == '') {
        addButton.classList.remove('add-form-button_disable')
    } else {
        addButton.classList.add('add-form-button_disable')
    }
}

// функция рендера комментария
function addComment() {
    const textHtml = 
    `
    <li class="comment">
          <div class="comment-header">
            <div>${nameInput.value}</div>
            <div>${currentDate}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text">
              ${commentInput.value}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">0</span>
              <button class="like-button"></button>
            </div>
          </div>
    </li>    
    `
    commentsBox.insertAdjacentHTML('beforeend', textHtml)

}

// функция удаления последнего комментария
function removeLastComment() {
    commentsBox.innerHTML =  commentsBox.innerHTML.slice(0, commentsBox.innerHTML.lastIndexOf('<li class="comment">'))
}

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте имени
nameInput.oninput = (e) => {
    disableBtn()
    nameInput.classList.remove('add-form-name_error')
}

nameInput.onblur = (e) => {
    if (e.target.value == '') {
        nameInput.classList.add('add-form-name_error')
    } else {
        nameInput.classList.remove('add-form-name_error')
    }
}

// Перекрашиваем поле и включаем/отлючаем кнопку в инпуте комментариев
commentInput.oninput = (e) => {
    disableBtn()
    commentInput.classList.remove('add-form-comment_error')
}

// Проверка на заполненность формы при потере фокуса
commentInput.onblur = (e) => {
    if (e.target.value == '') {
        commentInput.classList.add('add-form-comment_error')
    } else {
        commentInput.classList.remove('add-form-comment_error')
    }
}

// Нажатие на кнопку оставляет комментарий
addButton.onclick = () => {
    addComment()
    nameInput.value = ''
    commentInput.value = ''
    addButton.classList.add('add-form-button_disable')
}

// Нажатие на кнопку удаляет последний комментарий
removeButton.onclick = () => {
    removeLastComment()
}

// Обработка нажатия на enter
window.addEventListener('keyup',(event) => {
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
        if (!nameInput.value == '' && !commentInput.value == ''){
            addComment()
            nameInput.value = ''
            commentInput.value = ''
            addButton.classList.add('add-form-button_disable')
        }
    }
})






