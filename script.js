const fetchPromice = fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
    method: "GET"
});

fetchPromice.then((response) => {
    response.json().then((responseData) =>{
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

        peoples = appComment;
        renderPeoples();
    })
});


// Создаем объекты, которые будем рендерить:
let peoples = [];

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


    // Красим кнопку лайка и увеличиваем счетчик:    
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

    // const newComment = {
    //     name: sanitizeHtml(trimmedName),
    //     time: currentDate.toLocaleDateString('ru-RU', options),
    //     likes: 0,
    //     text: sanitizeHtml(trimmedText),
    //     isLiked: false
    // };

    // peoples.push(newComment);

    fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
        method: "POST",
        body: JSON.stringify({
            text: sanitizeHtml(trimmedText),
            name: sanitizeHtml(trimmedName),        
        }),
    })
    .then(() => {
        // После успешного выполнения POST-запроса делаем GET-запрос для получения обновленных данных
        fetch("https://wedev-api.sky.pro/api/v1/aleksey-poplaukhin/comments", {
            method: "GET"
        })        
        .then((response) => response.json()).then((responseData) =>{
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

            peoples = appComment;
            renderPeoples();
        })
    });

    // Очищаем поля ввода после отправки комментария:
    nameInputElement.value = "";
    textInputElement.value = "";
});