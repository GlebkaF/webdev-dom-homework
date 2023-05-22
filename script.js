
// Определение переменных

const addCommentForm = document.querySelector(".add-form");
const buttonElement = document.querySelector(".add-form-button");
const listOfComments = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const removeButton = document.querySelector('.remove-form-button');
const constWaitingComment = document.querySelector('.add-waiting');


// Данные о комментариях и маркеры для лоадингов/загрузки
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
        })
        .catch((error) => {
            alert("Что-то пошло не так, попробуйте позднее");
            console.warn(error);
        })
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

    // Рендер
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
            <button data-index="${index}" id="like-button" class="like-button ${comment.isLiked ? '-active-like' : ''} ${comment.isLikeLoading ? '-loading-like' : ''}"></button>
          </div>
        </div>
      </li>`
    }).join("");


    waitingAddComment();
    initLikeButtons();
    answerComment();
    checkAddButton();
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

            let comment = comments[likeButtonsElement.dataset.index];
            comment.isLikeLoading = true;

            renderComments();

            // Инициализация задержки при обработке лайка на комментарий
            delay(2000).then(() => {
                if (comment.isLiked) {
                    comment.likes = comment.likes - 1;
                } else {
                    comment.likes = comment.likes + 1;
                }

                comment.isLiked = !comment.isLiked;
                comment.isLikeLoading = false;
                renderComments();
            });
        });
    }
}

// Функция по задержке лайка на комментарий
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
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
            buttonElement.disabled = false;
            return;
        } else {
            buttonElement.disabled = true;
            return;
        }
    });

    commentInputElement.addEventListener('input', () => {
        if (commentInputElement.value) {
            buttonElement.disabled = false;
            return;
        } else {
            buttonElement.disabled = true;
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

    // Добавляем новый комментарий в ленту с помощью POST и функции fetchAndRenderTasks()
    function postComment() {
        fetch('https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments', {
            method: "POST",
            body: JSON.stringify({
                forceError: true,
                name: replaceValue(nameInputElement.value),
                text: replaceValue(commentInputElement.value)
                    .replaceAll('START_QUOTE', '<div class="comment-quote">')
                    .replaceAll('END_QUOTE', '</div>')
            })
        })
            .then((response) => {
                if (response.status === 201) { // Если всё работает
                    return response.json();
                } else if (response.status === 400) { // Если введено меньше 3х символов
                    throw new Error("Ошибка при вводе имени");
                }
                else { // Если падает API
                    throw new Error("Сервер сломался");
                }
            })
            .then(() => {
                // отчистка поля для ввода для новых комментариев
                nameInputElement.value = "";
                commentInputElement.value = "";
                return fetchAndRenderTasks();
            })
            .catch((error) => {
                if (error.message === "Ошибка при вводе имени") {
                    alert("Имя и комментарий должны быть не короче 3 символов");
                    return fetchAndRenderTasks();

                } else if (error.message === "Сервер сломался") {
                    // postComment(); // // Включить для доп.задания (ошибка будет обработана повторно без доп.ввода)

                    // включена, когда отключена функция postComment
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                    return fetchAndRenderTasks();
                }

                alert("Что-то пошло не так, попробуйте позднее"); // Выводится сообщение, если нет интернета (ключ "error.message" не назначен)
                console.log(error);
            })
    }
    postComment();
});

renderComments();
initLikeButtons();

renderComments();

// Формат вывода даты в комментарии
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


