import {initlikeButtonsListeners, redactComments, initiateRedact} from "./main.js";

// Рендерим из массива разметку
function renderComments(element, getListComments, comments) {
    const commentsHTML = comments.map((comment, index) => getListComments(comment, index)).join('');
    element.innerHTML = commentsHTML;
    initlikeButtonsListeners();
    redactComments();
    initiateRedact();
}
export default renderComments;