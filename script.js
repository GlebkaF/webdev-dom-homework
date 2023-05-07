"use strict";

const addFormButton = document.querySelector(".add-form-button");
const addFormName = document.querySelector(".add-form-name");
const addFormText = document.querySelector(".add-form-text");
const commentsList = document.querySelector(".comments");
const form = document.querySelector(".add-form");
const removeLastCommentButton = document.querySelector(".remove-last-comment-button");
const nameInput = document.querySelector('.add-form-name');
const textInput = document.querySelector('.add-form-text');
const submitButton = document.querySelector('.add-form-button');


let comments = [ //ммассив с комментариями 
    // {
    //     author: 'Глеб Фокин',
    //     date: '12.02.22 12:18',
    //     text: 'Это будет первый комментарий на этой странице',
    //     likes: 3,
    //     isLiked: true
    // },
    // {
    //     author: 'Варвара Н.',
    //     date: '13.02.22 19:22',
    //     text: 'Мне нравится как оформлена эта страница! ❤',
    //     likes: 74,
    //     isLiked: false
    // },

    // ...
];


function dateElement() {
    let date = new Date()
    let monthArray = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    let Minute = String(date.getMinutes()).length < 2 ? '0' + date.getMinutes() : date.getMinutes();
    let Hours = String(date.getHours()).length < 2 ? '0' + date.getHours() : date.getHours();
    let Day = String(date.getDate()).length < 2 ? '0' + date.getDate() : date.getDate();
    let Month = monthArray[+date.getMonth()]
    let Year = String(date.getFullYear()).slice(2);
    let str = Day + '.' + Month + '.' + Year + ' ' + Hours + ':' + Minute;
    return str
}


//подключение и рендер комментариев из API
//получение данных с сервера
const fetchPromise = fetch(
    "https://webdev-hw-api.vercel.app/api/v1/artyom-kovalchuk/comments",
    {
        method: "GET",
    }
);

fetchPromise.then((response) => {
    console.log(response);

    const jsonPromise = response.json();

    jsonPromise.then((responseData) => {
        console.log(responseData);

        const appComments = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: dateElement(),
                text: comment.text,
                likes: comment.likes,
                isliked: false,
            };

        });

        comments = appComments;
        renderComments(comments);
    });
});


//рендер комментариев, вызываем функцию ответа на комментарии, вызываем функцию кнопки лайка
function renderComments(comments) {
    // очищаем список комментариев перед добавлением новых
    commentsList.innerHTML = '';

    // создаем новый массив с разметкой комментариев
    const commentItems = comments
        .map(comment => `
          <li class="comment">
            <div class="comment-header">
              <div>${comment.name}</div>
              <div>${comment.date}</div>
            </div>
            <div class="comment-body">
              <div class="comment-text">${comment.text}</div>
            </div>
            <div class="comment-footer">
              <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
              </div>
            </div>
          </li>`
        );

    const commentsHTML = commentItems
        .join('');

    // добавляем новый список комментариев на страницу
    commentsList.insertAdjacentHTML('beforeend', commentsHTML);

    addCommentReplyEvent();

    setupLikeButtons();


}

renderComments(comments);


//добавляем новый комментарий в массив
function addComment() {
    const newComment = {
      name: nameInput.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      date: dateElement(),
      text: textInput.value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;"),
      likes: 0,
      isLiked: false,
    };
  
    fetch("https://webdev-hw-api.vercel.app/api/v1/artyom-kovalchuk/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
    }).then((response) => {
      console.log(response);
    });
  
    comments.push(newComment);
    renderComments(comments);
  }




//кнопка добавления комментария
addFormButton.addEventListener("click", (event) => { // находим кнопку "Написать", добавляем новый комментарий
    event.preventDefault();

    const name = addFormName.value.trim();
    const text = addFormText.value.trim();

    if (!name || !text) {
        alert("Необходимо указать имя и комментарий!");
        return;
    }

    const date = new Date().toLocaleString();

    addComment()

    addFormName.value = "";
    addFormText.value = "";
});

validateForm();


//удаление последнего комментария
function removeLastComment() {
    if (comments.length > 0) {
        comments.pop(); // удаляем последний элемент из массива комментариев
        renderComments(comments); // рендерим обновленный список комментариев
    }
}

removeLastCommentButton.addEventListener("click", removeLastComment);


// нажатие enter 
addFormText.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && !addFormButton.disabled) {
        addFormButton.click();
    }
});


//кнопка лайка
function setupLikeButtons() {
    const likeButtons = document.querySelectorAll('.like-button');

    likeButtons.forEach((button, index) => {
        const comment = comments[index];

        button.addEventListener('click', event => {
            event.stopPropagation();

            if (comment.isLiked) {
                comment.likes--;
                comment.isLiked = false;
            } else {
                comment.likes++;
                comment.isLiked = true;
            }

            renderComments(comments);
        });
    });
}


//функция ответа на комментарии
function addCommentReplyEvent() {
    const commentToReply = document.querySelectorAll('.comment');
    commentToReply.forEach(comment => {
        comment.addEventListener('click', () => {
            const author = comment.querySelector('.comment-header div:first-child').textContent;
            const text = comment.querySelector('.comment-text').textContent;
            addFormText.value = `@${author} \n\n > ${text}, `;
            addFormText.focus();
        });
    });
}



// disabled
function handleInput() {
    const nameValue = nameInput.value.trim();
    const textValue = textInput.value.trim();

    if (nameValue !== '' && textValue !== '') {
        submitButton.removeAttribute('disabled');
        submitButton.classList.remove('disabled');
    } else {
        submitButton.setAttribute('disabled', true);
        submitButton.classList.add('disabled');
    }
}

nameInput.addEventListener('input', handleInput); // проверка заполнености двух полей
textInput.addEventListener('input', handleInput);


// разблокирует кнопку, если поля не пустые
function validateForm() {
    const nameValue = addFormName.value.trim();
    const textValue = addFormText.value.trim();
    const isValid = nameValue !== "" && textValue !== "";
    addFormButton.disabled = !isValid;
    addFormButton.classList.toggle("disabled", !isValid);
}
