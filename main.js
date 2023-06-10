
import { getAllComments } from "./api.js";
import { renderComments } from "./render.js";

const renderApp = () => {
    renderComments({ comments, handleCommentLikeClick, handleCommentAnswerClick });
}
const commentAdding = document.createElement('div');
const appEl = document.getElementById("app");
commentAdding.innerText = 'Пожалуйста подождите, загружаю комментарии...';
appEl.appendChild(commentAdding);

export const initApp = () => {
    getAllComments()
        .then((appComments) => {
            comments = appComments;
            renderApp();
        })
        .then((data) => {
            commentAdding.style.display = 'none';
        });
}

let comments = [
];

const handleCommentLikeClick = (event) => {
    event.stopPropagation();
    const index = event.target.dataset.index;
    const likesContainer = event.target.closest('.comment-footer');
    const likesCounter = likesContainer.querySelector('.likes-counter');
    let countInLike = likesCounter.textContent;
    if (comments[index].isLike === true) {
        countInLike = (+countInLike) - 1;
        comments[index].isLike = false;
    } else {
        countInLike = (+countInLike) + 1;
        comments[index].isLike = true;
    }
    comments[index].like = countInLike;
    renderApp();
};
let commentAnswer = null;
const handleCommentAnswerClick = (event) => {
    const textElement = document.getElementById("add-text");
    commentAnswer = event.target.dataset.index;
    textElement.value = `>${comments[commentAnswer].text} ${comments[commentAnswer].name}`
    // .replaceAll('<', '&lt;')
    // .replaceAll('>', '&gt;')
    // .replaceAll('&', '&amp;')
    // .replaceAll('"', '&quot;')}`;
};
// const handleCommentDeleteClick = (event) => {
//     const button = event.target;
//     const index = button.dataset.index;
//     const lastCommentIndex = document.getElementById('add-delete')
//     if (lastCommentIndex !== -1) {
//         comments[index]
//     }
//     comments.pop();
//     renderApp();
// }
initApp();

