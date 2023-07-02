import { users, updateUsers } from "./main.js";
import { listCommentElement } from "./main.js";
import { enterCommentElement } from "./main.js";
import { enterNameElement } from "./main.js";
import { renderUsers } from "./renderComments.js";

// Получаем список комментов с помощью функции fetch и метода запросов GET
const fetchPromiseFuncGet = () => {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/rashid-abdulkhamidov/comments',
        {
            method: "GET",
            // forceError: true, 
        })
        // Показываем пользователю сообщение о том, что происходит загрузка комментариев
        .then((response) => {
            console.log(response);
            listCommentElement.innerHTML = 'Идет загрузка';
            return response.json();     //декодируем ответ в формате JSON и переходим на выполнение следующего then
        })
        .then((responseData) => {
            //Преобразовываем данные из формата API в формат приложения
            const currentDate = new Date()
            let newDate = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes()
            const appComments = responseData.comments.map((comment) => {
                return {
                    //Достаем имя автора
                    name: comment.author.name,
                    //Преобразовываем дату-строку в Date
                    date: comment.date,
                    text: comment.text,
                    likes: comment.likes,
                    // В API пока нет признака лайкнутости
                    // Поэтому пока добавляем заглушку
                    isLiked: comment.isLiked,
                };
            });
            updateUsers(appComments);
        })
};

// Добавляем коммент и имя в API с помошью метода POST
const fetchPromiseFuncPost = () => {
    //Преобразовываем данные из формата API в формат приложения
    const currentDate = new Date()
    let newDate = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes()
    return fetch(
        'https://wedev-api.sky.pro/api/v1/rashid-abdulkhamidov/comments',
        {
            method: "POST",
            body: JSON.stringify({     // Преобразование объекта в JSON строку(иначе будет приходить ошибка 400)
                text: enterCommentElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),     //Добавляем коммент с заменой < и > в целях безопасности
                name: enterNameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),     //Добавляем имя с заменой < и > в целях безопасности
                date: newDate,
                // forceError: true, //Параметр при котором POST-запрос будет в половине случаев отвечать 500-й ошибкой
            }),
        })
        .then((response) => {
            if (response.status === 400) {     //Проверяем ответ от API на наличие ошибки 400
                alert("Имя и комментарий должны быть не короче 3 символов")     //Сообщение для пользователя если пришел ответ с ошибкой 400
                throw new Error("Я остановил цепочку так как ошибка 400")     //прерывает then функцию, после чего выполняется условие if в функции catch
            } if (response.status === 500) {     //Проверяем ответ от API на наличие ошибки 500
                alert("Сервер сломался, попробуй позже")     //Сообщение для пользователя если пришел ответ с ошибкой 500
                throw new Error("Я остановил цепочку так как ошибка 500")   //прерывает then функцию, после чего выполняется условие if в функции catch
            } else {
                return response.json();     //иначе, если никаких ошибок нет, то декодируем ответ в формате JSON и переходим на выполнение следующего then
            }
        })
        .then(() => {
            enterCommentElement.value = "";     // Очищаем инпут с комментарием после успешного добавления комментария
            enterNameElement.value = "";     // Очищаем инпут с именем после успешного добавления комментария
            //Получаем НОВЫЙ список комментов с помощью метода запросов GET
            // Рендерим НОВЫЙ список комментов
            fetchPromiseFuncGet().then(() => renderUsers());
        })
        .catch((error) => {
            if (error.message === "Я остановил цепочку так как ошибка 400") {
                return;
            }
            if (error.message === "Я остановил цепочку так как ошибка 500") {
                return;
            }
            alert("Кажется, у вас сломался интернет, попробуйте позже");
        })
}

export { fetchPromiseFuncGet, fetchPromiseFuncPost };