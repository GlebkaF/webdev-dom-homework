import { toggleLikeComment, user } from '../api.js';
import { comments, reloadComments } from '../commentsState.js';
import { render } from '../renderEngine.js';
import { endcodeSpecialSymbols } from '../utils/utils.format.js';


export const BEGIN_QUOTE_MARK = '::BEGIN_QUOTE::';
export const END_QUOTE_MARK = '::END_QUOTE::';



const initHandlers = () => {
    
    if(user){
        const likeButtons = document.querySelectorAll('.comment .like-button');
        for (const button of likeButtons) {
            button.addEventListener('click', async event => {
                event.stopPropagation();

                button.classList.add('loading-like');

                const item = comments[event.target.dataset.index];
                
                toggleLikeComment(item.id)
                .then(reloadComments)
                .then(render);
            });
        }
    }
    

    const editButtons = document.querySelectorAll('.comment .comment-edit-button');
    for (const button of editButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = comments[event.target.dataset.index];
            item.isEdited = true;
            render();
        });
    }

    const editSaveButtons = document.querySelectorAll('.comment .comment-edit-save-button');
    for (const button of editSaveButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = comments[event.target.dataset.index];
            const textArea = event.target.parentElement.querySelectorAll('.comment-text-edit')[0];          
            item.isEdited = false;
            item.text = endcodeSpecialSymbols(textArea.value);
            render();
        });
    }

    const editCancelButtons = document.querySelectorAll('.comment .comment-edit-cancel-button');
    for (const button of editCancelButtons) {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = comments[event.target.dataset.index];
            item.isEdited = false;          
            render();
        });
    }

    const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', (event) => {
            event.stopPropagation();
            const item = comments[event.currentTarget.dataset.index];
            if(item.isEdited){
                return;
            }
        });
    }
    
}



export const renderCommentList = (afterRender) => {
    afterRender.then(initHandlers);

    const renderCommentText = (comment, index) => {        
        if(comment.isEdited){
            return `<textarea class="comment-text-edit">${comment.text}</textarea>          
            <button data-index="${index}" class="add-form-button comment-edit-save-button form-button">Сохранить</button>
            <button data-index="${index}" class="add-form-button comment-edit-cancel-button form-button">Отмена</button>`;
        } 
        return `<div class="comment-text">${renderCommentBody(comment.text)}</div>        
            <button data-index="${index}" class="add-form-button comment-edit-button form-button">Редактировать</button>`;
    };
    
    const renderCommentBody = (text) => text
        .replaceAll(BEGIN_QUOTE_MARK, '<div class="quote-block">')
        .replaceAll(END_QUOTE_MARK, '</div>');
    


    return `<ul class="comments" id="list-comments">`
         + comments.map((comment, index) =>
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
        ).join('')
    + `</ul>`
};