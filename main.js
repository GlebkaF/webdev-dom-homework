import { getCommentsApi, postCommentsApi } from "./api.js";
import { renderComments } from "./renderComments.js";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameElement = document.getElementById("add-name");
const commentElement = document.getElementById("add-comment");
const loaderElement = document.getElementById("loader");
let commentsArray = [];
const getApi = () => {
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
            renderComments({ commentsArray, listElement, likeButtonClick, commentClick });
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

renderComments({ commentsArray, listElement, likeButtonClick, commentClick });

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

buttonElement.addEventListener("click", () => {
    nameElement.classList.remove("error");

    if (nameElement.value === "") {
        nameElement.classList.add("error");
        return;
    }

    commentElement.classList.remove("error");

    if (commentElement.value === "") {
        commentElement.classList.add("error");
        return;
    }
    buttonElement.disabled = true;
    buttonElement.textContent = "Элемент добавляется...";

    postCommentsApi({ nameElement, commentElement })
        .then((responseData) => {
            nameElement.value = "";
            commentElement.value = "";
            return getApi();


        })
        .catch((error) => {
            console.log(error.message);
            if (error.message === "Failed to fetch") {
                alert("Нет подключения к сети,попробуйте позже");
            } else {
                alert(error.message);
            }
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
        });
    buttonElement.disabled = false;
    buttonElement.textContent = "Написать";
});