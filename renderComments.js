const listElement = document.getElementById("list");

export const renderComments = ({ comments, commentAnswerElement, initMyLikeListeners }) => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-like="">
        <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
        </div>
        <div class="comment-body" data-body = '${comment.text}, ${comment.name}'>
        <div class="comment-text">
            ${comment.text}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span  data-index = '${index}'class="likes-counter">${comment.likes}</span>
            <button data-index = '${index}' class="${comment.likeCheck ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
        </div>
    </li>`
    }).join("");

    listElement.innerHTML = commentsHtml;

    commentAnswerElement();
    initMyLikeListeners({ comments });
};