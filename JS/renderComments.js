// import { comments } from "./comments.js";
// import { likeButtonsListeners, editButtonsListeners, replyToCommentListeners } from "./main.js";

const renderComments = (data, elem, getList) => {
    const commentsHtml = data
        .map((comment, index) => getList(comment, index))
        .join('');

    elem.innerHTML = commentsHtml;
    // likeButtonsListeners();
    // editButtonsListeners();
    // replyToCommentListeners();
};


export { renderComments };