import { comments, listElement, textInputElement } from "./variables.js";

function renderComments(array) {
  const commentsHtml = array
    .map((comment, index) => {
      let activeLike = "";
      if (array[index].isLiked) {
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

  initLike(array);
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

function initLike(array) {
  const likeButtonElements = document.querySelectorAll(".like-button");
  for (const likeButton of likeButtonElements) {
    const index = likeButton.dataset.index;
    likeButton.addEventListener("click", (e) => {
      e.stopPropagation();

      if (array[index].isLiked) {
        array[index].likes--;
      } else {
        array[index].likes++;
      }
      array[index].isLiked = !array[index].isLiked;

      renderComments(array);
    });
  }
}

export { renderComments };
