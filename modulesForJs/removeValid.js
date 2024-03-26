// Отмена валидации (чтобы не было красных полей)


export function removeValidation() {

    const nameInputElement = document.getElementById('name-input');
    const commentInputElement = document.getElementById('comment-input');

    nameInputElement.addEventListener('click', () => {
        nameInputElement.classList.remove('error');
        commentInputElement.classList.remove('error');
    });
    commentInputElement.addEventListener('click', () => {
        nameInputElement.classList.remove('error');
        commentInputElement.classList.remove('error');
    });
};

