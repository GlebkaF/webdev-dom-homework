// Определение переменных

const addCommentForm = document.querySelector(".add-form");
const buttonElement = document.querySelector(".add-form-button");
const listOfComments = document.querySelector(".comments");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const removeButton = document.querySelector('.remove-form-button');
const constWaitingComment = document.querySelector('.add-waiting');
const startingElement = document.querySelector('.starting');

export {
    addCommentForm,
    buttonElement,
    listOfComments,
    nameInputElement,
    commentInputElement,
    removeButton,
    constWaitingComment,
    startingElement
}