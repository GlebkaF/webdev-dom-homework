const getCommentsList = (comment, index) => {
    return `<li class="comment" data-index="${index}">
          <div class="comment-header">
            <div>
              ${comment.author.name}
            </div>
            <div>
              ${getActualDate(comment.date)}
            </div>
          </div>
          <div class="comment-body">
            <div class="comment-text" data-index="${index}">
            ${comment.text}
            </div>
          </div>
          <div class="comment-footer">
            <div class="likes">
              <span class="likes-counter">
                ${comment.likes}
              </span>
              <button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index="${index}">
              </button>
            </div>
          </div>
        </li>`;
};


function getActualDate(date) {
    let userDate = new Date(date);
    let month = userDate.getMonth() + 1;
    let minutes = userDate.getMinutes();
    let year = userDate.getFullYear() % 100;

    if (month < 10) {
        month = "0" + month;
    };

    if (minutes < 10) {
        minutes = "0" + minutes;
    };

    if (year < 10) {
        year = "0" + year;
    };

    return `${userDate.getDate()}.${month}.${year} ${userDate.getHours()}:${minutes}`;
};


export { getCommentsList };