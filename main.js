import { loadCommentsData, postComment } from "./api.js";
import { runLongProcess } from './utils.promise.js';
import { renderComments, BEGIN_QUOTE_MARK, END_QUOTE_MARK } from './render.js';
import { decodeSpecialSymbols } from "./utils.format.js";


let commentsData = [];

const formAddComment = document.querySelector('.add-form');
const inputName = formAddComment.querySelector('.add-form-name');
const inputComment = formAddComment.querySelector('.add-form-text');
const listComments = document.getElementById('list-comments');
const buttonAddComment = document.getElementById('button-add-comment');
const messagePannel = document.getElementById('message-pannel');
const controlPannel = document.getElementById('control-pannel');
const buttonRemoveComment = document.getElementById('button-remove-comment');



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


const setAddCommentButtonEnabled = () => buttonAddComment.disabled = !validationState.isValid();


const setButtonRemoveCommentEnabled = () => buttonRemoveComment.disabled = commentsData.length == 0;


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
    
const removeLastComment = () => {
    if(commentsData.length == 0){
        return;
    }
    commentsData.splice(commentsData.length - 1, 1);
    render();
}


const render = () => {
    const handlerCommentClick = (item) => {
        inputComment.value = decodeSpecialSymbols(`${BEGIN_QUOTE_MARK} ${item.author}: ${item.text} ${END_QUOTE_MARK}`);
        validateComment();
    };

    const afterRender = () => {
        setButtonRemoveCommentEnabled();
    };

    renderComments({
        commentsData, 
        element: listComments, 
        handlerCommentClick,
        afterRender
    });
}




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