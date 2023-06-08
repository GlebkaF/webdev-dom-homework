import { comments, deleteComment } from "./api.js";
import { postComments } from "./api.js";
import { renderLoginComponent } from "./loginComponent.js";


function getDate(currentDate = new Date()) {
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear().toString().substr(-2);
    let hour = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    if (month < 10) {
        month = "0" + month;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (hour < 10) {
        hour = "0" + hour;
    }
    if (day < 10) {
        day = "0" + day;
    }

    return day + '.' + month + '.' + year + ' ' + hour + ':' + minutes;
};

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

const initLikeButtonListeners = () => {
    const likeButtonElements = document.querySelectorAll('.like-button');
    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener('click', (e) => {
            likeButtonElement.disabled = true;
            likeButtonElement.classList.add('-loading-like');
            e.stopPropagation();
            const index = likeButtonElement.dataset.index;

            delay(2000).then(() => {
                if (comments[index].isLiked === false) {
                    comments[index].likes++;
                    comments[index].isLiked = true;
                }

                else {
                    comments[index].likes = --comments[index].likes;
                    comments[index].isLiked = false;
                }
                renderApp(commentsListElement, getListComments, initLikeButtonListeners, initDisabledButton);
            });
        });
    };
};

const initDisabledButton = () => {
    const buttonElement = document.getElementById('add-button');
    const nameInputElement = document.getElementById('nameInput');
    const textInputElement = document.getElementById('textInput');
    buttonElement.disabled = true;
    buttonElement.classList.add('disabledButton');
    buttonElement.classList.remove('add-form-button:hover');

    nameInputElement.addEventListener('input', () => {
        buttonElement.disabled = false;
        buttonElement.classList.remove('disabledButton');
        if (nameInputElement.value === '' || textInputElement.value === '') {
            buttonElement.disabled = true;
            buttonElement.classList.add('disabledButton');
        }
        return;
    });

    textInputElement.addEventListener('input', () => {
        buttonElement.disabled = false;
        buttonElement.classList.remove('disabledButton');
        if (nameInputElement.value === '' || textInputElement.value === '' || textInputElement.value.endsWith('QUOTE_END ')) {
            buttonElement.disabled = true;
            buttonElement.classList.add('disabledButton');
        }
        return;
    });

    textInputElement.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buttonElement.click();
        }
    });
};

// const initDeleteButton = (token) => {
//     const deleteButtons = document.querySelectorAll('.delete-button');
//     for (const deleteButton of deleteButtons) {
//         deleteButton.addEventListener('click', (event) => {
//             event.stopPropagation();

//             const id = deleteButton.dataset.id;
//             deleteComment({ token, id })
//                 .then(() => {
//                     return renderApp(commentsListElement, getListComments, token, isRegistered, user, initLikeButtonListeners, initDisabledButton, initDeleteButton)
//                 })
//         })
//     }
// };

const toggleForm = (isLoading) => {
    if (isLoading) {
        document.querySelector('.add-form').style.display = 'none';
        document.querySelector('.downloading').style.display = 'flex';
    }
    else {
        document.querySelector('.add-form').style.display = 'flex';
        document.querySelector('.downloading').style.display = 'none';
    }
};

const renderApp = (commentsListElement, getListComments, token, isRegistered, user) => {
    const appElement = document.querySelector('.container');
    const formEl = document.getElementById('newCommentForm');


    const commentsHtml = comments
        .map((comment, index) => getListComments(comment, index, getDate, isRegistered))
        .join('');
    commentsListElement.innerHTML = commentsHtml;

    if (!token) {
        const formHtml = `
        <div class="add-form">
            Чтобы оставлять комментарии, <button class="button" id="register-link">авторизуйтесь</button>
        </div>`;

        formEl.innerHTML = formHtml;

        document.getElementById('register-link').addEventListener('click', () => {
            renderLoginComponent({ appElement, token, commentsListElement, getListComments });
        });
        return;
    };

    const formHtml = `
        <div class="add-form">
            <input type="text" class="add-form-name" placeholder="Введите ваше имя" id="nameInput" />
            <textarea type="textarea" class="add-form-text" placeholder="Введите ваш коментарий" rows="4"
            id="textInput"></textarea>
            <div class="add-form-row">
            <button class="add-form-button" id="add-button">Написать</button>
        </div>`;

    formEl.innerHTML = formHtml;

    const textInputElement = document.getElementById('textInput');
    const nameInputElement = document.getElementById('nameInput');
    const buttonElement = document.getElementById('add-button');
    // const commentsListElement = document.getElementById('commentsList');

    isRegistered
        ? (nameInputElement.value = user.user.name, nameInputElement.disabled = true)
        : '';

    initLikeButtonListeners();
    initDisabledButton();
    // initDeleteButton();

    buttonElement.addEventListener('click', () => {
        toggleForm(true);

        postComments({ token, text: textInputElement.value, name: nameInputElement.value })
            .then(() => {
                return renderApp(commentsListElement, getListComments, token, isRegistered, user, initLikeButtonListeners, initDisabledButton, initDeleteButton)
            })
            .then(() => {
                toggleForm(false);
                nameInputElement.value = '';
                textInputElement.value = '';
            });
    });
    return;
};

export { renderApp };