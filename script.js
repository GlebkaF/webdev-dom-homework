// Определяем функцию для очистки и защиты HTML-строк
const sanitizeHtml = (htmlString) => {
    return htmlString.replaceAll("<", "&lt").replaceAll(">", "&gt");
}

// Создаем массив, куда будем помещать данные, полученные из API
let peoples = [];

// Определяем элементы input-формы
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name');
const textInputElement = document.getElementById('textArea');
const commentListElement = document.getElementById('commentList');

// Пишем функцию рендера для создания разметки
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
                        <div class="comment-text">${people.text
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

    // Красим кнопку лайка и увеличиваем счетчик
    for (let button of document.querySelectorAll(".like-button")) {
        button.addEventListener("click", (event) => { 
            event.stopPropagation();
            const index = event.currentTarget.dataset.index;    
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
            const index = event.currentTarget.dataset.index;
            const currentPost = peoples[index];

            textInputElement.value = `%BEGIN_QUOTE${currentPost.text} : ${currentPost.name}END_QUOTE%`;
            textInputElement.style.whiteSpace = 'pre-line';
        });
    }
}

// Добавляем лоадер на весь список при первой загрузке страницы
commentListElement.textContent = 'Загружаю список комментариев...';

// Определяем функцию fetchComments, которая отправляет GET-запрос для получения комментариев из сервера
const fetchComments = () => {
    fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
        method: "GET"
    })
    .then((response) => {
        return response.json();
    })
    .then(function(responseData) { // здесь почему то не захотела работать вторая стрелочная функция. Я не понял почему...        
        const appComment = responseData.comments.map((comment) => {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }; 
            const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(new Date(comment.date));
            
            return {
                name: comment.author.name,
                time: formattedDate,
                text: comment.text,
                likes: 0,
                isLiked: false,
            };
        });

        // Присваиваем массив объектов переменной peoples и вызываем функцию рендера
        peoples = appComment;
        renderPeoples();
    });
};

// Вызываем функцию fetchComments для получения комментариев сразу при загрузке страницы
fetchComments();

// Назначаем обработчик клика на кнопку добавления комментария
buttonElement.addEventListener("click", () => {
    // Удаляем пробелы из значений полей ввода
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

    // Добавляем лоадер на пост комментария с отключением input-формы
    document.getElementById('form-id').disabled = true;
    document.getElementById('form-id').textContent = 'Добавляю твой комментарий...'
    
    // Отправляем POST-запрос для добавления нового комментария
    fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
        method: "POST",
        body: JSON.stringify({
            text: sanitizeHtml(trimmedText),
            name: sanitizeHtml(trimmedName),        
        }),
    })
    .then(() => {
        // Получаем обновленный список комментариев, вызвав функцию fetchComments после успешного POST-запроса
        fetchComments();        
    });

    // Очищаем поля ввода после отправки комментария
    nameInputElement.value = "";
    textInputElement.value = "";
});
