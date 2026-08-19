import { commentsArr } from "./commentsArr.js";
import { renderComments } from "./renderComments.js";
import { escapeHtml } from "./escapeHtml.js";
import { getFormattedDate } from "./getFormattedDate.js";

const formNameEl = document.getElementById('form-name');
const formCommentEl = document.getElementById('form-comment');
const listEl = document.getElementById('list');
const buttonSubmitEl = document.getElementById('button-submit');

listEl.addEventListener('click', (e) => {

    if (e.target.classList.contains('like-button') || e.target.dataset.action === 'like') {
        return;
    }

    const clickedComment = e.target.closest('.comment');

    if (clickedComment && !e.target.closest('button')) {

        e.stopPropagation();

        const targetId = parseInt(clickedComment.dataset.id, 10);
        const commentToQuote = commentsArr.find(c => c.id === targetId);

        if (commentToQuote) {

            formCommentEl.value = '';

            const quotePrefix = 'ᐳ ';
            const lines = commentToQuote.text.split('\n');
            const quotedText = lines.map(line => quotePrefix + line).join('\n');
            const finalText = `${quotePrefix + commentToQuote.author}\n${quotedText}\n\n`;

            formCommentEl.value = finalText;
            formCommentEl.focus();
        }
    }
});

listEl.addEventListener('click', (e) => {
    if (!e.target.classList.contains('like-button') && e.target.dataset.action !== 'like') return;

    e.stopPropagation();

    const btnElement = e.target;
    const commentId = parseInt(btnElement.dataset.id, 10);

    const comment = commentsArr.find(c => c.id === commentId);
    if (!comment) return;

    comment.likedByMe = !comment.likedByMe;
    if (comment.likedByMe) {
        comment.likesCount++;
    } else {
        comment.likesCount--;
    }

    renderComments(listEl, commentsArr);
});

buttonSubmitEl.addEventListener('click', () => {
    const name = formNameEl.value.trim();
    const text = formCommentEl.value.trim();

    if (!name || !text) {
        alert('Заполните оба поля');
        return;
    }

    const newComment = {
        id: Date.now(),
        author: escapeHtml(name),
        date: getFormattedDate(),
        text: escapeHtml(text),
        likesCount: 0,
        likedByMe: false,
    };

    commentsArr.push(newComment);
    renderComments(listEl, commentsArr);

    formNameEl.value = '';
    formCommentEl.value = '';
});

export { listEl, buttonSubmitEl };