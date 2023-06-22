//переменные элементов
const nameInput = document.querySelector('#name-input')
const commentInput = document.querySelector('#comment-input')
const addButton = document.querySelector('#add-button')
const commentsBox = document.querySelector('#comments-box')
const removeButton = document.querySelector('#delete-button')
//переменные для даты
const date = new Date()
const optionsForDate = {month: 'numeric', day: 'numeric'}
const currentDate = `${date.toLocaleDateString('ru-RU', optionsForDate)}.${String(date.getFullYear()).slice(2)} ${fullTime(date.getHours())}:${fullTime(date.getMinutes())}`;
// переводим список комментов в массив
const commentsList = [
    {
        userName: 'Глеб Фокин',
        currDate: '12.02.22 12:18',
        likeCounter: 3,
        isLike: false,
        likeStatus: '',
        commentText: 'Это будет первый комментарий на этой странице',
        editStatus: 'edit',
        editButtonText: 'Редактировать',
        isEdit: `<textarea class="comment-edit">Это будет первый комментарий на этой странице</textarea>`,
    } ,
    {
        userName: 'Варвара Н.',
        currDate: '13.02.22 19:22',
        likeCounter: 75,
        isLike: false,
        likeStatus: '',
        editStatus: 'edit',
        editButtonText: 'Редактировать',
        commentText: 'Мне нравится как оформлена эта страница! ❤',
        isEdit: `<textarea class="comment-edit">Мне нравится как оформлена эта страница! ❤</textarea>`,
    }
]


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
                <div class="comment-text">
                  ${comments.commentText}
                </div>
                <button id='edit-button' data-status=${comments.editStatus} data-index='${index}' class="add-form-button add-form-button_edit">${comments.editButtonText}</button>
              </div>
              <div class="comment-footer">
                <div class="likes">
                  <span class="likes-counter">${comments.likeCounter}</span>
                  <button data-like='${index}' class="like-button ${comments.likeStatus}"></button>
                </div>
              </div>
        </li>    
        `
    }).join('')

    commentsBox.innerHTML = commentsHtml;

    initLikeButtonsListeners();
    initEditButtonsListeners();
}

// Функция создания коллекции и навешивания ивентов на все кнопки Like
const initLikeButtonsListeners = () => {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((likeButton, index) => {
        likeButton.addEventListener('click', () => {
            if (commentsList[index].isLike === false ) {
                commentsList[index].isLike = true;
                commentsList[index].likeCounter += 1
                commentsList[index].likeStatus = '-active-like'
            } else {
                commentsList[index].isLike = false;
                commentsList[index].likeCounter -= 1
                commentsList[index].likeStatus = ''
            }

            renderCommentList()
        })
    })
}
//Функция создания коллекции и навешивания ивентов на все кнопки РЕДАКТИРОВАТЬ и СОХРАНИТЬ
//Так же логика измений кнопки с РЕДАКТИРОВАТЬ на СОХРАНИТЬ и обратно
const initEditButtonsListeners = () => {
    const editButtons = document.querySelectorAll('#edit-button')
    editButtons.forEach(editButton => {
        editButton.addEventListener('click', () => {
           if (editButton.dataset.status === 'edit') {           
            commentsList[editButton.dataset.index].editStatus = 'save'  //переписываю статус у дата атрибута чтоб он по разному отрабатывал
            commentsList[editButton.dataset.index].editButtonText = 'Сохранить'  //так же меняю текст внутри кнопки
            commentsList[editButton.dataset.index].commentText = commentsList[editButton.dataset.index].isEdit; // чтоб в поле редактирования появился наш ранее введеный комментарий
            

           } else {
            const editCommentText = document.querySelector('.comment-edit')
            // Проверка на пустой коммент 
            //(пытался отключить кнопку с помощью addEventListener('input', () => {} )
            //для отслеживания изменений в editCommentText.value при значении '',  не вышло =\
            if (!editCommentText.value == '') {
                commentsList[editButton.dataset.index].editStatus = 'edit'  // возвращаю стаут edit для дата атрибута
                commentsList[editButton.dataset.index].editButtonText = 'Редактировать'     // так же возвращаю текст кнопки            
                commentsList[editButton.dataset.index].isEdit = `<textarea class="comment-edit">${editCommentText.value}</textarea>` // переписываю шаблон isEdit, иначе при втором редактировании подставлялся первый вариант
                commentsList[editButton.dataset.index].commentText = editCommentText.value
            } else {
                commentsList[editButton.dataset.index].editStatus = 'edit'
                commentsList[editButton.dataset.index].editButtonText = 'Редактировать'                
                commentsList[editButton.dataset.index].isEdit = `<textarea class="comment-edit">${'Комментарий не может быть пустым'}</textarea>`
                commentsList[editButton.dataset.index].commentText = 'Комментарий не может быть пустым' // заглушка на случай пустого коммента
            }
            
           }
           
           renderCommentList();
        })
    })
}

//РЕНДЕРИМ НАШ СПИСОК КОММЕНТАРИЕВ
renderCommentList();


//ВСЕ ОСТАЛЬНЫЕ ФУНКЦИИ НА СТАТИЧЕСКИХ ЭЛЕМЕНТАХ

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
        editStatus: 'edit',
        editButtonText: 'Редактировать',
        commentText: commentInput.value,
        isEdit: `<textarea class="comment-edit">${commentInput.value}</textarea>`,
    })
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
    nameInput.value = ''
    commentInput.value = ''
    addButton.classList.add('add-form-button_disable')
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