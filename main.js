import { loadCommentsData, postComment } from "./api.js";
import { delay, runLongProcess } from './utils.promise.js';
   

let commentsData = [];

const BEGIN_QUOTE_MARK = '::BEGIN_QUOTE::';
const END_QUOTE_MARK = '::END_QUOTE::';

const formAddComment = document.getElementsByClassName('add-form')[0];
const inputName = formAddComment.getElementsByClassName('add-form-name')[0];
const inputComment = formAddComment.getElementsByClassName('add-form-text')[0];
const inputs = [inputName, inputComment];

const listComments = document.getElementById('list-comments');
const buttonAddComment = document.getElementById('button-add-comment');
const templateComment = document.getElementById('template-comment');
const messagePannel = document.getElementById('message-pannel');
const controlPannel = document.getElementById('control-pannel');

const buttonRemoveComment = document.getElementById('button-remove-comment');





const setButtonRemoveCommentEnabled = () => buttonRemoveComment.disabled = commentsData.length == 0;

const initCommentsEventHandlers = () => {
    const likeButtons = document.querySelectorAll('.comment .like-button');
    for (const button of likeButtons) {
    button.addEventListener('click', (event) => {
        event.stopPropagation();

        button.classList.add('loading-like');

        delay(1500)
        .then(() => {
        const item = commentsData[event.target.dataset.index];
        item.likesCount += item.isLiked ? -1 : +1;
        item.isLiked = !item.isLiked;
        })
        .then(renderComments);
    });
    }

    const editButtons = document.querySelectorAll('.comment .comment-edit-button');
    for (const button of editButtons) {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const item = commentsData[event.target.dataset.index];
        item.isEdited = true;
        renderComments();
    });
    }

    const editSaveButtons = document.querySelectorAll('.comment .comment-edit-save-button');
    for (const button of editSaveButtons) {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const item = commentsData[event.target.dataset.index];
        const textArea = event.target.parentElement.querySelectorAll('.comment-text-edit')[0];          
        item.isEdited = false;
        item.text = endcodeSpecialSymbols(textArea.value);
        renderComments();
    });
    }

    const editCancelButtons = document.querySelectorAll('.comment .comment-edit-cancel-button');
    for (const button of editCancelButtons) {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const item = commentsData[event.target.dataset.index];
        item.isEdited = false;          
        renderComments();
    });
    }

    const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
    commentElement.addEventListener('click', (event) => {
        event.stopPropagation();
        const item = commentsData[event.currentTarget.dataset.index];
        if(item.isEdited){
        return;
        }
        inputComment.value = decodeSpecialSymbols(`${BEGIN_QUOTE_MARK} ${item.author}: ${item.text} ${END_QUOTE_MARK}`);
        validateComment();
    });
    }
    
}

const renderComments = () => {
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
    


    const commentsHTML = commentsData.map((comment, index) =>
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

    listComments.innerHTML = commentsHTML;

    initCommentsEventHandlers();

    setButtonRemoveCommentEnabled();
};







const validationState = {
    isNameValid: false,
    setIsNameValid(state) { this.isNameValid = state; if(this.onchange) this.onchange(); },
    isCommentValid: false,
    setIsCommentValid(state) { this.isCommentValid = state; if(this.onchange) this.onchange(); },
    isValid(){
    return this.isNameValid && this.isCommentValid;
    }
};



const inputIsNotEmpty = (input) => input.value.trim() !== '';

const validateName = () => { 
    validationState.setIsNameValid(inputIsNotEmpty(inputName)); 
    return validationState.isNameValid;
};
const validateComment = () => {
    validationState.setIsCommentValid(inputIsNotEmpty(inputComment)); 
    return validationState.isCommentValid;
};

const setAddCommentButtonEnabled = () => {
    buttonAddComment.disabled = !validationState.isValid();
};

const setInputValidityStatus = (input, status) =>{
    if(status){
    input.classList.remove('error');
    } else {
    input.classList.add('error');
    }
};

const validate = () => {      
    setInputValidityStatus(inputName, validateName());
    setInputValidityStatus(inputComment, validateComment());
    return validationState.isValid();
}

const validateAndSend = () => {      
    if(!validate()){
    return;
    }
    
    startLongProcess('Сообщение отправляется...', () => postLoadAndRenderComments(inputName.value, inputComment.value));
        
    validateComment();
};

const removeLastComment = () => {
    if(commentsData.length == 0){
    return;
    }
    commentsData.splice(commentsData.length - 1, 1);
    renderComments();
}




const startLongProcess = (message, process) => {
    const showWaitingInfo = () => {
        messagePannel.textContent  = message;
        messagePannel.classList.remove('hidden');
        controlPannel.classList.add('hidden');
    };
    
    const hideWaitMessage = () => {
        messagePannel.classList.add('hidden');
        controlPannel.classList.remove('hidden');
    };

    runLongProcess(process, showWaitingInfo, hideWaitMessage);
};


const loadAndRenderComments = () => {
    return loadCommentsData()
        .then(data => commentsData = data)
        .then(renderComments);
};

const postLoadAndRenderComments = (name, text) => {
    const clearCommentInput = () => {
        inputComment.value = '';
    };

    return postComment(name, text)
        .then(clearCommentInput)
        .then(loadAndRenderComments)
};
    





////////////////////////////// RUN ////////////////////////////// 

inputName.addEventListener('input', validateName);

inputComment.addEventListener('input', validateComment);

buttonAddComment.addEventListener('click', validateAndSend);

validationState.onchange = () => setAddCommentButtonEnabled();

buttonRemoveComment.addEventListener('click', removeLastComment);



startLongProcess('Сообщения загружаются...', loadAndRenderComments);
validateName();
validateComment();
setButtonRemoveCommentEnabled();