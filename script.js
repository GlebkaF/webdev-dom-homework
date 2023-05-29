
import { fetchGet, fetchPost, commentos } from "./api.js";
import renderComments from "./renderComments.js";
import { getListComments } from "./listComments.js";


export let addFormName = document.querySelector(".add-form-name");
export let addFormText = document.querySelector(".add-form-text");
export let addFormButton = document.querySelector(".add-form-button");
export let comments = document.querySelector(".comments");
export let comment = document.getElementsByTagName('li');
export let deleteFormButton = document.querySelector(".delete-form-button");
export let addForm = document.querySelector(".add-form");
export let adding = document.querySelector(".adding");
export let commentsLoading = document.querySelector(".comments-loading");





fetchGet();

addFormButton.classList.add('add-form-button-inactive');

renderComments(comments, getListComments);


addFormName.addEventListener('input', () => {
    if(addFormName.value !== 0 && addFormText.value !== 0) {
        addFormButton.classList.remove('add-form-button-inactive');
    }
});

addFormText.addEventListener('input', () => {
    if(addFormName.value !== 0 && addFormText.value !== 0) {
        addFormButton.classList.remove('add-form-button-inactive');
     }
});

function clickable() {

        addFormName.classList.remove('error');
    addFormText.classList.remove('error');

    if(addFormName.value === '') {
        addFormName.classList.add('error');
        addFormButton.classList.add('add-form-button-inactive');
        return;
    }
    if(addFormText.value === '') {
        addFormText.classList.add('error');
        addFormButton.classList.add('add-form-button-inactive');
        return;
    }

    addForm.style.display = 'none';
    adding.style.display = 'block';
    
    fetchPost();

}

addFormButton.addEventListener('click', () => {

    clickable();

});

document.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        clickable();
    }
});

deleteFormButton.addEventListener('click', () => {
    commentos.pop();
    renderComments(comments, getListComments);
});



