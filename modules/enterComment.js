import { postComment } from "./api.js";

export const enterComment = ({ listElement, listElementData, loaderCommentElement, formElement, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, nameInputElement, renderListElement }) => {
    nameInputElement.classList.remove('error');
    commentTextareaElement.classList.remove('error');

    if (nameInputElement.value === '' && commentTextareaElement.value === '') {
        nameInputElement.classList.add('error');
        commentTextareaElement.classList.add('error');
        return;
    }
    else if (commentTextareaElement.value === '') {
        commentTextareaElement.classList.add('error');
        return;
    }
    else if (nameInputElement.value === '') {
        nameInputElement.classList.add('error');
        return;
    }
    else {
        loaderCommentElement.style.display = 'block';
        formElement.style.display = 'none';
    }


    //Добавляем комментарий в список комментариев (fetch POST)
    const fetchPost = () => {
        postComment({
            text: commentTextareaElement.value,
            name: nameInputElement.value,
        }).then((responseData) => {
            console.log(responseData);

            return fetchGet();
        })
            .then(() => {
                formElement.style.display = 'flex';
                loaderCommentElement.style.display = 'none';
                nameInputElement.value = '';
                commentTextareaElement.value = '';
                nameInputElement.classList.remove('error');
                commentTextareaElement.classList.remove('error');
            })
            .catch((error, typeError) => {
                if (error.message === 'Имя и комментарий должны быть не короче 3 символов') {
                    alert('Имя и комментарий должны быть не короче 3 символов');
                    console.log(3);
                }
                else if (error.message === 'Сервер сломался, попробуй позже') {
                    console.log(4);
                    fetchPost();
                }
                else {
                    console.log(5);
                    alert("Кажется, у вас сломался интернет, попробуйте позже");
                }
                console.warn(error);
                formElement.style.display = 'flex';
                loaderCommentElement.style.display = 'none';
            });
    }

    fetchPost();
    renderListElement({ listElement, listElementData, loaderCommentElement, formElement, initLikeEvent, initRedactorEvent, initDeleteEvent, initAnsverEvent, commentTextareaElement, enterComment, nameInputElement });
}