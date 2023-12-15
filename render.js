import { endcodeSpecialSymbols } from './utils.format.js';
import { delay } from './utils.promise.js';


export const BEGIN_QUOTE_MARK = '::BEGIN_QUOTE::';
export const END_QUOTE_MARK = '::END_QUOTE::';




const initCommentsEventHandlers = (options) => {
    const likeButtons = document.querySelectorAll('.comment .like-button');
    for (const button of likeButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();

            button.classList.add('loading-like');

            delay(1500)
            .then(() => {
                const item = options.commentsData[event.target.dataset.index];
                item.likesCount += item.isLiked ? -1 : +1;
                item.isLiked = !item.isLiked;
            })
            .then(() => renderComments(options));
        });
    }

    const editButtons = document.querySelectorAll('.comment .comment-edit-button');
    for (const button of editButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = options.commentsData[event.target.dataset.index];
            item.isEdited = true;
            renderComments(options);
        });
    }

    const editSaveButtons = document.querySelectorAll('.comment .comment-edit-save-button');
    for (const button of editSaveButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = options.commentsData[event.target.dataset.index];
            const textArea = event.target.parentElement.querySelectorAll('.comment-text-edit')[0];          
            item.isEdited = false;
            item.text = endcodeSpecialSymbols(textArea.value);
            renderComments(options);
        });
    }

    const editCancelButtons = document.querySelectorAll('.comment .comment-edit-cancel-button');
    for (const button of editCancelButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = options.commentsData[event.target.dataset.index];
            item.isEdited = false;          
            renderComments(options);
        });
    }

    const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = options.commentsData[event.currentTarget.dataset.index];
            if(item.isEdited){
                return;
            }
            
            options.handlerCommentClick && options.handlerCommentClick(item);
        });
    }
    
}



export const renderComments = (options) => {
    const renderCommentText = (comment, index) => {        
        if(comment.isEdited){
            return `<textarea class="comment-text-edit">${comment.text}</textarea>          
            <button data-index="${index}" class="add-form-button comment-edit-save-button">Сохранить</button>
            <button data-index="${index}" class="add-form-button comment-edit-cancel-button">Отмена</button>`;
        } 
        return `<div class="comment-text">${renderCommentBody(comment.text)}</div>        
            <button data-index="${index}" class="add-form-button comment-edit-button">Редактировать</button>`;
    };
    
    const renderCommentBody = (text) => text
        .replaceAll(BEGIN_QUOTE_MARK, '<div class="quote-block">')
        .replaceAll(END_QUOTE_MARK, '</div>');
    


    const commentsHTML = options.commentsData.map((comment, index) =>
        `<li class="comment" data-index="${index}">
        <div class="comment-header">
            <div>${comment.author}</div>
            <div>${comment.date}</div>
        </div>
        <div class="comment-body"> 
            ${renderCommentText(comment, index)}
        </div>
        <div class="comment-footer">
            <div class="likes">
            <span class="likes-counter">${comment.likesCount}</span>
            <button data-index="${index}" class="like-button ${comment.isLiked ? 'active-like' : ''}"></button>
            </div>
        </div>
        </li>`
    ).join('');

    options.element.innerHTML = commentsHTML;

    initCommentsEventHandlers(options);

    options.afterRender && options.afterRender();
};