// Создаем объекты, которые будем рендерить:
const peoples = [
    {
        name: "Глеб Фокин",
        time: "12.02.22 12:18",
        likes: 3,
        comment: "Это будет первый комментарий на этой странице",
        isLiked: false
    },
    {
        name: "Варвара Н.",
        time: "13.02.22 19:22",
        likes: 75,
        comment: "Мне нравится как оформлена эта страница! ❤",
        isLiked: false
    },
];

// Кладем в переменную список комментариев, который будет меняться:
const commentListElement = document.getElementById('commentList');

// Пишем функцию рендера для создания разметки:
const renderPeoples = () => {    
    const commentsHtml = peoples
        .map((people, index) => {
            return `
                <li class="comment">
                    <div class="comment-header">
                        <div>${people.name}</div>
                        <div>${people.time}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${people.comment}</div>
                    </div>
                    <div class="comment-footer">
                        <div class="likes">
                            <span class="likes-counter">${people.likes}</span>
                            <button data-index=${index} class="like-button ${people.isLiked ? 'active-like' : ''}"></button>
                        </div>
                    </div>
                </li>`;
        })
        .join("");

    commentListElement.innerHTML = commentsHtml;

    // Определяем кнопку лайка для JS:
    const likeButtonElements = document.querySelectorAll(".like-button");

    // Красим кнопку лайка:
    for (let index = 0; index < likeButtonElements.length; index++) {
        const button = likeButtonElements[index];
        button.addEventListener("click", () => {  
            const currentPeople = peoples[index];               

            if (currentPeople.isLiked) {
                currentPeople.likes--;
            } else {
                currentPeople.likes++;
            };

            currentPeople.isLiked = !currentPeople.isLiked;

            renderPeoples();
        });
    }
}

// Определяем для JS элементы input-формы:
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name');
const textInputElement = document.getElementById('textArea');

// Создаем отформатированную дату для нового комментария:
const newDate = new Date();
const currentDate = newDate;
const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' };

// Прикрепляем обработчик к кнопке добавления комментария:
buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    }

    textInputElement.classList.remove("error");
    if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
    }

    const newComment = {
        name: nameInputElement.value,
        time: currentDate.toLocaleDateString('ru-RU', options),
        likes: 0,
        comment: textInputElement.value,
        isLiked: false
    };

    peoples.push(newComment);
    renderPeoples();
});

renderPeoples();