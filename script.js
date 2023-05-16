
// Определение переменных

const addCommentForm = document.querySelector(".add-form");
const buttonElement = document.querySelector(".add-form-button");
const listOfComments = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const removeButton = document.querySelector('.remove-form-button');
const constWaitingComment = document.querySelector('.add-waiting');


// Данные о комментариях
let comments = [];
let isLoading = true;
let isWaitingComment = false;

// Получаем с сервера через API данные по комментариям с помощью GET
// Создаем функцию fetchAndRenderTasks для чистоты кода

const fetchAndRenderTasks = () => {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments", {
        method: "GET"
    })
        .then((responseStart) => {
            return responseStart.json();
        })
        .then((startJson) => {
            comments = startJson.comments;
            isWaitingComment = false;
            isLoading = false;

            renderComments();
        });
};

// Функция render
const renderComments = () => {
    // Лоадинг на загрузку комментариев на страницу
    if (isLoading) {
        document.getElementById('comments').innerHTML =
            'Пожалуйста подождите, загружаю комментарии...';
        constWaitingComment.classList.add(`hidden`);
        return;
    }

    listOfComments.innerHTML = comments.map((comment, index) => {
        return `<li id="comment" class="comment" data-index="${index}">
        <div class="comment-header">
          <div id="name">${comment.author.name}</div>
          <div id="date">${correctDate(comment.date)}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
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


    waitingAddComment();
    initLikeButtons();
    answerComment();
}

fetchAndRenderTasks();

// Функция лоадинг при добавлении комментариев в ленту
const waitingAddComment = () => {
    if (isWaitingComment) {
        constWaitingComment.classList.remove(`hidden`);
        addCommentForm.classList.add(`hidden`);
    } else {
        constWaitingComment.classList.add(`hidden`);
        addCommentForm.classList.remove(`hidden`);
    }
};

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

            commentInputElement.value = `START_QUOTE${comments[index].author.name}:
            \n${comments[index].text.replaceAll('<div class="comment-quote">', 'START_QUOTE').replaceAll('</div>', 'END_QUOTE')}END_QUOTE`;
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
renderComments();

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
checkAddButton();

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

    // Инициализация лоадинга при добавлении комментария
    isWaitingComment = true;
    renderComments();


    // Добавляем новый комментарий в ленту с помощью POST
    fetch(
        'https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments',
        {
            method: "POST",
            body: JSON.stringify({
                name: replaceValue(nameInputElement.value),
                text: replaceValue(commentInputElement.value)
                    .replaceAll('START_QUOTE', '<div class="comment-quote">')
                    .replaceAll('END_QUOTE', '</div>')
            }),
        })
        .then((response) => {
            return response.json()
        })
        .then(() => {
            return fetchAndRenderTasks();
        })

    // отчистка поля для ввода для новых комментариев
    nameInputElement.value = "";
    commentInputElement.value = "";
});



renderComments();
initLikeButtons();

renderComments();

const correctDate = date => {
    let year = (new Date(date)).getFullYear();
    let month = fixNumbers((new Date(date)).getMonth() + 1);
    let day = fixNumbers((new Date(date)).getDate());
    let hours = fixNumbers((new Date(date)).getHours());
    let minutes = fixNumbers((new Date(date)).getMinutes());

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}
const fixNumbers = number => String(number).length < 2 ? '0' + number : number;

renderComments();

removeButton.addEventListener('click', deleteLastComment);


