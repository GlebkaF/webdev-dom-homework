
// Определение переменных
const buttonElement = document.getElementById("add-form-button");
const listOfComments = document.getElementById("comments");
const nameInputElement = document.getElementById("add-form-name");
const commentInputElement = document.getElementById("add-form-text");
const removeButton = document.querySelector('.remove-form-button');


// Данные о комментариях
const comments = [
    {
        userName: 'Глеб Фокин',
        userDate: '12.02.22 12:18',
        userComment: 'Это будет первый комментарий на этой странице',
        likes: 3,
        isLiked: false,
    },

    {
        userName: 'Варвара Н.',
        userDate: '13.02.22 19:22',
        userComment: 'Мне нравится как оформлена эта страница! ❤',
        likes: 75,
        isLiked: true,
    }
]

// Функция render для исходных комментариев перенесена в js
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li id="comment" class="comment" data-index="${index}">
        <div class="comment-header">
          <div id="userName">${comment.userName}</div>
          <div id="userDate">${comment.userDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.userComment}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button data-index="${index}" id="like-button" class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`
    }).join("");

    listOfComments.innerHTML = commentsHtml;

    checkAddButton();
    initLikeButtons();
    answerComment();
}

// Добавление клика на лайк
const initLikeButtons = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");

    for (const likeButtonsElement of likeButtonsElements) {

        likeButtonsElement.addEventListener('click', (event) => {
            event.stopPropagation();

            const comment = comments[likeButtonsElement.dataset.index];
            if (comment.isLiked) {
                comment.likes = comment.likes - 1;
            } else {
                comment.likes = comment.likes + 1;
            }
            comment.isLiked = !comment.isLiked;
            renderComments();
        });
    }
}

// Добавление ответа на комментарии
const answerComment = () => {
    const commentElements = document.querySelectorAll('.comment');

    for (let element of commentElements) {
        element.addEventListener('click', () => {
            let index = element.dataset.index;

            commentInputElement.value = `START_QUOTE${comments[index].userName}:
            \n${comments[index].userComment.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
        });
    }
}

// Замена символов
const replaceValue = (value) => {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
}

// валидация на ввод (неактивная кнопка "Написать")
const checkAddButton = () => {
    nameInputElement.addEventListener('input', () => {
        if (nameInputElement.value) {
            document.getElementById('add-form-button').disabled = false;
            return;
        } else {
            document.getElementById('add-form-button').disabled = true;
            return;
        }
    });

    commentInputElement.addEventListener('input', () => {
        if (commentInputElement.value) {
            document.getElementById('add-form-button').disabled = false;
            return;
        } else {
            document.getElementById('add-form-button').disabled = true;
            return;
        }
    });
}

//  удаление последнего комментария
const deleteLastComment = () => {
    comments.pop();

    renderComments();
}

// функция клик addEventListener на добавление комментария
buttonElement.addEventListener('click', () => {

    // валидация на ввод
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }

    commentInputElement.classList.remove("error");
    if (commentInputElement.value === "") {
        commentInputElement.classList.add("error");
        return;
    }

    // функция на определение времени комментариев
    let myDate = new Date();
    let day = myDate.getDate();
    let month = myDate.getMonth();
    let year = myDate.getFullYear();
    let hour = myDate.getHours();
    let minute = myDate.getMinutes();

    if (minute < 10) {
        minute = "0" + minute;
    }
    if (month < 10) {
        month = "0" + month;
    }

    let fullDate = day + "." + month + "." + year + " " + hour + ":" + minute;


    // добавление нового комментария (update)
    comments.push({
        userName: replaceValue(nameInputElement.value),
        userDate: fullDate,

        userComment: replaceValue(commentInputElement.value)
            .replaceAll('START_QUOTE', '<div class="comment-quote">')
            .replaceAll('END_QUOTE', '</div>'),

        likes: 0,
        isLiked: false,
    })


    // отчистка поля для ввода для новых комментариев
    nameInputElement.value = "";
    commentInputElement.value = "";

    renderComments();
    initLikeButtons();

});
renderComments();

removeButton.addEventListener('click', deleteLastComment);

