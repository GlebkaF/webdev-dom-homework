

// Код тут
// Поиск элементов
const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("comments");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const commentElements = document.querySelectorAll(".comment");
const likeButtonsElement = document.querySelectorAll(".likes");
const preloader = document.querySelector('.preload');


// массив
let comments = [];

function fetchRender() {
    const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/alenka-s/comments", {
        method: "GET",
    });
    fetchPromise.then((response) => {
        const jsonPromise = response.json();

        jsonPromise.then((responseData) => {
            console.log(responseData);
            comments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    time: new Date(comment.date).toLocaleTimeString('sm', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }),
                    comment: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                };
            });
            let hidePreload = document.querySelector(".preload").style.display = "none";
            renderComments();
        });
    });
}
fetchRender();

buttonElement.addEventListener("click", () => {
    if (commentInputElement.value === "") {
        return;
    }

    buttonElement.disabled = true;
    buttonElement.textContent = 'Добавление...';
    const startAt = Date.now();
    console.log("Начинаем делать запрос");
   
        fetch("https://wedev-api.sky.pro/api/v1/alenka-s/comments", {
             method: "POST",
               body: JSON.stringify({
                   name: nameInputElement.value
                       .replaceAll("<", "&lt")
                       .replaceAll(">", "&gt")
                       .replaceAll("&", "&amp;")
                       .replaceAll('"', "&quot;"),
                   text: commentInputElement.value
                       .replaceAll("<", "&lt")
                       .replaceAll(">", "&gt")
                       .replaceAll("&", "&amp;")
                       .replaceAll('"', "&quot;"),
                   forceError: true,
               }),
           }) 
        //Ошибки       
        .then((response) => {
            console.log(response);
            if (response.status === 200) {
                return response.json();;
            }

            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            if (response.status === 400) {
                throw new Error('Плохой запрос');
            }
            return response.json();
        })
        .then((response) => {
            console.log("Время: " + (Date.now() - startAt));
            return response;
        })

        .then((response) => {
            console.log("Время: " + (Date.now() - startAt));
            return response;
        })

        .then(() => {
            fetchRender();
        })

        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
            nameInputElement.value = "";
            commentInputElement.value = "";
        })

        .catch((error) => {
            if (error.message === "Сервер сломался") {
                alert("Сервер сломался, попробуй позже");
                return;
            }

            if (error.message === "Плохой запрос") {
                alert("Ты сделал ошибку в запросе, исправь данные и попробуй снова");
                return;
            }

            alert('Произошла ошибка');
            console.warn(error);
            console.warn(error);
        })
        .finally(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = 'Написать';
        })

});



//Ответ на коммент
const replyToComment = () => {
    const commentBodys = document.querySelectorAll(".comment-body");
    for (const commentBody of commentBodys) {
        commentBody.addEventListener('click', () => {
            const oldName = commentBody.dataset.name;
            const oldComment = commentBody.dataset.text;
            console.log(oldName);
            console.log(oldComment);
            commentInputElement.value = `${oldName}: ${oldComment} `;
        })
    }
};

// Рендер
const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment">
        <div class="comment-header">
            <div>${comment.name}</div>
            <div>${comment.time}</div>
        </div>
        <div class="comment-body" data-text="${comment.comment}" data-name="${comment.name}">
            <div class="comment-text" data-index="${index}">
                ${comment.comment}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <div class="likes">
                    <span class="likes-counter">${comments[index].likes}</span>
                    <button data-index="${index}" class="like-button ${comment.isLiked ? "-active-like" : ""
            }"></button>
            </div>
        </div>
    </li> `;
    }).join('');

    listElement.innerHTML = commentsHtml;
    replyToComment();
    initEventListeners();
};
replyToComment();

//Лайк
const initEventListeners = () => {
    const likesElements = document.querySelectorAll(".like-button");
    for (const likesElement of likesElements) {
        likesElement.addEventListener("click", () => {
            const index = likesElement.dataset.index;

            console.log(comments[index].likes);
            if (comments[index].isLiked) {
                comments[index].isLiked = false;
                comments[index].likes--;
            } else {
                comments[index].isLiked = true;
                comments[index].likes++;
            }
            renderComments();

        });
    }
};

renderComments();
initEventListeners();
// Дата и время


let addTimeElement = new Date();
let year = addTimeElement.getFullYear().toString().slice(-2);
let minutes = addTimeElement.getMinutes() < 10 ? '0' + addTimeElement.getMinutes() : addTimeElement.getMinutes();
let hours = addTimeElement.getHours() < 10 ? '0' + addTimeElement.getHours() : addTimeElement.getHours();
let date = addTimeElement.getDate() < 10 ? '0' + addTimeElement.getDate() : addTimeElement.getDate();
let month = addTimeElement.getMonth() < 10 ? '0' + addTimeElement.getMonth() : addTimeElement.getMonth();

// Обработчик клика

buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value.trim() === "") {
        nameInputElement.classList.add("error");
        return;
    }
    if (commentInputElement.value.trim() === "") {
        commentInputElement.classList.add("error");
        return;
    }


    renderComments();
    initEventListeners();
    replyToComment();


});

console.log("It works!");
