const inputName = document.querySelector('.add-form-name');
const inputText = document.querySelector('.add-form-text');
const comments = document.querySelector('.comments');
const button = document.querySelector('.add-form-button');


// форматирование даты
const getDate = () => {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

 
const sendComment = () => {
    // проверка на пустые поля
    if (inputName.value.trim() === '' || inputText.value.trim() === '') {
        return;
    }

    comments.innerHTML += ` 
        <li class="comment">
            <div class="comment-header">
            <div>${inputName.value}</div>
            <div>${getDate()}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${inputText.value}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">0</span>
                <button class="like-button"></button>
            </div>
            </div>
        </li>
    `;

    inputName.value = '';
    inputText.value = '';

    // после добавления коммента кнопка снова становится неактивной, так как все поля пустые
    switchButton();
}

// Не прописал колбек внутри потому что потом вызову эту функцию в другом событии 
button.addEventListener('click', sendComment)

// Прыжок на поле комментариев при нажатии на Enter в поле имя
inputName.addEventListener('keyup', (key) => {
    if(key.code === 'Enter') {
        inputText.focus();
    };
})

// Использовал событие keydown, потому что при написаном тексте можно было зажать Enter и он срабатывал до тех пор пока его не отпустят
inputText.addEventListener('keydown', (key) => {
    if(key.code === 'Enter') {
        sendComment();
    };
})


/* 
1. else добавлен на случай, если пользователь напишет сообщение, а затем его сотрет 
2. добавил класс avtive и накинул на него :hover потому что hover отрабатывал и на неактивную кнопку.
*/
const switchButton = () => {
    if (inputName.value.trim() !== '' && inputText.value.trim() !== '') {
        button.classList.add('active');
        button.classList.remove('inactive');
    } else {
        button.classList.add('inactive');
        button.classList.remove('active');
    }
}

inputText.addEventListener('input', switchButton);
inputName.addEventListener('input', switchButton);


document.querySelector('.del-last-comment').addEventListener('click', () => {
    const indexLast = comments.innerHTML.lastIndexOf('<li class="comment">')
    comments.innerHTML = comments.innerHTML.slice(0, indexLast);
})