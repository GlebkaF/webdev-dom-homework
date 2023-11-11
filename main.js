import { getCommentsApi, postCommentsApi, token } from "./api.js";
import { renderLogin } from "./loginAuth.js";
import { renderAddForm } from "./renderAddForm.js";
import { renderComments } from "./renderComments.js";
import { renderReg } from "./renderReg.js";
import { renderText } from "./renderText.js";





const listElement = document.getElementById("list");
const commentElement = document.getElementById("add-comment");
const loaderElement = document.getElementById("loader");
let commentsArray = [];

export const getApi = () => {
    listElement.classList.add("hidden");
    loaderElement.classList.remove("hidden");
    getCommentsApi()
        .then((responseData) => {
            commentsArray = responseData.comments.map((user) => {
                return {
                    name: user.author.name,
                    date: new Date(user.date).toLocaleString(),
                    comment: user.text,
                    like: user.likes,
                    isLike: false
                };
            });
            renderAll();
        })
        .then(() => {
            listElement.classList.remove("hidden");
            loaderElement.classList.add("hidden");
        })
        .catch((error) => {
            console.log(error.message);
            if (error.message === "Failed to fetch") {
                alert("Нет подключения к сети,попробуйте позже");
            } else {
                alert(error.message);
            }
        });
};
getApi();


const commentClick = () => {
    const userComments = document.querySelectorAll(".comment");
    for (const userComment of userComments) {
        const addTextInTextArea = () => {
            const commentBodyText = userComment.querySelector(".comment-body")
                .innerText;
            const commentNameText = userComment.querySelector(".comment-name")
                .innerText;
            commentElement.value = `> ${commentBodyText} \n ${commentNameText},`;
            commentElement.focus();
        };
        userComment.addEventListener("click", addTextInTextArea);
    }
};

const likeButtonClick = () => {
    const userLikes = document.querySelectorAll(".like-button");
    for (const userLike of userLikes) {
        userLike.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = userLike.dataset.index;
            if (commentsArray[index].isLike === false) {
                commentsArray[index].like++;
                commentsArray[index].isLike = true;
            } else {
                commentsArray[index].like--;
                commentsArray[index].isLike = false;
            }

            renderComments({ commentsArray, listElement, likeButtonClick, commentClick });
        });
    }
};
export const renderAll = (state) => {
    if (token) {
        renderComments({commentsArray, listElement, likeButtonClick, commentClick})
        renderAddForm()
    } else {
        if (!state) {
        renderComments({commentsArray, listElement, likeButtonClick, commentClick})
        renderText();
    } else if (state === 'auth') {
        renderLogin();
        renderComments({commentsArray, listElement, likeButtonClick, commentClick, state:'auth'})
    } else if (state === 'reg') {
        renderReg();
        renderComments({commentsArray, listElement, likeButtonClick, commentClick, state:'reg'})
    }
}
}
renderAll();


let date = new Date();
let m = date.getMonth() + 1;
if (m < 10) {
    m = "0" + m;
}
let y = date.getFullYear() % 100;
if (y < 10) {
    y = "0" + y;
}
let minu = date.getMinutes();
if (minu < 10) {
    minu = "0" + minu;
}
let myDate =
    date.getDate() + "." + m + "." + y + " " + date.getHours() + ":" + minu;

