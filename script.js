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

const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt").replaceAll(">", "&gt");
}

// Кладем в переменную список комментариев, который будет меняться:
const commentListElement = document.getElementById('commentList');

// Пишем функцию рендера для создания разметки:
const renderPeoples = () => {    
    const commentsHtml = peoples
        .map((people, index) => {
            return `
                <li data-index=${index} class="comment">
                    <div class="comment-header">
                        <div>${people.name}</div>
                        <div>${people.time}</div>
                    </div>
                    <div class="comment-body">
                        <div class="comment-text">${people.comment
                            .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                            .replaceAll("END_QUOTE%", "</div>")}
                        </div>
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
        button.addEventListener("click", (event) => { 
            event.stopPropagation();    
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


    // Ответ на комментарий
    for (const commentElement of document.querySelectorAll(".comment")) {
        commentElement.addEventListener("click", (event) => {
            const index = event.currentTarget.dataset.index; // Получаем индекс комментария
            const currentPost = peoples[index]; // Получаем данные текущего комментария

            textInputElement.value = `%BEGIN_QUOTE${currentPost.comment} : ${currentPost.name}END_QUOTE%`;
            textInputElement.style.whiteSpace = 'pre-line';
        });
    }

}

// Определяем для JS элементы input-формы:
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name');
const textInputElement = document.getElementById('textArea');

// Прикрепляем обработчик к кнопке добавления комментария:
buttonElement.addEventListener("click", () => {
    // Удаляем пробелы из значений полей ввода:
    const trimmedName = nameInputElement.value.trim();
    const trimmedText = textInputElement.value.trim();

    nameInputElement.classList.remove("error");
    if (trimmedName === "") {
        nameInputElement.classList.add("error");
        return;
    }

    textInputElement.classList.remove("error");
    if (trimmedText === "") {
        textInputElement.classList.add("error");
        return;
    }

    // Создаем отформатированную дату для нового комментария:
    const newDate = new Date();
    const currentDate = newDate;
    const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }; 

    const newComment = {
        name: sanitizeHtml(trimmedName),
        time: currentDate.toLocaleDateString('ru-RU', options),
        likes: 0,
        comment: sanitizeHtml(trimmedText),
        isLiked: false
    };

    peoples.push(newComment);
    renderPeoples();

    // Очищаем поля ввода после отправки комментария:
    nameInputElement.value = "";
    textInputElement.value = "";
});

renderPeoples();