//переменные элементов
const nameInput = document.querySelector('#name-input')
const commentInput = document.querySelector('#comment-input')
const addButton = document.querySelector('#add-button')
const commentsBox = document.querySelector('#comments-box')
const delButton = document.querySelector('#delete-button')
//переменные для даты
const date = new Date()
const optionsForDate = {month: 'numeric', day: 'numeric'}
const currentDate = `${date.toLocaleDateString('ru-RU', optionsForDate)}.${String(date.getFullYear()).slice(2)} ${fullTime(date.getHours())}:${fullTime(date.getMinutes())}`

//переводим список комментариев в массив
const commentsList = [
    {
        userName: 'Глеб Фокин',
        currDate: '12.02.22 12:18',
        likeCounter: 3,
        isLike: false,
        activeLike: '',
        commentText: 'Это будет первый комментарий на этой странице',
    } ,
    {
        userName: 'Варвара Н.',
        currDate: '13.02.22 19:22',
        likeCounter: 75,
        isLike: true,
        activeLike: '-active-like',
        commentText: 'Мне нравится как оформлена эта страница! ❤',
    }
]


//рендер массива в HTML
const renderCommentList = () => {
    const commentsHtml = commentsList.map((comments, index) => {
         return `<li class="comment">
               <div class="comment-header">
                 <div>${comments.userName}</div>
                 <div>${comments.currDate}</div>
               </div>
               <div class="comment-body">
                 <div class="comment-text">
                   ${comments.commentText}
                 </div>
               </div>
               <div class="comment-footer">
                 <div class="likes">
                   <span class="likes-counter">${comments.likeCounter}</span>
                   <button data-like='${index}' class="like-button ${comments.activeLike}"></button>
                 </div>
               </div>
                </li>    
                `
        }).join('')
    
        commentsBox.innerHTML = commentsHtml;
    
        initLikeButtonsListeners();
}


//функция добавления лайка
const initLikeButtonsListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', () => {
            if (commentsList[index].isLike === false ) {
                commentsList[index].isLike = true;
                commentsList[index].likeCounter += 1;
                commentsList[index].activeLike = '-active-like';
            } else {
                commentsList[index].isLike = false;
                commentsList[index].likeCounter -= 1
                commentsList[index].activeLike = '';
            }

            renderCommentList()
        })
    })
}


//рендер списка комментариев
renderCommentList();


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

// функция добавления нашего комментария в массив
function addComment() {
    commentsList.push({
        userName: nameInput.value,
        currDate: currentDate,
        likeCounter: 0,
        isLike: false,
        activeLike: '',
        commentText: commentInput.value,
    })
}

// функция удаления последнего комментария
function delLastComment() {
    commentsBox.innerHTML =  commentsBox.innerHTML.slice(0, commentsBox.innerHTML.lastIndexOf('<li class="comment">'))
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

// Проверка на заполненность формы при потере фокуса
commentInput.addEventListener('input', () => {
    if (commentInput.value == '') {
        commentInput.classList.add('add-form-comment_error')
    } else {
        commentInput.classList.remove('add-form-comment_error')
    }
})

// Нажатие на кнопку оставляет комментарий
addButton.addEventListener('click',() => {
    addComment()
    renderCommentList()
    nameInput.value = ''
    commentInput.value = ''
    addButton.classList.add('add-form-button_disable')
})

// Нажатие на кнопку удаляет последний комментарий
delButton.onclick = () => {
    delLastComment()
}

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






