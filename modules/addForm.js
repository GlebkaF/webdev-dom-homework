import { postApiComment } from "./api.js";
import { loadComments } from "./comments.js";


const addForm = document.querySelector('.add-form');
const addFormName = document.querySelector('.add-form-name');
const addFormText = document.querySelector('.add-form-text');
const addFormButton = document.querySelector('.add-form-button');
const wait = document.querySelector('.wait');

const getSafeString = (str) => str.trim()
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;");

export const init = () => {
    addFormButton.setAttribute('disabled', true);

    document.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            AddComment();
        }
    });

    addFormButton.addEventListener('click', () => {
        AddComment();
    })

    addFormName.addEventListener('input', (e) => {
        if (addFormName.value === '') {
            addFormButton.setAttribute('disabled', true);
        } else {
            addFormButton.removeAttribute('disabled')
        }
    });
}

export const AddComment = () => {
    addForm.classList.add('add-form_disabled');
    wait.textContent = 'Комментарий добавляется...';

    postApiComment({
        name: getSafeString(addFormName.value),
        text: getSafeString(addFormText.value),
        date: new Date(),
        forceError: false,
    }).then(() => {
        addForm.classList.remove('add-form_disabled');
        addFormName.value = '';
        addFormText.value = '';
        addFormName.classList.remove('error');
        addFormText.classList.remove('error');
    })
    .catch((error) => {
        addForm.classList.remove('add-form_disabled');

        if (error.message === 'Bad Request') {
            if (addFormName.value === '' || addFormName.value.length < 3) {
                addFormName.classList.add('error');
            }
            if (addFormText.value === '' || addFormText.value.length < 3) {
                addFormText.classList.add('error');
            }
            alert('Имя и комментарий должны быть не короче 3 символов');
            return;
        }

        if (error.message === 'Сервер упал') {
            alert('Сервер сломался, попробуй позже');
            return;
        }

        alert('Ошибка соединения, попробуй позже');
        return;

    })
    .finally(() => {
        wait.textContent = '';
    });

    loadComments();
}

export const addCommentText = (text) => {
    addFormText.value = `${'>'}` + text;
}