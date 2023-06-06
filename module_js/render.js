import { comments, listElement, textInputElement } from "./variables.js";

function renderComments() {
  const commentsHtml = comments
    .map((comment, index) => {
      let activeLike = "";
      if (comments[index].isLiked) {
        activeLike = "-active-like";
      }
      return `
        <li class="comment">
            <div class="comment-header">
            <div id="commentName">${comment.name}</div>
            <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text"  id="commentText">${comment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter" >${comment.likes}</span>
                <button class="like-button ${activeLike}" data-index='${index}'></button>
              </div>
            </div>
          </li>`;
    })
    .join("");

  listElement.innerHTML = commentsHtml;

  initLike();
  copyComment();
}

function copyComment() {
  const commentsElement = document.querySelectorAll(".comment");

  for (const comment of commentsElement) {
    comment.addEventListener("click", () => {
      textInputElement.value =
        `> ${comment
          .querySelector(".comment-text")
          .innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}` +
        `\n\n${comment
          .querySelector(".comment-header")
          .children[0].innerHTML.replaceAll("&amp;", "&")
          .replaceAll("&lt;", "<")
          .replaceAll("&gt;", ">")
          .replaceAll("&quot;", '"')}`;
    });
  }
}

function initLike() {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonElements) {
    const index = likeButton.dataset.index;
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (comments[index].isLiked) {
        comments[index].likes--;
      } else {
        comments[index].likes++;
      }
      comments[index].isLiked = !comments[index].isLiked;

      renderComments();
    });
  }
}

export { renderComments };
