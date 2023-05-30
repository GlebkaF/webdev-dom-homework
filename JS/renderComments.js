import { comments } from "./comments.js";
// import { likeButtonsListeners, editButtonsListeners, replyToCommentListeners } from "./main.js";

const renderComments = (elem, getList) => {
    const commentsHtml = comments
        .map((comment, index) => getList(comment, index))
        .join('');

    elem.innerHTML = commentsHtml;
    // likeButtonsListeners();
    // editButtonsListeners();
    // replyToCommentListeners();
};


export { renderComments };