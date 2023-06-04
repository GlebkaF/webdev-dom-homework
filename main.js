
import { getAllComments, newComment } from "./api.js";
import { renderComments } from "./render.js";


export const listElement = document.getElementById("list")
const buttonElement = document.getElementById("add-button");
export const nameElement = document.getElementById("add-name");
export const textElement = document.getElementById("add-text");
const likeButtonElements = document.querySelectorAll(".like-button");
const deleteButtonElement = document.querySelector(".delete-button");
const invisibleDiv = document.getElementById('invizDiv');
const invisibleDivHead = document.getElementById('invizDivHeader');
const addHidden = document.getElementById('add-hidden');

invisibleDiv.classList.add('hidden');
invisibleDivHead.classList.add('hidden');

export let comments = [
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

export const initLikeButtonListener = () => {
    const likeButtonElements = document.querySelectorAll(".like-button");
    for (let likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = likeButtonElement.dataset.index;
            let countInLike = Number(comments[index].like);
            if (likeButtonElement.classList.contains("-active-like")) {
                countInLike -= 1;
                comments[index].isLiked = false;
            } else {
                countInLike += 1;
                comments[index].isLiked = true;
            }
            comments[index].like = countInLike;
            renderComments();
        });
    }
};
export const initAnswerButton = () => {
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
initLikeButtonListener();
getAllComments();



buttonElement.disabled = true;
nameElement.addEventListener('input', () => {
    if (nameElement.value.trim() !== '') {
        buttonElement.disabled = false;
        return;
    } else (buttonElement.disabled = true);
    return;
});

buttonElement.addEventListener("click", () => {
    let countInLike;
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
    invisibleDiv.classList.remove('hidden');
    invisibleDiv.classList.add('hidden');
    newComment();
    countInLike = 0
    deleteButtonElement.value
});

document.addEventListener('kayup', (event) => {
    if (event.key === 'Enter') {
        buttonElement.click();
    }
});
deleteButtonElement.addEventListener("click", () => {

    comments.pop();
    renderComments();
})
//renderComment();

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
