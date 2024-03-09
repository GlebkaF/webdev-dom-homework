import { formattedDate } from './formatDate.js';
import { getComments, postComments } from './api.js';
import { showAddingCommentMessage, hideAddingCommentMessage } from './addingCommentMessage.js';
import { renderPeoples } from './renderPeoples.js';

//ПОЛУЧАЕМ КОММЕНТАРИИ ИЗ СЕРВЕРА:

// Определяем список комментариев и добавляем лоадер на список при первой загрузке страницы
const commentListElement = document.getElementById('commentList');
commentListElement.textContent = 'Загружаю список комментариев...';

// Создаем массив, куда будем помещать данные, полученные из API
let peoples = [];

// Определяем функцию fetchComments, которая отправляет GET-запрос для получения комментариев из сервера
const fetchComments = () => {
    getComments()
    .then(function(responseData) {    
        const appComment = responseData.comments.map((comment) => {
            
            return {
                name: comment.author.name,
                time: formattedDate(comment.date),
                text: comment.text,
                likes: 0,
                isLiked: false,
            };
        });

        // Присваиваем массив объектов переменной peoples и вызываем функцию рендера
        peoples = appComment;
        renderPeoples(peoples, commentListElement, textInputElement);
    })
    .catch((error) => {
        if (error.message === 'Ошибка сервера') {
            alert('Север прилег отдохнуть, пробуй еще раз...');
        } else {
            alert('Кажется, интернет прилег отдохнуть, проверь соединение...');
        };
    });
};

// Вызываем функцию fetchComments для получения комментариев сразу при загрузке страницы
fetchComments();


// НОВЫЙ КОММЕНТАРИЙ:

// Определяем элементы input-формы
const buttonElement = document.getElementById('add-button');
const nameInputElement = document.getElementById('name');
const textInputElement = document.getElementById('textArea');

// Назначаем обработчик клика на кнопку добавления комментария
buttonElement.addEventListener("click", () => {
    // Удаляем пробелы из значений полей ввода
    const trimmedName = nameInputElement.value.trim();
    const trimmedText = textInputElement.value.trim();

    nameInputElement.classList.remove("error");
    if (trimmedName === "") {
        nameInputElement.classList.add("error");
        return;
    };

    textInputElement.classList.remove("error");
    if (trimmedText === "") {
        textInputElement.classList.add("error");
        return;
    };

    // Показать текст "Добавляю твой комментарий..." и скрыть форму добавления комментария
    showAddingCommentMessage(commentListElement);
    
    // Отправляем POST-запрос для добавления нового комментария    
    postComments(
        trimmedText, 
        trimmedName
    )
    .then((response) => {
        if (response.status === 500) {
            throw new Error('Ошибка сервера');
        };

        if (response.status === 400) {
            throw new Error('Неверный запрос')
        };
    })
    .then(() => {
        // Получаем обновленный список комментариев, вызвав функцию fetchComments после успешного POST-запроса
    return fetchComments();               
    })
    .then(() => {
        // Очищаем поля ввода после отправки комментария только при успешном POST
        nameInputElement.value = "";
        textInputElement.value = "";
    })
    .catch((error) => {
        if (error.message === 'Ошибка сервера') {
        alert('Севрвер прилег отдохнуть, пробуй еще раз...');            
        } else if (error.message === 'Неверный запрос') {
            alert('Имя или комментарий короче 3-х символов');
            textInputElement.classList.add("error");
            nameInputElement.classList.add("error");
        } else {
            alert('Кажется, интернет прилег отдохнуть, проверь соединение...');
        };        
    })
    .finally(() => {
        // Скрыть текст "Добавляю твой комментарий..." и показать форму добавления комментария
        hideAddingCommentMessage(commentListElement);
        document.getElementById('form-id').style.display = 'flex'; // Показать форму добавления комментария
    });
});
