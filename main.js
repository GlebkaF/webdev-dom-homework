import { getTodos, postTodo } from "./api.js";
import { renderComments } from "./renderComments.js";

const commentElement = document.getElementById("addComment");
const nameInputEl = document.getElementById("name-input");
const textInputEl = document.getElementById("text-input");
const disabledEl = document.getElementById("disabled");
const disabledComment = document.getElementById("disabled-add-comment");
const commentInput = document.getElementById("add-form")

const plus0 = (el) => {
    return el < 10 ? `0${el}` : el;
};

const commentDate = (currentDate) => {
    let date = plus0(currentDate.getDate());
    let month = plus0(currentDate.getMonth() + 1);
    let year = plus0(currentDate.getFullYear());
    let hour = plus0(currentDate.getHours());
    let minute = plus0(currentDate.getMinutes());
    return `${date}.${month}.${year} ${hour}:${minute}`
};
let currentDate = new Date();

function getComments() {

    getTodos().then((responseData) => {
        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: commentDate(new Date(comment.date)),
                text: comment.text,
                likes: comment.likes,
                likeCheck: false,
            };
        });

        comments = appComments;
        console.log(responseData);
        renderComments({ comments, commentAnswerElement, initMyLikeListeners });

    })
        .then(() => {
            disabledEl.disabled = false;
            disabledEl.textContent = "";
        });
};

disabledEl.disabled = true;
disabledEl.textContent = "Пожалуйта подождите, загружаю комментарии...";

getComments();

let comments = [
];

const initMyLikeListeners = ({ comments }) => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeElement of likeButtons) {
        likeElement.addEventListener("click", () => {
            const index = comments[likeElement.dataset.index];
            index.likeCheck ? --index.likes : ++index.likes;
            index.likeCheck = !index.likeCheck;
            renderComments({ comments, commentAnswerElement, initMyLikeListeners });
        });
    };
};

const commentAnswerElement = () => {
    const commentAnswers = document.querySelectorAll(".comment-body");

    for (const commentAnswer of commentAnswers) {
        commentAnswer.addEventListener("click", () => {
            const index = commentAnswer.dataset.body;
            textInputEl.value += `${index} \n`;
        })
    }
};



commentElement.addEventListener("click", () => {

    nameInputEl.classList.remove("error");
    if (nameInputEl.value === "") {
        nameInputEl.classList.add("error");
        return;
    };

    textInputEl.classList.remove("error");
    if (textInputEl.value === "") {
        textInputEl.classList.add("error");
        return;
    };

    commentInput.style.display = "none";
    disabledComment.textContent = "Комментарий добавляется..."


    postTodo({
        text: textInputEl.value,
        name: nameInputEl.value
    }).then((response) => {
        console.log(response);
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 400) {
            //этот вариант почему-то не работает 
            //(response.text.length <= 2 || response.name.length <= 2) 
            alert("Имя и комментарий должны быть не короче 3х символов")
            if (textInputEl.value.length < 3) {
                textInputEl.classList.add("error");
            }
            if (nameInputEl.value.length < 3) {
                nameInputEl.classList.add("error");
            }
            return Promise.reject(new Error("Имя и комментарий должны быть не короче 3х символов"));
        } else {
            alert("Сервер упал");
            return Promise.reject(new Error("Сервер упал"));
        };

    })
        .then(() => {
            return getComments();
        })
        .then(() => {
            commentInput.style.display = "flex";
            disabledComment.textContent = "";
            nameInputEl.value = "";
            textInputEl.value = "";
            renderComments({ comments, commentAnswerElement, initMyLikeListeners });
        }).catch((error) => {
            commentInput.style.display = "flex";
            disabledComment.textContent = "";
            console.warn(error);
        })
});