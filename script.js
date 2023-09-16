"use strict";
let formName = document.querySelector('.add-form-name');
let formText = document.querySelector('.add-form-text');
let comments = document.querySelector('.comments');
let formButton = document.querySelector('.add-form-button');
let deleteLastBotton = document.querySelector('.delete-last__form-button');
let loadingForm = document.querySelector('.loading');
let addForm = document.querySelector('.add-form');
let quoteEdit;
let baseUrl = 'https://wedev-api.sky.pro/api/v1/evgeniy-zaretskiy/comments';
let commentsArr = [];

const getData = () => {
    fetch(baseUrl, {
        method: 'GET'
    }).then((response) => {
        response.json().then((responseData) => {
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
            renderComments();
        });
    });
};

const likeButtonsListener = () => {
    let likeBottons = document.querySelectorAll('.like-button');

    for (let likeBotton of likeBottons) {
        likeBotton.addEventListener('click', () => {
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
    }
};

const commentsListener = () => {
    let comments = document.querySelectorAll('.comment-text');

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
        editBotton.addEventListener('click', () => {
            commentsArr[editBotton.dataset.indx].editComment = true;
            quoteEdit =
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
    if (formName.value === "" || formText.value === "")
        formButton.disabled = true;
    else
        formButton.disabled = false;
};

const addComment = () => {
    if (!formButton.disabled) {
        addForm.classList.add('display_none');
        loadingForm.classList.remove('display_none');
        fetch(baseUrl, {
            method: 'POST',
            body: JSON.stringify({ text: formText.value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'), name: formName.value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;') })
        }).then((response) => {
            formName.value = '';
            formText.value = '';
            getData();
            addForm.classList.remove('display_none');
            loadingForm.classList.add('display_none');
        });
    }
};

const deleteLastButtonFunc = () => {
    commentsArr.pop();
    renderComments();
};

const keyEnter = (event) => {
    if (event.code === 'Enter')
        addComment();
};

const renderComments = () => {
    comments.innerHTML = '';
    comments.innerHTML = comments.innerHTML + commentsArr.map((el, indx) => `<li class="comment">
          <div class="comment-header">
            <div>${el.name}</div>
            <div>${el.created}</div>
          </div>
          <div class="comment-body">
            <div class="comment-text ${el.editComment ? 'display_none' : ''}" data-text="${el.comment}" data-name="${el.name}">
              ${el.comment.replaceAll('QUOTE_BEGIN', '<div class="quote">').replaceAll('QUOTE_END', '</div>')}
            </div>
            <textarea class="edit-comment ${!el.editComment ? 'display_none' : ''}" type="textarea" rows="1">${el.comment.replace(el.comment.slice(el.comment.indexOf('QUOTE_BEGIN'), el.comment.lastIndexOf('QUOTE_END') > -1 ? el.comment.lastIndexOf('QUOTE_END') + 9 : -1), '')}</textarea>
          </div>
          <div class="comment-footer">
            <button class="edit-button ${el.editComment ? 'display_none' : ''}" data-comment_text="${el.comment}"  data-indx=${indx}>Редактировать</button>
            <button class="save-comment-button ${!el.editComment ? 'display_none' : ''}" data-indx=${indx} data-quote="${el.comment.slice(el.comment.indexOf('QUOTE_BEGIN'), el.comment.lastIndexOf('QUOTE_END') > -1 ? el.comment.lastIndexOf('QUOTE_END') + 9 : -1)}">Сохранить</button>
            <div class="likes">
              <span class="likes-counter">${el.countLikes}</span>
              <button class="like-button ${el.likeSet ? '-active-like' : ''}" data-indx=${indx}></button>
            </div>
          </div>
        </li >`).join('');

    formName.addEventListener('input', buttonDisable);
    formText.addEventListener('input', buttonDisable);

    formButton.addEventListener('click', addComment);

    formName.addEventListener('keyup', keyEnter);
    formText.addEventListener('keyup', keyEnter);

    deleteLastBotton.addEventListener('click', deleteLastButtonFunc);

    likeButtonsListener();
    editButtonsListener();
    saveCommentButtonsListener();
    commentsListener();
    quoteListener();
    buttonDisable();
};

getData();