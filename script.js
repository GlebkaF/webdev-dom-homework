const inputName = document.querySelector('.add-form-name');
const inputText = document.querySelector('.add-form-text');
const comments = document.querySelector('.comments');
const buttonAdd = document.querySelector('.add-form-button');


// масив комментариев, тут хранятся все комментарии
const arrComments = [
    {
        name: 'Глеб Фокин',
        text: 'Это будет первый комментарий на этой странице',
        date: '12.02.22 12:18',
        isLike: false, // истина - закрашивает сердечко
        likeCounter: 3,
        isEdit: false
    },

    {
        name: 'Варвара Н.',
        text: 'Мне нравится как оформлена эта страница! ❤',
        date: '13.02.22 19:22',
        isLike: true,
        likeCounter: 75,
        isEdit: false
    }
];

// ивенты на кнопки лайка
const eventLike = () => {
    document.querySelectorAll('.like-button').forEach((button => {
        button.addEventListener('click', (event) => {
            // отменяем всплытие
            event.stopPropagation();
            objComment = arrComments[button.dataset.index];
            if (objComment.isLike){
                objComment.likeCounter -= 1; 
                objComment.isLike = false;
            } else {
                objComment.likeCounter += 1; 
                objComment.isLike = true;
            }
            // после добавления лайка в объект, его надо перерендерить для отображения
            renderAllComments();
        })
    }));
}



// ивенты на редакитрования
const eventEdit = () => {
    document.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', (event) => {
            // отменяем всплытие
            event.stopPropagation();
            objComment = arrComments[button.dataset.index];
            if (objComment.isEdit) {
                if (objComment.text.trim() === '') return;  // в случае, если человек сотрет полностью комментарий кнопка сохранить станет неактивна;
                button.innerHTML = 'Редактировать';
                objComment.isEdit = false;
            } else {
                button.innerHTML = 'Сохранить';
                objComment.isEdit = true;
            }
            renderAllComments();
        })
    })
}

// ивент на реплай коммента
const eventReply = () => {
    document.querySelectorAll('.comment').forEach(item => {
        item.addEventListener('click', () => {
            objComment = arrComments[item.dataset.index];
            let str = objComment.text;

            // в случае если у нас будет реплай на реплай, мы оставим только ответ
            // цикл на случай, если будет несколько реплаев
            while (str.indexOf("<div class='quote'>") !== -1) { 
                const substr = str.substring(0, str.indexOf('</div>') + '</div>'.length);
                str = str.replace(substr, '');
            }

            inputText.value += `[BEGIN_QUOTE]${str} - ${objComment.name}[END_QUOTE]\n\n`;

            // переносим пользователя в поле ввода текста
            inputText.focus();
        })
    })
}

// ивенты на запись нового комментария при редактировании input
const evenEditInput = () => {
    document.querySelectorAll('.input-text').forEach(input => {
        input.addEventListener('keyup', (key) => {
            objComment = arrComments[input.dataset.index];
            objComment.text = input.value;
        })

        // В случае редактирования, при клики мыши срабатывало событие реплая
        input.addEventListener('click', (event) => {
            event.stopPropagation();
        }) 
    })
}


// рендер комментария
const renderComment = (name, text, date, isLike, likeCounter, isEdit, index) => {

    // let str = text;
    // while (str.indexOf("<div class='quote'>") !== -1 && isEdit) { 
    //     const substr = str.substring(0, str.indexOf('</div>') + '</div>'.length);
    //     str = str.replace(substr, '');
    // }


    comments.innerHTML += ` 
        <li class="comment" data-index="${index}">
            <div class="comment-header">
            <div>${name}</div>
            <div>${date}</div>
            </div>
            <div class="comment-body">
                ${isEdit ? `<textArea data-index="${index}" class="input-text">${text}</textArea>` : `<div class="comment-text">${text}</div>`}
                <button data-index="${index}" class="edit-button">${isEdit ? 'Сохранить' : 'Редактировать'}</button>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${likeCounter}</span>
                <button data-index="${index}" class="like-button ${isLike ? '-active-like': ''}"></button>
            </div>
            </div>
        </li>
    `;

}

// отрисовка всех комментариев, из html комменты удалил
const renderAllComments = () => {
// перед рендером удаляем все комменты которые были, чтобы они не дублировались
    comments.innerHTML = '';

    arrComments.forEach((comment, index) => renderComment(comment.name, comment.text, comment.date, comment.isLike, comment.likeCounter, comment.isEdit, index));

    // заново добавляем евенты на все кнопки, чтобы евент попал на новый коммент с кнопкой
    eventLike();
    eventEdit();
    evenEditInput();
    eventReply();
}



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

    arrComments.push({        
        name: inputName.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;'),
        text: inputText.value
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('[BEGIN_QUOTE]', "<div class='quote'>")
        .replaceAll('[END_QUOTE]', '</div>'),
        date: getDate(new Date),
        like: false,
        likeCounter: 0
    })

    renderAllComments();

    inputName.value = '';
    inputText.value = '';

    // после добавления коммента кнопка снова становится неактивной, так как все поля пустые
    switchButton();
}

// Не прописал колбек внутри потому что потом вызову эту функцию в другом событии 
buttonAdd.addEventListener('click', sendComment)

// Прыжок на поле комментариев при нажатии на Enter в поле имя
inputName.addEventListener('keyup', (key) => {
    if(key.code === 'Enter') {
        key.preventDefault();
        inputText.focus();
    };
})

// Использовал событие keydown, потому что при написаном тексте можно было зажать Enter и он срабатывал до тех пор пока его не отпустят
inputText.addEventListener('keydown', (key) => {
    if(key.code === 'Enter') {
        // чтобы не срабатывал enter
        key.preventDefault();
        sendComment();
    };
})


/* 
1. else добавлен на случай, если пользователь напишет сообщение, а затем его сотрет 
2. добавил класс avtive и накинул на него :hover потому что hover отрабатывал и на неактивную кнопку.
*/
const switchButton = () => {
    if (inputName.value.trim() !== '' && inputText.value.trim() !== '') {
        buttonAdd.classList.add('active');
        buttonAdd.classList.remove('inactive');
    } else {
        buttonAdd.classList.add('inactive');
        buttonAdd.classList.remove('active');
    }
}

inputText.addEventListener('input', switchButton);
inputName.addEventListener('input', switchButton);


document.querySelector('.del-last-comment').addEventListener('click', () => {
    const indexLast = comments.innerHTML.lastIndexOf('<li class="comment">')
    comments.innerHTML = comments.innerHTML.slice(0, indexLast);

    // так же удаляем из массива, чтобы не было ошибок при рендере
    arrComments.pop();
    
    // Заново накидываем ивенты, они почему-то сбрасываются
    eventLike();
    eventEdit();
    evenEditInput();
})


// start
renderAllComments();