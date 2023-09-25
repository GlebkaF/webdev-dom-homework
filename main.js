import { getData } from './utilities.js';

let comments = document.querySelector('.comments');

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