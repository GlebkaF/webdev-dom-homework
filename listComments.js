export const listComments = (comment, index) => {

  return `<li class="comment" data-index="${index}">
    <div class="comment-header">
      <div>${comment.name
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")}
      </div>
      <div>${comment.date}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${comment.text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comment.likes}</span>
        <button class="like-button ${comment.propertyColorLike}" data-index="${index}"></button>
      </div>
    </div>
  </li>`;
};
