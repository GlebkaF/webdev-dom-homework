const listComments = document.querySelector('.comments');
const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}

export const renderComments = ({ comments }) => {
    if (!comments) return;
    const commentsHTML = comments.map((comment) => {
        return `<li class="comment" data-id="${comment.id}" data-name="${comment.author.name}">
            <div class="comment-header">
            <div>${comment.author.name}</div>
            <div>${new Date(comment.date).toLocaleDateString('ru-RU', options).replace(',', '')}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${comment.text}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button" data-like="${comment.isLiked}"></button>
            </div>
            </div>
            </li>`
    }).join('');
    listComments.innerHTML = commentsHTML;
}

