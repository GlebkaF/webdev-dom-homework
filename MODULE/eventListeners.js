import { comments } from "../main.js";
import { renderComments } from "./Render.js";
import { postComments } from "./api.js";
import { delay } from "./templates.js";


export function addComment() {
    const nameElement = document.getElementById('form-name');
    const textElement = document.getElementById('form-text');
    const buttonElement = document.getElementById('add-button');


    nameElement.classList.remove('error');
    textElement.classList.remove('error');
    if (nameElement.value.trim() === '' || textElement.value.trim() === '') {
        if (nameElement.value.trim() === '') {
            nameElement.classList.add('error');
            nameElement.placeholder = '* Имя является обязательным!'
        };
        if (textElement.value.trim() === '') {
            textElement.classList.add('error');
            textElement.placeholder = '* Комментраий является обязательным!'
        };

        buttonElement.disabled = true;
        buttonElement.classList.add('btn')

        // разблокировка кнопки + удаление обводки
        nameElement.addEventListener('click', () => {
            buttonElement.disabled = false;
            buttonElement.classList.remove('btn');
            textElement.classList.remove('error');
        });
        textElement.addEventListener('click', () => {
            buttonElement.disabled = false;
            buttonElement.classList.remove('btn');
            nameElement.classList.remove('error');
        });
        return;
    };


    postComments()


    nameElement.setAttribute('placeholder', 'Введите ваше имя'); //возвращаем placeholder к стандарту после добаваления комментария
    textElement.setAttribute('placeholder', 'Введите ваш коментарий',);//возвращаем placeholder к стандарту после добаваления комментария
};

export const actionCommentListener = () => {
    const buttonElement = document.getElementById('add-button');
    const buttonDeleteElement = document.getElementById('add-button-delete');
    // ВЫЗОВ ФУНКЦИИ НА КЛИК
    buttonElement.addEventListener('click', addComment);
    // ВЫЗОВ ФУНКЦИИ НА ENTER
    document.addEventListener('keyup', (event) => {
        if (event.code === 'Enter') {
            addComment();
        };
    });
    //УДАЛИТЬ ПОСЛЕДНИЙ КОММЕНТАРИЙ
    buttonDeleteElement.addEventListener('click', () => {
        comments.pop();
        renderComments();
    });
}

export const editingComment = () => {
    const commentElements = document.querySelectorAll('.comment-text');
    const textElement = document.getElementById('form-text');

    for (const commentElement of commentElements) {
        commentElement.addEventListener('click', () => {
            const index = commentElement.dataset.index;
            const text = `>${comments[index].text} \n ${comments[index].name}:`;
            textElement.value = text;

        })
    }
}



export function addLike() {
    const likeElements = document.querySelectorAll('.like-button');
    for (let likeElement of likeElements) {
        likeElement.addEventListener('click', (event) => {
            event.stopPropagation(); //Против "ВСПЛЫТИЯ"
            likeElement.style.animation = 'rotating 2s linear infinite';
            let index = likeElement.dataset.index;
            delay(1600).then(() => {
                if (comments[index].isLike) {
                    comments[index].likeCount--;
                    comments[index].isLike = false
                } else {
                    comments[index].likeCount++;
                    comments[index].isLike = true
                }
                renderComments();
            })
        });
    };
};

//РЕДАКТИРОВАНИЕ комментария
export const initEditElements = () => {
    const editButtonElements = document.querySelectorAll('.edit-form-button');
    for (const editButton of editButtonElements) {
        editButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = editButton.dataset.index;
            comments[index].isEdit = true;
            renderComments();
        });
    };
};

//СОХРАНЕНИЕ отредактированного комментария
export const initSaveButtons = () => {
    const formCommentElement = document.getElementById('add-comment');
    const saveButtons = document.querySelectorAll(".save-form-button");
    for (const saveButton of saveButtons) {
        saveButton.addEventListener('click', (event) => {
            event.stopPropagation();
            const index = saveButton.dataset.index;
            comments[index].isEdit = false;
            comments[index].text = formCommentElement.querySelectorAll('.comment')[index].querySelector('textarea').value;
            renderComments();
        });
    }
};
