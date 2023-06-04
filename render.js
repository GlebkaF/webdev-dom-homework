
const getListCommentsEdit = (comment, index) => {
    let isLike = '';
    if (comments[index].isLiked) {
        isLike = '-active-like'
    }
    return `
<li class="comment">
<div class="comment-header">
  <div>${comment.name}</div>
  <div>${comment.date}</div>
</div>
<div class="comment-body">
  <div class="comment-text">
    ${comment.text}
  </div>
</div>
<div class="comment-footer">
  <div class="likes">
    <span class="likes-counter" >${comment.like}</span>
    <button class="like-button ${isLike}" data-index="${index}" ></button>
  </div>
</div>
</li>`
};


export const renderComments = (comments, renderCommentLikeClick) => {
    const commentsHtml = comments.map((comment, index) => getListCommentsEdit(comment, index)).join("");

    const listElement = document.getElementById("list");
    listElement.innerHTML = commentsHtml;
    initLikeButtonListener(renderCommentLikeClick);
};
export const initLikeButtonListener = (renderCommentLikeClick) => {
    const likeButtonElements = document.querySelectorAll(".like-button");
    for (let likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", renderCommentLikeClick);
    }
};