import { getComments, postComment } from './API.js'
import { renderComments } from './render.js'
import { getData } from './utilities.js';

let formName = document.querySelector('.add-form-name');
let formText = document.querySelector('.add-form-text');
let comments = document.querySelector('.comments');
let formButton = document.querySelector('.add-form-button');
let deleteLastBotton = document.querySelector('.delete-last__form-button');
let loadingForm = document.querySelector('.loading');
let addForm = document.querySelector('.add-form');
let quoteEdit;
export let baseUrl = 'https://wedev-api.sky.pro/api/v1/evgeniy-zaretskiy8/comments';
export let commentsArr = [];

window.addEventListener('load', () => {
    let loaderText = document.createElement('p');
    loaderText.className = 'startLoader';
    loaderText.textContent = 'Пожалуйста подождите, загружаю комментарии...';
    comments.before(loaderText);
    getData()
        .then(() => {
            loaderText.remove();
        });
});