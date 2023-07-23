//В этом модуле находится только то что связано с запросами в API
import { updateUsers } from "./main.js";
import { renderUserComments, token } from "./renderComments.js";

const host = "https://wedev-api.sky.pro/api/v2/rashid-abdulkhamidov/comments";

// Получаем список комментов с помощью функции fetch и метода запросов GET
export const getTodo = () => {
    return fetch(
        host,
        {
            method: "GET",
        })
        .then((response) => { // Добавить индикатор загрузки
            return response.json();     //декодируем ответ в формате JSON и переходим на выполнение следующего then
        })
        .then((responseData) => { //Преобразовываем данные из формата API в формат приложения
            const currentDate = new Date()
            let newDate = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes()
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: comment.date,
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: comment.isLiked,
                };
            });
            updateUsers(appComments);
        })
};

// Добавляем коммент и имя в API с помошью функции fetch и метода запросов POST
export const addTodo = ({ token }) => {

    const enterNameElement = document.getElementById("enter-name")
    const enterCommentElement = document.getElementById("enter-comment")

    //Преобразовываем данные из формата API в формат приложения
    const currentDate = new Date()
    let newDate = currentDate.getDate() + '.' + currentDate.getMonth() + '.' + currentDate.getFullYear() + ' ' + currentDate.getHours() + ':' + currentDate.getMinutes()
    return fetch(
        host,
        {
            method: "POST",
            headers: {
                authorization: token,
            },
            body: JSON.stringify({     // Преобразование объекта в JSON строку(иначе будет приходить ошибка 400)
                text: enterCommentElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),     //Добавляем коммент с заменой < и > в целях безопасности
                name: enterNameElement.value.replaceAll("<", "&lt;").replaceAll(">", "&gt;"),     //Добавляем имя с заменой < и > в целях безопасности
                date: newDate,
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
            getTodo().then(() => renderUserComments());
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
};


// https://github.com/GlebkaF/webdev-hw-api/blob/main/pages/api/user/README.md
// Авторизуемся с помощью функции fetch и метода запросов POST
export const loginTodo = ({ login, password }) => {
    return fetch(
        "https://wedev-api.sky.pro/api/user/login",
        {
            method: "POST",
            body: JSON.stringify({
                login,
                password,
            })
        }).then((response) => { // Добавить индикатор загрузки
            console.log(response);
            if (response.status === 400) {
                alert("Неверный логин или пароль");
                return Promise.reject("Неверный логин или пароль");
            }
            if (response.status === 400) {
                alert("Пользователь с таким логином уже существует");
                return Promise.reject("Пользователь с таким логином уже существует");
            } else {
                return response.json();     //декодируем ответ в формате JSON и переходим на выполнение следующего then
            }
        }).catch((error) => {
            console.warn(error)
        })
}