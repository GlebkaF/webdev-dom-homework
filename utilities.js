import { commentsArr } from './main.js'
import { renderComments } from './render.js'
import { postComment, getComments } from './API.js'
import { baseUrl } from './main.js';

let formName = document.querySelector('.add-form-name');
let formText = document.querySelector('.add-form-text');
let formButton = document.querySelector('.add-form-button');
let loadingForm = document.querySelector('.loading');
let addForm = document.querySelector('.add-form');

export const delay = (interval = 300) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

export const getData = () => {
    return getComments({ baseUrl })
        .then((responseData) => {
            commentsArr = responseData.comments.map((comment) => {
                return {
                    id: comment.id,
                    created: new Date(comment.date).toLocaleString("ru", { year: '2-digit', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' }).replace(',', ''),
                    countLikes: comment.likes,
                    likeSet: comment.isLiked,
                    editComment: false,
                    comment: comment.text,
                    name: comment.author.name
                }
            });
        })
        .then(() => {
            renderComments();
        })
        .catch((error) => {
            console.error(error);
            alert(error);
        });
};

export const addComment = () => {
    if (!formButton.disabled) {
        addForm.classList.add('display_none');
        loadingForm.classList.remove('display_none');
        const postData = () => postComment({ baseUrl })
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