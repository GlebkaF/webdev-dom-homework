
// Определение переменных
const buttonElement = document.getElementById("add-form-button");
const listOfComments = document.getElementById("comments");
const nameInputElement = document.getElementById("add-form-name");
const commentInputElement = document.getElementById("add-form-text");
const removeButton = document.querySelector('.remove-form-button');


// Данные о комментариях
let comments = []

// Получаем с сервера через API данные по комментариям с помощью GET
fetch(
    'https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments',
    {
        method: "GET"
    }).then((responseStart) => {
        responseStart.json().then((startJson) => {
            comments = startJson.comments;
            renderComments();
        });
    });


// Функция render для исходных комментариев перенесена в js
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
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

    listOfComments.innerHTML = commentsHtml;

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

            commentInputElement.value = `START_QUOTE${comments[index].name}:
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

    // Добавляем новый комментарий в ленту с помощью POST
    fetch(
        'https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments',
        {
            method: "POST",
            body: JSON.stringify({
                name: replaceValue(nameInputElement.value),
                text: replaceValue(commentInputElement.value)
                    .replaceAll('START_QUOTE', '<div class="comment-quote">')
                    .replaceAll('END_QUOTE', '</div>'),
                date: correctDate,
            }),
        });


    // Инициируем обновление ленты через повторный GET
    fetch(
        'https://webdev-hw-api.vercel.app/api/v1/marina-obruch/comments',
        {
            method: "GET"
        }).then((response) => {
            response.json().then((responseData) => {
                const appComments = responseData.comments.map((comment) => {
                    return {
                        name: comment.author.name,
                        date: new Date(comment.date),
                        text: comment.text,
                        likes: comment.likes,
                        isLiked: false,
                    };
                })
                comments = appComments;
                renderComments();
            });
        });


    // отчистка поля для ввода для новых комментариев
    nameInputElement.value = "";
    commentInputElement.value = "";

    renderComments();
    initLikeButtons();

});
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

