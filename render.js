import {initlikeButtonsListeners,  initiateRedact} from "./main.js";
import {commentsElements} from "./main.js";
import { redactComments } from "./redactComments.js";

// Рендерим из массива разметку
function renderComments(element, getListComments, comments) {
    const commentsHTML = comments.map((comment, index) => getListComments(comment, index)).join('');
    element.innerHTML = commentsHTML;
    initlikeButtonsListeners();
    redactComments(commentsElements);
    initiateRedact();
}
export default renderComments;