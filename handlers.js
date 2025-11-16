import { comments, sanitizeHtml } from "./comments.js";
import { renderComments } from "./render.js";

export const handleLikeClick = (event) => {
    event.stopPropagation();
  const likeButton = event.target.closest(".like-button");
  if (!likeButton) return;

  const commentIndex = likeButton.dataset.commentIndex;
  const comment = comments[commentIndex];

  comment.isLiked = !comment.isLiked;
  comment.likesCount += comment.isLiked ? 1 : -1;

  const likesCounter = likeButton.previousElementSibling;
  likesCounter.textContent = comment.likesCount;
  likeButton.classList.toggle("-active-like", comment.isLiked);
};

export const handleQuoteClick = (event) => {
  const commentElement = event.target.closest(".comment");
  if (!commentElement) return;

  const commentIndex = Array.from(commentElement.parentNode.children).indexOf(
    commentElement
  );
  const comment = comments[commentIndex];

  const textareaEl = document.getElementById("textarea");
  textareaEl.value = `${comment.name}: ${comment.comment}`;
};

export const handleAddComment = () => {
    const inputEl = document.getElementById('input');
    const textareaEl = document.getElementById('textarea');
    const addButton = document.getElementById('add');

    addButton.disabled = true;
    addButton.textContent = 'Загрузка...';

    const name = inputEl.value.trim();
    const comment = textareaEl.value.trim();

    if (!name || !comment) {
        alert('Пожалуйста, укажите имя и текст комментария.');
        addButton.disabled = false;
        addButton.textContent = 'Добавить';
        return;
    }

    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;

    fetch('https://wedev-api.sky.pro/api/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            comment: comment,
            date: formattedDate,
            isLiked: false,
            likesCount: 0
        })
    })
    .then(response => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 500) {
            throw new Error('Сервер упал');
        } else if (response.status === 400) {
            throw new Error('Ошибка в данных');
        }
        throw new Error('Неизвестная ошибка');
    })
    .then(() => {
        inputEl.value = '';
        textareaEl.value = '';
        return renderComments();
    })
    .then(() => {
        document.getElementById('result').textContent = 'Комментарий добавлен';
    })
    .catch(error => {
        console.error('Ошибка отправки комментария:', error);
        document.getElementById('result').textContent = 'Произошла ошибка при отправке комментария';
        alert('Не удалось отправить комментарий. Попробуйте позже.');
    })
    .finally(() => {
        addButton.disabled = false;
        addButton.textContent = 'Добавить';
    });
};
