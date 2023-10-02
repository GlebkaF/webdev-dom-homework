import { renderComments } from './renderComments.js'
import { postComment, getComments } from './API.js'
import { baseUrl, changeCommentsArr } from './globalVariables.js';

const delay = (interval = 300) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

const changeDataToLocal = (date) => new Date(date).toLocaleString("ru", { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', '');

const getData = () => {
    return getComments()
        .then((responseData) => {
            changeCommentsArr(responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    created: changeDataToLocal(comment.date),
                    countLikes: comment.likes,
                    likeSet: comment.isLiked,
                    editComment: false,
                    comment: comment.text,
                    name: comment.author.name
                }
            }));
        })
        .then(() => {
            renderComments();
        })
        .catch((error) => {
            console.error(error);
            alert(error);
        });
};

const addComment = () => {
    let formName = document.querySelector('.add-form-name');
    let formText = document.querySelector('.add-form-text');
    let formButton = document.querySelector('.add-form-button');
    let loadingForm = document.querySelector('.loading');
    let addForm = document.querySelector('.add-form');
    if (!formButton.disabled) {
        addForm.classList.add('display_none');
        loadingForm.classList.remove('display_none');
        const postData = () => postComment()
            .then((response) => {
                switch (response.status) {
                    case 400:
                        return Promise.reject('Произошла ошибка, повторите попытку позже');
                    case 500:
                        return Promise.reject('Сервер недоступен');
                }

                formName.value = '';
                formText.value = '';
                return getData();
            })
            .then(() => {
                addForm.classList.remove('display_none');
                loadingForm.classList.add('display_none');
                addForm.scrollIntoView();
            })
            .catch((error) => {
                console.error(error);
                if (error === 'Сервер недоступен') {
                    postData();
                }
                else {
                    alert(error);
                    addForm.classList.remove('display_none');
                    loadingForm.classList.add('display_none');
                }
            });

        postData();
    }
};

export { delay, getData, addComment, changeDataToLocal };