
import { getAllCommentsEdit, newComment } from "./api.js";
import { now } from "./data.js";
import { renderComments } from "./render.js";

const renderComment = () => {
    renderComments(comments, renderCommentLikeClick);
}

const listElement = document.getElementById("list")
const buttonElement = document.getElementById("add-button");
const nameElement = document.getElementById("add-name");
const textElement = document.getElementById("add-text");
const likeButtonElements = document.querySelectorAll(".like-button");
const deleteButtonElement = document.querySelector(".delete-button");
const invisibleDiv = document.getElementById('invizDiv');
const invisibleDivHead = document.getElementById('invizDivHeader');
const addHidden = document.getElementById('add-hidden');

invisibleDiv.classList.add('hidden');
const getAllComments = () => {
    getAllCommentsEdit()
        .then((appComments) => {
            comments = appComments;
            renderComment();
        }).then((data) => {
            invisibleDivHead.classList.add('hidden');
        })
        .catch((error) => {
            if (error.message === "Ошибка сервера") {
                alert("Сервер сломался, попробуй позже");
                return;
            } else {
                alert("У вас проблемы с интернетом");
                return;
            }
        });

};
getAllComments();

// const now = (commentDate) => {
//     let date = new Date();
//     let month = (date.getMonth() + 1).toString().padStart(2, '0');
//     let day = date.getDate().toString().padStart(2, '0');
//     let year = date.getFullYear().toString().substr(-2);
//     let hours = date.getHours().toString().padStart(2, '0');
//     let minutes = date.getMinutes().toString().padStart(2, '0');
//     const resultDate = `${day}.${month}.${year} ${hours}:${minutes}`;
//     return resultDate;
// }

let comments = [
    // {
    //   name: "Глеб Фокин",
    //   date: "12.02.22 12:18",
    //   text: "Это будет первый комментарий на этой странице",
    //   like: 3,
    //   isLiked: false
    // },
    // {
    //   name: "Варвара Н.",
    //   date: "13.02.22 19:12",
    //   text: "Мне нравится как оформлена эта страница! ❤",
    //   like: 75,
    //   isLiked: false
    // }

];
deleteButtonElement.addEventListener("click", () => {
    comments.pop();
    renderComment();
})
const renderCommentLikeClick = (event) => {
    event.stopPropagation();
    const index = event.target.dataset.index;
    let countInLike = Number(comments[index].like);
    if (likeButtonElement.classList.contains("-active-like")) {
        countInLike -= 1;
        comments[index].isLiked = false;
    } else {
        countInLike += 1;
        comments[index].isLiked = true;
    }
    comments[index].like = countInLike;
    renderComment();
};

const initAnswerButton = () => {
    const commentsAnswers = document.querySelectorAll('.comment');
    for (let commentsAnswer of commentsAnswers) {
        commentsAnswer.addEventListener("click", () => {
            textElement.value = `> ${commentsAnswer.querySelector('.comment-text').innerHTML
                .replaceAll('<', '&lt;')
                .replaceAll('>', '&gt;')
                .replaceAll('&', '&amp;')
                .replaceAll('"', '&quot;')}`
                + `\n\n${commentsAnswer.querySelector('.comment-header').children[0].innerHTML
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;')
                    .replaceAll('&', '&amp;')
                    .replaceAll('"', '&quot;')
                }`
        })
    }
}
initAnswerButton();
// renderCommentLikeClick();


//
//     let isLike = '';
//     if (comments[index].isLiked) {
//         isLike = '-active-like'
//     }
//     return `<li class="comment">
//     <div class="comment-header">
//       <div>${comment.name}</div>
//       <div>${comment.date}</div>
//     </div>
//     <div class="comment-body">
//       <div class="comment-text">
//         ${comment.text}
//       </div>
//     </div>
//     <div class="comment-footer">
//       <div class="likes">
//         <span class="likes-counter" >${comment.like}</span>
//         <button class="like-button ${isLike}" data-index="${index}" ></button>
//       </div>
//     </div>
//   </li>`

// listElement.innerHTML = commentsHtml;
// initAnswerButton();
// initLikeButtonListener();
//};
getAllComments();
renderComment();

buttonElement.disabled = true;
nameElement.addEventListener('input', () => {
    if (nameElement.value.trim() !== '') {
        buttonElement.disabled = false;
        return;
    } else (buttonElement.disabled = true);
    return;
});

buttonElement.addEventListener("click", () => {
    // let countInLike;
    // const date = new Date();
    // const now = date.getDate().toString().padStart(2, '0') + '.' + (date.getMonth() + 1).toString().padStart(2, '0') + '.' + date.getFullYear().toString().slice(-2) + ' ' + date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');

    if (nameElement.value === "") {
        nameElement.classList.add("error");
        if (textElement.value === "") {
            textElement.classList.add("error");
        }
        return;

    } else if (textElement.value === "") {
        textElement.classList.add("error");
        if (nameElement.value === "") {
            nameElement.classList.add("error");
        }
        return;
    }
    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется";
    addHidden.style.display = "none";


    newComment(nameElement.value, textElement.value)

        .then((responseData) => {
            getAllComments();
        })
        .then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            addHidden.style.display = "block";
            nameElement.value = "";
            textElement.value = "";
        })
        .catch((error) => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            addHidden.style.display = "block";
            if (error.message === "Ошибка сервера") {
                alert("Сервер сломался, попробуй позже");
                return;
            };
            if (error.message === "Неверный запрос") {
                alert("Имя и комментарий должны быть не короче 3 символов");
                return;
            } else {
                alert("У вас проблемы с интернетом");
                return;
            };
        })
});
renderComment();

    //   //     listElement.innerHTML += `<li class="comment">
    //   //   <div class="comment-header">
    //   //     <div>${nameElement.value}</div>
    //   //     <div>${now}</div>
    //   //   </div>
    //   //   <div class="comment-body">
    //   //     <div class="comment-text">
    //   //       ${textElement.value}
    //   //     </div>
    //   //   </div>
    //   //   <div class="comment-footer">
    //   //     <div class="likes">
    //   //       <span class="likes-counter">${countInLike}</span>
    //   //       <button class="like-button"></button>
    //   //     </div>
    //   //   </div>
    //   // </li>`;

    //   //countInLike = 0;

    //   // comments.push({
    //   //   name: nameElement.value
    //   //     .replaceAll('<', '&lt;')
    //   //     .replaceAll('>', '&gt;')
    //   //     .replaceAll('&', '&amp;')
    //   //     .replaceAll('"', '&quot;'),
    //   //   date: now,
    //   //   text: textElement.value
    //   //     .replaceAll('<', '&lt;')
    //   //     .replaceAll('>', '&gt;')
    //   //     .replaceAll('&', '&amp;')
    //   //     .replaceAll('"', '&quot;'),
    //   //   like: countInLike,
    //   //   isLiked: false,
    //   // });
    //   renderComment();
    //   buttonElement.disabled = true;
