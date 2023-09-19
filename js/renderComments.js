import { initEventListeners, functionEdit } from "./main.js";

const listElement = document.getElementById('list');

export const renderComments = ({ comments, fetchAndRenderTasks }) => {
	const commentsHtml = comments.map((comment, index) => {
		return `<li class="comment" data-index='${index}'>
					<div class="comment-header">
						<div>${comment.name}</div>
						<div>${comment.date}</div>
					</div>
					<div class="comment-body">
						${comment.isEdit ? `<textarea class='add-form-text comment-edit-text'>${comment.text}</textarea>` : `<div class="comment-text" style="white-space:pre-line">
							${comment.text}
						</div>`}
					</div>
					<button class="add-form-button edits" data-index='${index}'>${comment.isEdit ? 'Сохранить' : 'Редактировать'}</button>
					<div class="comment-footer">
						<div class="likes">
							<span class="likes-counter">${comment.likes}</span>
							<button class="like-button ${comment.isLiked ? '-active-like' : ''}" data-index='${index}'>
							</button>
						</div>
					</div>
				</li>`;
	}).join('');

	listElement.innerHTML = commentsHtml;

	initEventListeners();
	functionEdit();
}