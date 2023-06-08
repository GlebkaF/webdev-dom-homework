import { likeButtonsListeners } from "./likes.js"
import { isInitialLoading } from "./api.js"

const loadingComments = document.querySelector('.loading');

const renderComments = (data, elem, getList) => {
    if (isInitialLoading) {
        loadingComments.style.display = 'block';
    } else {
        loadingComments.style.display = 'none';
    };

    const commentsHtml = data
        .map((comment, index) => getList(comment, index))
        .join('');

    elem.innerHTML = commentsHtml;

    likeButtonsListeners();
};


export { renderComments };