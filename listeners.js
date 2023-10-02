import { renderComments } from './renderComments.js';
import { delay, addComment } from './utilities.js';
import { commentsArr, token } from './globalVariables.js';

const likeButtonsListener = () => {
    let likeBottons = document.querySelectorAll('.like-button');

    for (let likeBotton of likeBottons) {
        likeBotton.addEventListener('click', () => {
            //Почему-то когда добавляю классом не применяется
            likeBotton.style.animation = 'rotating 2s linear infinite';
            delay(2000).then(() => {
                if (commentsArr[likeBotton.dataset.indx].likeSet) {
                    commentsArr[likeBotton.dataset.indx].countLikes -= 1;
                    commentsArr[likeBotton.dataset.indx].likeSet = false;
                }
                else {
                    commentsArr[likeBotton.dataset.indx].countLikes += 1;
                    commentsArr[likeBotton.dataset.indx].likeSet = true;
                }
                renderComments();
            });
        });
    }
};

const commentsListener = () => {
    let comments = document.querySelectorAll('.comment-text');
    let formText = document.querySelector('.add-form-text');

    for (let comment of comments) {
        comment.addEventListener('click', () => {
            formText.value = `QUOTE_BEGIN ${comment.dataset.name}:\n${comment.dataset.text.replace(comment.dataset.text.slice(comment.dataset.text.indexOf('QUOTE_BEGIN'), comment.dataset.text.lastIndexOf('QUOTE_END') > -1 ? comment.dataset.text.lastIndexOf('QUOTE_END') + 9 : -1), '')} QUOTE_END\n`;
            formText.focus();
        });
    }
};

const quoteListener = () => {
    let quotes = document.querySelectorAll('.quote');

    for (let quote of quotes) {
        quote.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }
};

const editButtonsListener = () => {
    let editBottons = document.querySelectorAll('.edit-button');

    for (let editBotton of editBottons) {
        if (!token) {
            editBotton.disabled = true;
        }
        editBotton.addEventListener('click', () => {
            commentsArr[editBotton.dataset.indx].editComment = true;
            renderComments();
        });
    }
};

const saveCommentButtonsListener = () => {
    let saveCommentBottons = document.querySelectorAll('.save-comment-button');

    for (let saveComment of saveCommentBottons) {
        saveComment.addEventListener('click', () => {
            commentsArr[saveComment.dataset.indx].editComment = false;
            commentsArr[saveComment.dataset.indx].comment = saveComment.dataset.quote + document.getElementsByClassName('edit-comment')[saveComment.dataset.indx].value;
            renderComments();
        });
    }
};

const buttonDisable = () => {
    let formName = document.querySelector('.add-form-name');
    let formText = document.querySelector('.add-form-text');
    let formButton = document.querySelector('.add-form-button');

    if (formName.value === "" || formText.value === "")
        formButton.disabled = true;
    else
        formButton.disabled = false;
};

const deleteLastButtonFunc = () => {
    commentsArr.pop();
    renderComments();
};

const keyEnter = (event) => {
    if (event.code === 'Enter') {
        addComment();
    }
};

export { likeButtonsListener, commentsListener, quoteListener, editButtonsListener, saveCommentButtonsListener, buttonDisable, deleteLastButtonFunc, keyEnter };