"use strict";

const inputName = document.getElementById("add-form-name");
const inputText = document.getElementById("add-form-text");
// const buttonSend = document.querySelector(".add-form-button");
const listComments = document.querySelector(".comments");
const formString = `<input
type="text"
id="add-form-name"
class="add-form-name"
placeholder="Введите ваше имя"
/>
<textarea
type="textarea"
id="add-form-text"
class="add-form-text"
placeholder="Введите ваш коментарий"
rows="4"
wrap="soft"
maxlength="100"
></textarea>
<div class="add-form-row">
<button class="add-form-button">Написать</button>
</div>`;
// const formItem = document.querySelector(".add-form");

let PEOPLE = [];

const appPromise = () => {
    const formItem = document.querySelector(".add-form");
    return fetch("https://wedev-api.sky.pro/api/v1/:zaporozhtsevv/comments", {
        method: "GET",
    })
        .then((response) => {
            // formItem.innerHTML = `Загрузка...`;
            return response;
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            PEOPLE = responseData.comments;
            formItem.innerHTML = formString;
            renderPeople();
        });
};

const promiseSend = () => {
    const formItem = document.querySelector(".add-form");
    return fetch("https://wedev-api.sky.pro/api/v1/:zaporozhtsevv/comments", {
        method: "POST",
        body: JSON.stringify({
            text: inputText.value,
            name: inputName.value,
        }),
    })
        .then((response) => {
            formItem.innerHTML = `Загрузка`;
            return response;
        })
        .then((responseData) => {
            return fetch(
                "https://wedev-api.sky.pro/api/v1/:zaporozhtsevv/comments",
                {
                    method: "GET",
                }
            );
        })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            PEOPLE = responseData.comments;
            formItem.innerHTML = formString;
            renderPeople();
        });
};

const addDate = (value) => {
    let nowDate = new Date(value);
    let time = {
        hour: "numeric",
        minute: "numeric",
    };
    let date = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };

    return (
        nowDate.toLocaleDateString("ru", date) +
        " " +
        nowDate.toLocaleTimeString("ru", time)
    );
};

function addComment() {
    const buttonSend = document.querySelector(".add-form-button");
    buttonSend.addEventListener("click", (event) => {
        inputName.classList.remove("error");
        inputText.classList.remove("error");
        if (inputName.value.length === 0 && inputText.value.length === 0) {
            inputName.classList.add("error");
            return;
        }
        if (inputName.value.length === 0) {
            inputName.classList.add("error");
            return;
        }
        if (inputText.value.length === 0 && inputText.value.length === 0) {
            inputText.classList.add("error");
            return;
        }
        event.stopPropagation();

        promiseSend();
        // appPromise();
        // renderPeople();
        inputName.value = "";
        inputText.value = "";
    });
}

const addLike = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    likeButtons.forEach((likeButtonEl, index) => {
        likeButtonEl.addEventListener("click", () => {
            let likeEl = PEOPLE[index];
            console.log(likeEl);
            if (likeEl.isLiked === false) {
                likeEl.isLiked = true;
                likeEl.likes++;
                renderPeople();
            } else {
                likeEl.isLiked = false;
                likeEl.likes--;
                renderPeople();
            }
        });
    });
};

const getLike = (elementPeople) => {
    return elementPeople ? "like-button -active-like" : "like-button";
};

const takeCommentText = () => {
    const comentText = document.querySelectorAll(".comment-text");
    const textArea = document.getElementById("add-form-text");
    comentText.forEach((textElement, index) => {
        textElement.addEventListener("click", (event) => {
            event.stopPropagation();
            let textValue = textElement.textContent;
            return (textArea.value = `>${textValue} ${PEOPLE[index].name}  Ответ - `);
        });
    });
};

const delCommentElement = () => {
    const delColBut = document.querySelectorAll(".del-form-button");
    delColBut.forEach((delButton, id) => {
        delButton.addEventListener("click", (event) => {
            event.stopPropagation();

            renderPeople();
        });
    });
};

const checkError = () => {
    buttonSend.addEventListener("click", () => {
        inputName.classList.remove("error");
        inputText.classList.remove("error");
        if (inputName.value === "") {
            inputName.classList.add("error");
            return;
        }
        if (inputName.value === "") {
            inputText.classList.add("error");
            return;
        }
    });
};

const renderPeople = () => {
    let render = PEOPLE.map((el, i) => {
        return `<li class="comment">
    <div class="comment-header">
      <div>${el.author.name}</div>
      <div>${addDate(el.date)}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text"  data-index="${i}">
        ${el.text}
      </div>
    </div>
    <div class="comment-footer">
    <button class="del-form-button" data-index="${i}">Удалить</button>
      <div class="likes">
        <div>
          <span class="likes-counter">${el.likes}</span>
          <button class="${getLike(el.isLiked)}" ></button></div>
      </div>
    </div>
  </li>`;
    }).join("");

    listComments.innerHTML = render;
    addLike();

    takeCommentText();
    delCommentElement();
};
appPromise();
addComment();
renderPeople();
