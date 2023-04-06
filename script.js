const inputName = document.querySelector('.add-form-name');
// const nameInputElement = document.getElementById("name-input");
const inputText = document.querySelector('.add-form-text');
// const commentsInputElement = document.getElementById("comments-input");
const comments = document.querySelector('.comments');
// const listElement = document.getElementById("list");
const button = document.querySelector('.add-form-button');
// const buttonElement = document.getElementById("add-button");


// Добавление и формирование даты и времени
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
    // проверка на пустые поля и добавление метода trim(), который удаляет пробельные символы с начала и конца строки.
    if (inputName.value.trim() === '' || inputText.value.trim() === '') {
        return;
    }

    comments.innerHTML += 
    `   <li class="comment">
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

    // Кнопка снова становится неактивной после добавления комментария, т.к. все поля пустые
    switchButton();
}

button.addEventListener('click', sendComment)

// Переход с поля Имя на поле Комментарии при нажатии на Enter
inputName.addEventListener('keyup', (key) => {
    if(key.code === 'Enter') {
        inputText.focus();
    };
})

// После написания текста Enter срабатывал как переход на следующую строку. Добавление события keydown поменяло его использование. Теперь при нажатии Enter публикуется комментарий.
inputText.addEventListener('keydown', (key) => {
    if(key.code === 'Enter') {
        sendComment();
    };
})

// В случае, если пользователь напишет сообщение, а затем его решит стереть. Добавление else.  

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

// Удаление последнего комментария
document.querySelector('.del-last-comment').addEventListener('click', () => {
    const indexLast = comments.innerHTML.lastIndexOf('<li class="comment">');
    comments.innerHTML = comments.innerHTML.slice(0, indexLast);
});