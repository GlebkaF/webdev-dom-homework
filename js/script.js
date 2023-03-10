'use strict';
const commentsListArray = [
    {
        name: 'Глеб Фокин',
        date: '12.02.22 12:18',
        commentText: 'Это будет первый комментарий на этой странице',
        likeCount: 3,
        like: false,
    },
    {
        name: 'Варвара Н.',
        date: '13.02.22 19:22',
        commentText: 'Мне нравится как оформлена эта страница! ❤',
        likeCount: 75,
        like: true,
    },
];



const addForm = document.getElementById('add-form');                    // Форма
const commentsList = document.getElementById('comments');               // Комментарии
const inputName = document.getElementById('input-name');                // Поле ввода имя
const inputComment = document.getElementById('input-comment');          // Поле ввода комментарий
const buttonAddComment = document.getElementById('button-add-comment'); // Кнопка добавления комментария


buttonAddComment.addEventListener('click', () => {
const currentCommentsList = commentsList.innerHTML;
const currentDate = new Date;
const dateFormat = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
}
const timeFormat = {
    hour: '2-digit',
    minute: '2-digit',
}

// Таймаут красного фона на полях
function clearInputName() {
    inputName.classList.remove('error__name')
    inputName.placeholder = 'Введите ваше имя';
}
function clearInputComment() {
    inputComment.classList.remove('error__name')
    inputComment.placeholder = 'Введите ваш комментарий';
}


if (inputName.value === '') {
    inputName.classList.add('error__name');
    inputName.placeholder = 'Поле не может быть пустым!';
    inputName.value = '';
    inputComment.value = '';
    setTimeout(clearInputName, 1500);

} else if (inputComment.value === '' || inputComment.value === '\n') {
    inputComment.classList.add('error__name');
    inputComment.placeholder = 'Поле не может быть пустым!';
    inputComment.value = '';
    setTimeout(clearInputComment, 1500);

} else {
    commentsList.innerHTML = currentCommentsList + `<li class="comment">
    <div class="comment-header">
    <div>${inputName.value}</div>
    <div>
        ${currentDate.toLocaleDateString('ru-RU', dateFormat) +
    ' ' + currentDate.toLocaleTimeString('ru-RU', timeFormat)}
    </div >
    </div >
    <div class="comment-body">
    <div class="comment-text">
        ${inputComment.value}
    </div>
    </div>
    <div class="comment-footer">
    <div class="likes">
        <span class="likes-counter">0</span>
        <button class="like-button"></button>
    </div>
    </div>
</li >`;
    inputName.value = '';
    inputComment.value = '';
}

})

// Клик на Enter
addForm.addEventListener('keyup', (e) => {
if (e.code == 'Enter') buttonAddComment.click();
});




console.log("It works!");