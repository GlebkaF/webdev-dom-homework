"use strict";

import { getComments, postComment } from "./api.js";
import { sanitizeHtml } from "./helper.js";

const btnAddCommentElement = document.querySelector(".add-form-button");
const listElement = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const textInputElement = document.querySelector(".add-form-text");
const btnDelCommentElement = document.querySelector(".delete-form-button");
const addFormElement = document.querySelector(".add-form");
const loadingCommentElement = document.querySelector(".loading-comment");

let comments = [];

const getCommentsFetch = () => {

    loadingCommentElement.textContent = "Загрузка комментариев"

    getComments()
        .then((responseDate) => {
            const appComments = responseDate.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    text: comment.text,
                    date: currentDate(comment.date),
                    likesCounter: comment.likes,
                    isLiked: false,
                    isLikeLoading: false,
                    isEdited: false,
                };
            });

            comments = appComments;

            addFormElement.classList.remove("displayHidden");
            loadingCommentElement.classList.add("displayHidden");

            renderComments();

        })
        .catch((error) => {
            alert(error.message);
            console.warn(error);
        })
}


document.addEventListener("input", () => {

    if (
        nameInputElement.value.trim() !== '' &&
        textInputElement.value.trim() !== ''
    ) {

        btnAddCommentElement.disabled = false;

    } else {

        btnAddCommentElement.disabled = true;
    }
})

const stopEmptyInput = () => {
    const textareaElements = document.querySelectorAll(".edit-form-text");

    for (const textareaElement of textareaElements) {

        textareaElement.addEventListener('input', () => {

            const btnEditElements = document.querySelectorAll(".edit-button")
            const index = textareaElement.dataset.index;

            if (textareaElement.value.trim() === "") {

                return btnEditElements[index].disabled = true;

            } else {

                return btnEditElements[index].disabled = false;
            }
        })
    }
}

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}

const initAddLikes = () => {
    const likesButtonElements = document.querySelectorAll(".like-button");

    for (const likesButtonElement of likesButtonElements) {
        likesButtonElement.addEventListener('click', () => {
            const index = likesButtonElement.dataset.index;
            comments[index].isLikeLoading = true;

            delay(2000).then(() => {

                comments[index].likesCounter = comments[index].isLiked
                    ? comments[index].likesCounter - 1
                    : comments[index].likesCounter + 1;
                comments[index].isLiked = !comments[index].isLiked;
                comments[index].isLikeLoading = false;
                renderComments();
            });
            event.stopPropagation();
            renderComments();
        })
    }
}

const initEdit = () => {
    const editButtonElements = document.querySelectorAll(".edit-button");

    for (const editButtonElement of editButtonElements) {
        editButtonElement.addEventListener("click", event  => {

            const index = editButtonElement.dataset.index;
            const textEditElement = document.querySelector(".edit-form-text");

            if (!comments[index].isEdited) {
                comments[index].isEdited = true;
            } else {
                comments[index].isEdited = false;
                comments[index].text = sanitizeHtml(textEditElement.value);
            }

            event.stopPropagation();
            renderComments();
        })
    }
}


const responsToComment = () => {
    const commentElements = document.querySelectorAll(".comment");

    for (const commentElement of commentElements) {

        commentElement.addEventListener('click', () => {

            const index = commentElement.dataset.index;

            const text = `QUOTE_BEGIN${comments[index].name}:
      ${comments[index].text}QUOTE_END`;
            textInputElement.value = text;
        })
    }
};

const stopPropagationForEditInput = () => {
    const inputEditElements = document.querySelectorAll(".edit-form-text");

    for (const inputEditElement of inputEditElements) {

        inputEditElement.addEventListener("click", () => {

            event.stopPropagation();
        })
    }
};

// const sanitizeHtml = (htmlString) => {
//     return htmlString.replaceAll("&", "&amp;")
//         .replaceAll("<", "&lt;")
//         .replaceAll(">", "&gt;")
//         .replaceAll('"', "&quot;");
// };

const quoteReplace = (quoteText) => {
    return quoteText.replaceAll("QUOTE_BEGIN", "<div class='quote'>")
        .replaceAll("QUOTE_END", "</div>");
};

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {

        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div class="comment-date">${comment.date}</div>
        </div>
        <div class="comment-body">
          ${comment.isEdited ?
                `<textarea type="textarea" class="edit-form-text" data-index="${index}" value="">${comment.text}</textarea>` :
                `<div class="comment-text">${quoteReplace(comment.text)}</div>`}
        </div>
          <button class="edit-button" data-index="${index}">${comment.isEdited ? `Coхранить` : `Редактировать`}</button>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button class="like-button ${comment.isLiked ? `-active-like` : ``} ${comment.isLikeLoading ? `-loading-like` : ``}" data-index="${index}"></button>
          </div>
        </div>
      </li>`

    }).join('');

    listElement.innerHTML = commentsHtml;

    initAddLikes();
    initEdit();
    responsToComment();
    stopPropagationForEditInput();
    stopEmptyInput();
};


function currentDate(commentDate) {

    let date = new Date(commentDate);
    const addZeroBefore = (time) => time < 10 ? time = "0" + time : time;

    let day = addZeroBefore(date.getDate());
    let month = addZeroBefore(date.getMonth() + 1);
    let yaer = date.getFullYear().toString().slice(2);
    let hour = addZeroBefore(date.getHours());
    let minute = addZeroBefore(date.getMinutes());

    let dateComment = `${day}.${month}.${yaer} ${hour}:${minute}`;

    return dateComment;

}

function addComment() {
    addFormElement.classList.add("displayHidden");
    loadingCommentElement.classList.remove("displayHidden");

    // const postComment = fetch("https://wedev-api.sky.pro/api/v1/tanya-zakharova/comments", {
    //     method: "POST",
    //     body: JSON.stringify({
    //         text: sanitizeHtml(textInputElement.value),
    //         name: sanitizeHtml(nameInputElement.value),
    //         forceError: true,
    //     })
    // })
    //     .then((response) => {
    //         if (response.status === 500) {
    //             throw new Error(`Ошибка сервера`);
    //         } else if (response.status === 400) {
    //             throw new Error(`Имя и комментарий должны быть не короче 3х символов`);
    //         } else {
    //             return response.json();
    //         }
    //     })
    postComment({ text: textInputElement.value, name: nameInputElement.value })
        .then((responseDate) => {

            getCommentsFetch();

        })
        .then(() => {
            nameInputElement.value = '';
            textInputElement.value = '';

            btnAddCommentElement.disabled = true;
        })
        .catch((error) => {
            addFormElement.classList.remove("displayHidden");
            loadingCommentElement.classList.add("displayHidden");

            console.warn(error);

            if (error.message === "Ошибка сервера") {

                addComment();

            } else if (error.message === "Имя и комментарий должны быть не короче 3х символов") {

                alert(error.message);

            } else {

                alert(`Кажется что-то пошло не так, попробуй позже`);

            }
        })

}

document.addEventListener("keyup", (event) => {

    if (
        event.code === 'Enter' &&
        nameInputElement.value.trim() !== '' &&
        textInputElement.value.trim() !== '') {

        addComment();
    }
})

btnAddCommentElement.addEventListener("click", addComment);

btnDelCommentElement.addEventListener("click", () => {

    comments.pop();

    renderComments();

})

getCommentsFetch();