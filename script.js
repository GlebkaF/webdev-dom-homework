import { renderComments } from "./render.js";
import { getData } from "./api.js";
import { addToList } from "./api.js";
import { appComments } from "./api.js";

export const container = document.querySelector('.container');

export const loadingMessage = document.createElement('h3');
loadingMessage.classList.add('hidden');
loadingMessage.textContent = 'Список комментариев загружается...';
container.prepend(loadingMessage);

const postMessage = document.createElement('h3');
postMessage.classList.add('hidden');
postMessage.textContent = 'Комментарий публикуется...';
container.appendChild(postMessage);

getData();
renderComments(appComments);

export const addButton = document.querySelector('.add-form-button');
export const commentName = document.querySelector('.add-form-name');
export const commentText = document.querySelector('.add-form-text');
export const commentsList = document.querySelector('.comments');
export const addForm = document.querySelector('.add-form');
const removeButton = document.querySelector('.remove-form-button');
const loginButton = document.querySelector('.login-button');

console.log(addButton);
console.log(removeButton);
console.log(loginButton);



startPage();

function startPage() {
    commentsList.classList.add('hidden');
    loadingMessage.classList.add('message');
    loadingMessage.classList.remove('hidden');

    getData().then((comments => renderComments(comments)));

    loadingMessage.classList.add('hidden');
    addForm.classList.remove('hidden');
    postMessage.classList.add('hidden');
    commentsList.classList.remove('hidden');
}

renderComments(appComments);

addButton.setAttribute('disabled', '');

commentName.addEventListener('input', () => {
    if (commentText.value) {
        addButton.removeAttribute('disabled');
    } else
        return;
})

commentText.addEventListener('input', () => {
    if (commentName.value) {
        addButton.removeAttribute('disabled');
    } else
        return;
})

addButton.addEventListener('click', (e) => {

    addForm.classList.add('hidden');
    postMessage.classList.remove('hidden');

    addToList();
        addForm.classList.remove('hidden');
        addButton.removeAttribute('disabled')
        postMessage.classList.add('hidden');
})

addForm.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        addToList();
        addForm.classList.remove('hidden');
        addButton.removeAttribute('disabled')
        postMessage.classList.add('hidden');
    }
})

// const removeButton = document.querySelector('.remove-form-button');

removeButton.addEventListener('click', () => {
    appComments.pop();
    renderComments(appComments);
});