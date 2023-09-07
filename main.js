import { postComments, getComments } from "./api.js";
import { renderComments } from "./renderComments.js";


//        ОБЪЯВЛЕНИЕ ВСЕХ CONST
const buttonAddElement = document.getElementById("add-comment");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const buttonDelComment = document.getElementById("del-comment");
const addFormElement = document.querySelector('.add-form');


const myDate = new Date().toLocaleDateString().slice(0, 6) + new Date().toLocaleDateString().slice(-2);
const nowDate = myDate + ' ' + new Date().toLocaleTimeString().slice(0, -3);

const containerPreloader = document.getElementById('container-preloader');
const containerPreloaderPost = document.getElementById('container-preloader-post');


containerPreloader.textContent = 'Пожалуйста подождите, загружаю комментарии...';

//      GET

const fetchAndRenderComments = () => {
    getComments().then((responseData) => {

        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,

                date: new Date(comment.date),

                text: comment.text,
                like: comment.likes,

                isLiked: false,
                // isEdit: false,
                // isLoading: false,
            };
        });

        comments = appComments;

        renderComments({ comments, fetchAndRenderComments });
    })
}


// Функция для имитации запросов в API

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

//        ОБРАБОТЧИК на LIKES,  РЕАЛИЗАЦИЯ ЛАЙКОВ

export const initLikesButtonListeners = () => {

    const buttonElements = document.querySelectorAll(".like-button");

    for (const buttonElement of buttonElements) {
        buttonElement.addEventListener("click", (event) => {

            event.stopPropagation();

            // индекс номер объекта в массиве, получаем из data-атрибута кнопки на к-ую нажимаем
            const index = buttonElement.dataset.index;
            //обращаемся к свойству isLiked объекта, к-ый получили из массивы comments по индексу
            if (comments[index].isLiked) {
                comments[index].isLiked = false;
                comments[index].like--;
            } else {
                comments[index].isLiked = true;
                comments[index].like++;
            }

            renderComments({ comments, fetchAndRenderComments });
        })
    }

}


//        РЕДАКТИРОВАНИЕ КОММЕНТАРИЕВ

export const initEditButtonListeners = () => {
    const buttonEditElements = document.querySelectorAll(".edit-comment");

    for (const buttonEditElement of buttonEditElements) {
        buttonEditElement.addEventListener("click", (event) => {
            event.stopPropagation();

            const index = buttonEditElement.dataset.index;
            const textarea = document.getElementById(`textarea-${index}`);


            if (comments[index].isEdit) {
                comments[index].isEdit = false;
                comments[index].text = textarea.value;

                renderComments({ comments, fetchAndRenderComments })
            } else {
                comments[index].isEdit = true;
            }

            renderComments({ comments, fetchAndRenderComments });
        })
    }
}

//  Homework 2.11

//        Ответы на комменты

export const initEditCommentListeners = () => {
    const answerElements = document.querySelectorAll(".comment");


    for (const answerElement of answerElements) {

        answerElement.addEventListener('click', () => {

            const index = answerElement.dataset.index;

            const text = answerElement.dataset.text;
            const name = answerElement.dataset.name;

            // когда нажимаю = &{comment.text} должен появляться в commentInputElement (тексте добавления комментариев)
            // commentInputElement.value = `> ${text} \n ${name}, `;

            if (comments[index].isEdit === false) {

                commentInputElement.value = `BEGIN_QUOTE ${text} ${name} QUOTE_END`;

                renderComments({ comments, fetchAndRenderComments });

            }

        })
    }
}


// HOMEWORK 2.10

//        ФОРМИРОВАНИЕ НОВОГО СПИСКА КОММЕНТОВ

let comments = [];


// const renderComments = () => {
//     const commentsHtml = comments.map((comment, index) => {
//         return `<li class="comment" data-text="${comment.text}" data-name="${comment.name}" data-index="${index}"">
//       <div class="comment-header">
//         <div> ${comment.name} </div>
//         <div>${comment.date}</div>
//       </div>
//       <div class="comment-body">
//         ${comment.isEdit ? `<textarea class="edit-text" id="textarea-${index}">${comment.text}</textarea>` : `<div class="comment-text">
//           ${comment.text}
//         </div>`}
//       </div>
//       <div class="comment-footer">
//         <div class="likes">
//           <span class="likes-counter">${comment.like}</span>
//           <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}"></button>
//         </div>
//       </div>
//       <div class="add-form-row">
//       <button class="add-form-button edit-comment" data-index="${index}">${comment.isEdit ? 'Сохранить' : 'Редактировать'} </button>
//     </div>
//     </li>`
//     }).join(' ');

//     listElement.innerHTML = commentsHtml;

//     initLikesButtonListeners();
//     initEditButtonListeners();
//     initEditCommentListeners();
// }

fetchAndRenderComments();
renderComments({ comments, fetchAndRenderComments });
initLikesButtonListeners();
initEditButtonListeners();
initEditCommentListeners();



// HOMEWORK 2.9

//        ПРОВЕРКА НА ЗАПОЛНЕНИЕ ФОРМ + НЕАКТИВНАЯ КНОПКА

buttonAddElement.addEventListener('click', () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");
    buttonAddElement.removeAttribute('disabled', 'disabled');

    if (commentInputElement.value === '' || nameInputElement.value === '') {
        buttonAddElement.setAttribute('disabled', 'disabled');


        if (commentInputElement.value === '' && nameInputElement.value === '') {
            commentInputElement.classList.add("error");
            nameInputElement.classList.add("error");
            return;
        } if (nameInputElement.value === '') {
            nameInputElement.classList.add("error");
            buttonAddElement.setAttribute('disabled', '');
            return;
        } else {
            commentInputElement.classList.add("error");
            return;
        }
    }

    addFormElement.classList.add('form-none');

})


buttonAddElement.disabled = true;
buttonAddElement.textContent = 'Комментарий добавляется..';


const fetchPromise = () => {
    containerPreloaderPost.textContent = 'Добавляется комментарий...';

    postComments({
        name: nameInputElement.value,
        text: commentInputElement.value,
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверный запрос')
            }
            if (response.status === 500) {
                throw new Error('Ошибка сервера')
            }
            if (response.status === 201) {
                return response.json();
            }

        })
        .then((responseData) => {
            return fetchAndRenderComments();
        })
        .then((data) => {
              containerPreloaderPost.textContent = '';
              addFormElement.classList.remove('form-none');
            nameInputElement.value = '';
            commentInputElement.value = '';
        })
        .catch((error) => {

            containerPreloaderPost.textContent = '';
            addFormElement.classList.remove('form-none');

            console.warn(error);

            if (error.message === "Неверный запрос") {
                alert('Короткое имя или текст комментария, минимум 3 символа');
            }
            if (error.message === "Ошибка сервера") {
                alert('Сломался сервер , попробуйте позже');
                fetchPromise();
            }
            if (window.navigator.onLine === false) {
                alert('Проблемы с интернетом, проверьте подключение');
            }
        })
}

fetchPromise();
renderComments({ comments, fetchAndRenderComments });
initLikesButtonListeners();
initEditButtonListeners();





//        ДОБАВИТЬ С ПОМОЩЬЮ КЛАВИШИ ENTER + ВОЗВРАТ АКТИВНОСТИ КНОПКИ

document.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        document.getElementById("add-comment").click();
    }
});

nameInputElement.addEventListener('input', () => {

    buttonAddElement.disabled = false;
    buttonAddElement.style.backgroundColor = '';
    nameInputElement.classList.remove('error');

})

commentInputElement.addEventListener('input', () => {

    buttonAddElement.disabled = false;
    buttonAddElement.style.backgroundColor = '';
    commentInputElement.classList.remove('error');

})

//       РЕАЛИЗАЦИЯ - КНОПКА УДАЛИТЬ

buttonDelComment.addEventListener('click', () => {

    let lastComment = listElement.lastChild;
    lastComment.parentNode.removeChild(lastComment);

})


console.log("It works!");