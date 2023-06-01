import { comments } from "./api.js";
import { getDate } from "./main.js";
import { initDisabledButton } from "./main.js";
import { initLikeButtonListeners } from "./main.js";

const renderComments = (element, getListComments) => {
    const commentsHtml = comments
        .map((comment, index) => getListComments(comment, index, getDate))
        .join('');
    element.innerHTML = commentsHtml;


    initLikeButtonListeners();
    initDisabledButton();

};

export {renderComments};