
"use strict";

//  Поиск элментов
const nameInputElement = document.getElementById("name-input");
const comentInputElement = document.getElementById("coment-input");
const addButtonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const endDeleteButtonElement = document.getElementById("end-delete-button");
const addFormElement = document.getElementById("add-form");
const loadingElement = document.querySelector(".loading");



// Функция для даты
function takeDate(currentDate) {
    let day = currentDate.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let month = +currentDate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let year = currentDate.getFullYear();
    let arrYear = Array.from(String(year));
    year = arrYear[2] + arrYear[3];
    let hour = currentDate.getHours();
    if (hour < 10) {
        hour = '0' + hour;
    }
    let minute = currentDate.getMinutes();
    if (minute < 10) {
        minute = '0' + minute;
    }
    return `${day}.${month}.${year} ${hour}:${minute}`;
}
let comments = [];
function getArr() {
    return fetch("https://wedev-api.sky.pro/api/v1/:sofia-iakovleva/comments", {
        method: "GET"
    })
        // Подписываемся на успешное завершение запроса с помощью then
        .then((response) => {
            // Запускаем преобразовываем "сырые" данные от API в json формат и 
            //подписываемся на успешное завершение запроса с помощью then:
            return response.json();
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    eachDate: takeDate(new Date(comment.date)),
                    like: comment.likes,
                    currentLike: false,
                    classLike: 'like-button -no-active-like',
                    isEdit: false,
                };
            });
            comments = appComments;
            return renderComments()
        })
        .then((data) => {
            document.body.classList.add('loaded');
        });
}

getArr();



// // Создание массива
// const comments = [
//   {
//     name: "Глеб Фокин",
//     text: "Это будет первый комментарий на этой странице",
//     eachDate: "12.02.22 12:18",
//     like: 3,
//     currentLike: false,
//     classLike: 'like-button -no-active-like',
//     isEdit: false,
//   },
//   {
//     name: "Варвара Н.",
//     text: "Мне нравится как оформлена эта страница! ❤",
//     eachDate: "13.02.22 19:22",
//     like: 75,
//     currentLike: false,
//     classLike: 'like-button -no-active-like',
//     isEdit: false,
//   },
// ];

// Добавление возможности редактирования на каждый комент
const initiateRedact = () => {
    const redactButtons = document.querySelectorAll(".redact-button");
    for (const redactButton of redactButtons) {
        redactButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = redactButton.dataset.index;
            comments[index].isEdit = !comments[index].isEdit;
            renderComments();
        });

    }
    const saveButtons = document.querySelectorAll(".save-button");
    for (const saveButton of saveButtons) {
        saveButton.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = saveButton.dataset.index;
            comments[index].isEdit = !comments[index].isEdit;
            comments[index].text = saveButton.closest('.comment').querySelector('textarea').value
            renderComments();
        });

    }

};
// Добавление кликабельностm лайка и счётчика лайков
function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
const initlikeButtonsListeners = () => {
    const likeButtonsElements = document.querySelectorAll(".like-button");
    for (const likeButtonElement of likeButtonsElements) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            comments[index].currentLike = !comments[index].currentLike;
            likeButtonElement.classList.add('-loading-like');
            delay(2000).then(() => {
                if (comments[index].currentLike) {
                    ++comments[index].like;
                    comments[index].classLike = 'like-button -active-like';
                } else {
                    --comments[index].like;
                    comments[index].classLike = 'like-button -no-active-like';
                }
                renderComments();
            })
                .then((data) => {
                    likeButtonElement.classList.remove('-loading-like');
                });
        });
    }
};

//Функция редактирования коментов
const redactComments = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentElement of commentsElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            console.log(comments[index].text);
            comentInputElement.value = `QUOTE_BEGIN${comments[index].name}:\n${comments[index].text}QUOTE_END`;

        })
    }
}
redactComments();

// Рендерим из массива разметку
const renderComments = () => {
    const commentsHTML = comments.map((comment, index) => {
        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.eachDate}</div>
        </div>
        <div class="comment-body">
          <div class="${comment.isEdit ? 'display-none' : 'comment-text'}">
            ${comment.text}
          </div>
        </div>
        <div>
        <textarea type="textarea" class="${comment.isEdit ? 'add-form-text' : 'display-none'}" rows="4">${comment.text}</textarea>
        </div>
        <div class="comment-footer">
          <div class="redact">
            <button class="${comment.isEdit ? 'display-none' : 'redact-button'}" data-index="${index}">Редактировать</button>
          </div>    
          <div class="redact">
            <button class="${comment.isEdit ? 'save-button' : 'display-none'}" data-index="${index}">Сохранить</button>
          </div>      
          <div class="likes">
            <span class="likes-counter">${comment.like}</span>
            <button class="${comment.classLike}" data-index="${index}"></button>
          </div>
        </div>
      </li>`;
    }).join('');
    listElement.innerHTML = commentsHTML;
    initlikeButtonsListeners();
    redactComments();
    initiateRedact();
}

renderComments();
loadingElement.classList.add("display-none");

// Добавить обработчик клика для добавления элемента
function clickButton() {
    addButtonElement.addEventListener("click", () => {

        //Добавляем валидацию
        if ((nameInputElement.value === "") || (comentInputElement.value === "")) {
            return;
        }
        addFormElement.classList.add("display-none");
        loadingElement.classList.remove("display-none");
        //Добавляем данные для нового комента
        // comments.push({
        //   name: nameInputElement.value
        //     .replaceAll("&", "&amp;")
        //     .replaceAll("<", "&lt;")
        //     .replaceAll(">", "&gt;")
        //     .replaceAll('"', "&quot;"),
        //   text: comentInputElement.value
        //     .replaceAll("&", "&amp;")
        //     .replaceAll("<", "&lt;")
        //     .replaceAll(">", "&gt;")
        //     .replaceAll('"', "&quot;")
        //     .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        //     .replaceAll("QUOTE_END", "</div><br><br>,"),
        //   eachDate: takeDate(new Date),
        //   like: 0,
        //   currentLike: false,
        //   classLike: 'like-button -no-active-like',
        //   isEdit: false,
        // });
        let answer = "Кажется, у вас сломался интернет, попробуйте позже";
        fetch("https://wedev-api.sky.pro/api/v1/:sofia-iakovleva/comments", {
            method: "POST",
            body: JSON.stringify({
                name: nameInputElement.value
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;"),
                text: comentInputElement.value
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;")
                    .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
                    .replaceAll("QUOTE_END", "</div><br><br>,"),
                eachDate: takeDate(new Date),
                likes: 0,
                currentLike: false,
                classLike: 'like-button -no-active-like',
                isEdit: false,
                forceError: true,
            }),
        })
            // Подписываемся на успешное завершение запроса с помощью then
            .then((response) => {
                if (response.status === 500) {
                    throw new Error("Сервер сломался");
                } else if (response.status === 400) {
                    throw new Error("Плохой запрос");
                } else {
                    return response.json();
                }

            })
            .then(() => {
                return getArr();
            })
            .then(() => {
                addFormElement.classList.remove("display-none");
                loadingElement.classList.add("display-none");
                nameInputElement.value = "";
                comentInputElement.value = "";
            })
            .catch((error) => {
                if (error.message === "Сервер сломался") {
                    alert("Сервер сломался, попробуйте позже");
                    clickButton()
                } else if (error.message === "Плохой запрос") {
                    alert("Имя и комментарий должны быть не короче 3 символов");
                } else {
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                    console.log(error);
                }
                addFormElement.classList.remove("display-none");
                loadingElement.classList.add("display-none");
            });

        renderComments();

    })
};
clickButton();


// Добавление обработчика ввода для input
addEventListener("input", () => {
    addButtonElement.classList.add("error");
    if ((nameInputElement.value !== "") && (comentInputElement.value !== "")) {
        addButtonElement.classList.remove("error");
    }
});

// Добавление элемента в список по нажатию Enter
document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addButtonElement.click();
    }
});

// Удаление последнего комментари
endDeleteButtonElement.addEventListener("click", () => {

    const lastElement = listElement.lastElementChild;
    lastElement.remove();
});

console.log("It works!");
