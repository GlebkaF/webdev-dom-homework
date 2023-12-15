import { deleteComment, loadCommentsData, postComment, user } from "./api.js";
import { comments, reloadComments, setComments } from "./commentsState.js";
import { BEGIN_QUOTE_MARK, END_QUOTE_MARK } from "./render.commentList.js";
import { render } from "./renderEngine.js";
import { decodeSpecialSymbols } from "./utils.format.js";
import { runLongProcess } from "./utils.promise.js";


const initHandlers = () => {
    const formAddComment = document.querySelector('.add-form');
    const inputName = formAddComment.querySelector('.add-form-name');
    const inputComment = formAddComment.querySelector('.add-form-text');
    const buttonAddComment = document.getElementById('button-add-comment');
    const messagePannel = document.getElementById('message-pannel');
    const controlPannel = document.getElementById('control-pannel');
    const buttonRemoveComment = document.getElementById('button-remove-comment');




    const validationState = {        
        isCommentValid: false,
        setIsCommentValid(state) { this.isCommentValid = state; if(this.onchange) this.onchange(); },
        isValid(){
            return this.isCommentValid;
        }
    };
    
    
    const inputIsNotEmpty = (input) => input.value.trim() !== '';
    
    
    
    const validateComment = () => {
        validationState.setIsCommentValid(inputIsNotEmpty(inputComment)); 
        return validationState.isCommentValid;
    };
    
    
    const setAddCommentButtonEnabled = () => buttonAddComment.disabled = !validationState.isValid();
    
    
    const setButtonRemoveCommentEnabled = () => buttonRemoveComment.disabled = comments.length == 0;
    
    
    const setInputValidityStatus = (input, status) =>{
        if(status){
            input.classList.remove('error');
        } else {
            input.classList.add('error');
        }
    };
    
    const validate = () => {              
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
        return reloadComments()
            .then(render);
    };
    
    const postLoadAndRenderComments = (name, text) => {
        const clearCommentInput = () => {
            inputComment.value = '';
        };
    
        return postComment(name, text)
            .then(clearCommentInput)
            .then(loadAndRenderComments)
    };
        

    const removeLastComment = async () => {
        if(comments.length == 0){
            return;
        }

        const lastComment = comments[comments.length - 1];
    
        await deleteComment(lastComment.id)
            .then(loadAndRenderComments);
    }


    const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', event => {
            event.stopPropagation();
            const item = comments[event.currentTarget.dataset.index];
            if(item.isEdited){
                return;
            }
            inputComment.value = decodeSpecialSymbols(`${BEGIN_QUOTE_MARK} ${item.author}: ${item.text} ${END_QUOTE_MARK}`);
        });
    }


    
    inputComment.addEventListener('input', validateComment);
    buttonAddComment.addEventListener('click', validateAndSend);
    validationState.onchange = () => setAddCommentButtonEnabled();
    buttonRemoveComment.addEventListener('click', removeLastComment);


    setButtonRemoveCommentEnabled();    
    validateComment();
};


export const renderForm = (afterRender) => {
    afterRender.then(initHandlers);

    return `<div id="message-pannel" class="message-pannel hidden"></div>
    <div id="control-pannel" class="control-pannel">
      <button class="remove-comment-button" id="button-remove-comment">Удалить последний коментарий</button>
      <div class="add-form">
        <input
          readonly        
          type="text"
          class="add-form-name form-input"
          placeholder="Введите ваше имя"   
          value="${user.name}"
        />
        <textarea
          type="textarea"
          class="add-form-text form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button form-button" id="button-add-comment">Написать</button>
        </div>
      </div>
    </div>`;
}