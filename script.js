"use strict";

const addFormButton = document.querySelector(".add-form-button");
const addFormName = document.querySelector(".add-form-name");
const addFormText = document.querySelector(".add-form-text");
const commentsList = document.querySelector(".comments");
const form = document.querySelector(".add-form");
const removeLastCommentButton = document.querySelector(".remove-last-comment-button");

let comments = [ //ммассив с комментариями 
    {
        author: 'Глеб Фокин',
        date: '12.02.22 12:18',
        text: 'Это будет первый комментарий на этой странице',
        likes: 3
    },
    {
        author: 'Варвара Н.',
        date: '13.02.22 19:22',
        text: 'Мне нравится как оформлена эта страница! ❤',
        likes: 74
    },
    // ...
];

//подключение и рендер комментариев из API
// const fetchPromise = fetch(
//     "https://webdev-hw-api.vercel.app/api/v1/artyom-kovalchuk/comments",
//     {
//         method: "GET",
//     }
// );

// fetchPromise.then((response) => {
//     console.log(response);

//     const jsonPromise = response.json();

//     jsonPromise.then((responseData) => {
//         console.log(responseData);

//         const appComments = responseData.comments.map((comment) => {
//             return {
//                 name: comment.author.name,
//                 date: new Date(comment.date),
//                 text: comment.text,
//                 likes: comment.likes,
//                 isliked: false,
//             };
//         });

//         comments = appComments;
//         renderComments(comments);
//     });
// });


//рендер комментариев, вызываем функцию ответа на комментарии, вызываем функцию кнопки лайка
function renderComments(comments) {
    // очищаем список комментариев перед добавлением новых
    commentsList.innerHTML = '';

    // создаем новый массив с разметкой комментариев
    const commentItems = comments
        .map(comment => `
          <li class="comment">
            <div class="comment-header">
              <div>${comment.author}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
              </div>
            </div>
          </li>`
        );

    const commentsHTML = commentItems
        .join('');

    // добавляем новый список комментариев на страницу
    commentsList.insertAdjacentHTML('beforeend', commentsHTML);
    
    addCommentReplyEvent();

    setupLikeButtons();


}

renderComments(comments);


//добавляем новый комментарий в массив
function addComment() {
    // получаем значения из формы ввода (тут же ставим защиту от XSS)
    const author = addFormName.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
    const text = addFormText.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
    const date = new Date().toLocaleString();
    const likes = 0;

    // создаём новый объект комментария, чтобы добавить его в уже существующий
    const newComment = {
        author,
        text,
        date,
        likes,
    };

    comments.push(newComment);

    renderComments(comments);
}


//кнопка добавления комментария
addFormButton.addEventListener("click", (event) => { // находим кнопку "Написать", добавляем новый комментарий
    event.preventDefault();

    const name = addFormName.value.trim();
    const text = addFormText.value.trim();

    if (!name || !text) {
        alert("Необходимо указать имя и комментарий!");
        return;
    }

    const date = new Date().toLocaleString();

    addComment()

    addFormName.value = "";
    addFormText.value = "";
});

validateForm();


//удаление последнего комментария
function removeLastComment() {
    const comments = commentsList.querySelectorAll(".comment");
    if (comments.length > 0) {
        comments[comments.length - 1].remove();
    }
}

removeLastCommentButton.addEventListener("click", removeLastComment);


// нажатие enter 
addFormText.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !addFormButton.disabled) {
        addFormButton.click();
    }
});


//кнопка лайка
function setupLikeButtons() {
    const likesButton = document.querySelectorAll('.like-button');

    likesButton.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            //проверяем, что кликнули по кнопке лайка
            if (event.target.classList.contains('like-button')) {
                const likeButton = event.target;
                const likesCounter = likeButton.previousElementSibling; //находим счетчик лайков
                let likesCount = parseInt(likesCounter.textContent); //получаем текущее количество лайков

                if (likeButton.classList.contains('-active-like')) {
                    //убираем лайк, также запоминаем состояние лайка, чтобы оно не сбрасывалось при обновлении массива
                    likesCount--;
                    likesCounter.textContent = likesCount;
                    likeButton.classList.remove('-active-like');
                } else {
                    //ставим лайк, также запоминаем состояние лайка, чтобы оно не сбрасывалось при обновлении массива
                    likesCount++;
                    likesCounter.textContent = likesCount;
                    likeButton.classList.add('-active-like');
                    comments[button.dataset.index].isLiked = true;
                }
            }
        });
    });
}


//функция ответа на комментарии
function addCommentReplyEvent() {
    const commentToReply = document.querySelectorAll('.comment');
    commentToReply.forEach(comment => {
        comment.addEventListener('click', () => {
            const author = comment.querySelector('.comment-header div:first-child').textContent;
            const text = comment.querySelector('.comment-text').textContent;
            addFormText.value = `@${author} \n\n > ${text}, `;
            addFormText.focus();
        });
    });
}



// disabled
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const submitButton = document.querySelector('.add-form-button');

function handleInput() {
    const nameValue = nameInput.value.trim();
    const textValue = textInput.value.trim();

    if (nameValue !== '' && textValue !== '') {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('disabled');
    }
}

nameInput.addEventListener('input', handleInput); // проверка заполнености двух полей
textInput.addEventListener('input', handleInput);


// разблокирует кнопку, если поля не пустые
function validateForm() {
    const nameValue = addFormName.value.trim();
    const textValue = addFormText.value.trim();
    const isValid = nameValue !== "" && textValue !== "";
    addFormButton.disabled = !isValid;
    addFormButton.classList.toggle("disabled", !isValid);
}
