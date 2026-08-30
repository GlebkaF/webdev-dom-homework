import { escapeHtml } from './escapeHtml.js';

export function renderComments(container, arr) {
    container.innerHTML = '';
    arr.forEach(comment => {
        const likeButtonClass = comment.isLiked
            ? 'like-button -active-like'
            : 'like-button';

        const li = document.createElement('li');
        li.className = 'comment';
        li.dataset.id = comment.id;

        const safeAuthor = escapeHtml(comment.author.name);
        let safeText = escapeHtml(comment.text);
        safeText = safeText.replace(/\n/g, '<br>');

        li.innerHTML = `
        <div class="comment-header">
            <div>${safeAuthor}</div>
            <div>${comment.date}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">${safeText}</div>
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${likeButtonClass}" data-id="${comment.id}" data-action="like"></button>
            </div>
        </div>
        `;
        container.appendChild(li);
    });
}