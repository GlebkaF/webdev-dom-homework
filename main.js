import { formattedDate } from './formatDate.js';
import { getComments } from './api.js';
import { renderPeoples } from './renderPeoples.js';

//ПОЛУЧАЕМ КОММЕНТАРИИ ИЗ СЕРВЕРА:

// Создаем массив, куда будем помещать данные, полученные из API
export let peoples = [];

// Определяем функцию fetchComments, которая отправляет GET-запрос для получения комментариев из сервера
export const fetchComments = () => {
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
        renderPeoples(peoples);
    })
    .catch((error) => {
        if (error.message === 'Ошибка сервера') {
            alert('Север прилег отдохнуть, пробуй еще раз...');
        } else {
            // alert('Кажется, интернет прилег отдохнуть, проверь соединение...');
        };
    });
};

// Вызываем функцию fetchComments для получения комментариев сразу при загрузке страницы
fetchComments();

