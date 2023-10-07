const listComments = document.querySelector('.comments');
const options = {
    year: '2-digit',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
}

let com = [];

export const renderComments = ({ comments }) => {
    if (!comments) return;
    com = comments;
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

const addLikesElements = (target) => {
    const commentBlock = target.closest('.comment');
    const commentId = commentBlock.dataset.id;
    const likes = commentBlock.querySelector('.like-button');
    const com = comments.find(c => c.id == commentId);
    if (!com) return;

    likes.classList.add('-loading-like');

    delay(2000).then(() => {
        if (com.isLiked) {
            com.likes--;
        } else {
            com.likes++;
        }
        com.isLiked = !com.isLiked;
        com.isLikeLoading = false;
        renderComments();
    });
}

export const switcher = (event) => {
    if (!event || !event.target) return;
    const target = event.target;

    if (target.classList.contains('like-button')) {
        addLikesElements(target);
        return;
    }

    if (target.classList.contains('comment-text')) {
        areaFunction(target);
        return;
    }
}

const areaFunction = (target) => {
    const commentBlock = target.closest('.comment');
    const commentId = commentBlock.dataset.name;
    addFormText.value = `${'>'}` + getUnsafeString(target.innerHTML) + ' \n' + commentId;
}

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}
