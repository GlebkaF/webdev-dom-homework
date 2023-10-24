"use strict";
import { getData, postData } from "./api.js";
// Код писать здесь
const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-input");
const startAt = Date.now();
const commentContainer = {};


buttonElement.disabled = true;// Выключаем кнопку добавления коментария 
//пока коментарии добавляются на страницу
buttonElement.textContent = 'Данные загружаются...';// Меняем название кнопки

// Функция apiGet получает данные с сервера по API
const apiGet = () => {

    getData().then((responseData) => {
        const fromApp = responseData.comments.map((comment) => {

            return {

                userName: comment.author.name,
                checkLike: comment.isLiked,
                textComment: comment.text,
                countLikes: comment.likes,
                // длинная строка ниже- это преобразование даты, полученной с сервера для нормального отображения
                fullDate: new Date(comment.date).toLocaleDateString() + " " + (new Date(comment.date).getHours() < 10 ? '0' + new Date(comment.date).getHours() : new Date(comment.date).getHours()) + ":" + (new Date(comment.date).getMinutes() < 10 ? '0' + new Date(comment.date).getMinutes() : new Date(comment.date).getMinutes()) + ":" + (new Date(comment.date).getSeconds() < 10 ? '0' + new Date(comment.date).getSeconds() : new Date(comment.date).getSeconds()),

            };
        });
        comments = fromApp;

        renderComments();// Вызываем функцию рендеринга страницы
        likeButtons();//Вызываем функцию обработки клика по лайкам

        buttonElement.disabled = false;// Включаем кнопку добавления комментария
        buttonElement.textContent = 'Написать';// Меняем название кнопки добавления коментария
    });

};

apiGet();// Вызываем функцию получения данных с сервера по API

let comments = []; // Массив где будут хранится данные коментариев




const renderComments = () => { // Функция рендеринга страницы

    const commensHtml = comments.map((comment, index) => {
        return `<li class="comment" data-text="${comment.textComment}" data-name="${comment.userName}">
        <div class="comment-header">
          <div>${comment.userName}</div>
          <div>${comment.fullDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.textComment}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.countLikes}</span>
            <button data-index ="${index}" class="like-button ${comment.checkLike ? '-active-like' : ''}"></button>
          </div>
        </div>
      </li>`

    })
        .join('');
    listElement.innerHTML = commensHtml;


    //Обработчик событий при нажатии на текст коментария
    const commentsElements = document.querySelectorAll(".comment");
    for (const comment of commentsElements) {
        comment.addEventListener('click', () => {
            event.stopPropagation();//Отключение дочерних событий
            const dataComment = comment.dataset.text;
            const dataName = comment.dataset.name;



            commentInputElement.value = `> ${dataComment}\n\n${dataName}`;
            console.log(`> ${dataComment}\n\n${dataName}`);
        });
    };


};
renderComments(); // Вызываем функцию рендеринга страницы



const likeButtons = () => { //Функция обработки клика по лайкам
    const buttonLikes = document.querySelectorAll(".like-button");
    for (const buttonLike of buttonLikes) {
        buttonLike.addEventListener("click", () => {
            event.stopPropagation();//Отключение дочерних событий
            if (comments[buttonLike.dataset.index].checkLike === true) {
                comments[buttonLike.dataset.index].checkLike = false;
                comments[buttonLike.dataset.index].countLikes--;
            } else {
                comments[buttonLike.dataset.index].checkLike = true;
                comments[buttonLike.dataset.index].countLikes++;
            }

            renderComments(); // Вызываем функцию рендеринга страницы
            likeButtons(); //Вызываем функцию обработки клика по лайкам
        });
    }
};

const renderError = () => {// Функция обработки ошибок запрса
    buttonElement.disabled = false;// Включаем кнопку добавления комментария
    buttonElement.textContent = 'Написать';// И меняем надпись обратно
    nameInputElement.value = `${commentContainer.name}`;
    commentInputElement.value = `${commentContainer.text}`;
    renderComments(); // Вызываем функцию рендеринга страницы
    likeButtons(); //Вызываем функцию обработки клика по лайкам
};

renderComments(); // Вызываем функцию рендеринга страницы
likeButtons(); //Вызываем функцию обработки клика по лайкам





buttonElement.addEventListener('click', () => {

    nameInputElement.classList.remove('error');
    commentInputElement.classList.remove('error');
    // 6. Чтение значения атрибутов HTML элементов;
    if (nameInputElement.value === '' || nameInputElement.value === 'Введите ваше имя') {
        nameInputElement.classList.add('error');
        return;
    }
    if (commentInputElement.value === '' || commentInputElement.value === 'Введите ваш коментарий') {//Проверка на корректность ввода данных в форму (валидация)
        commentInputElement.classList.add('error');// И подсветить флорму красным цветом
        return;
    }
    // Функция получения текущей даты и времени
    const fullDate = () => {

        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;// +1 т.к. нумерация месяцев начинается с нуля
        let year = newDate.getFullYear() - 2000;
        let hour = newDate.getHours(); // получаем час из нашей даты
        let minute = newDate.getMinutes(); // получаем минуты

        if (date < 10) {// если количество дней будет меньше 10,
            date = "0" + date;// то перед ними поставим 0
        }
        if (month < 10) {// если количество месяцев будет меньше 10,
            month = "0" + month;// то перед ними поставим 0
        }
        if (hour < 10) { // если количество часов будет меньше 10,
            hour = "0" + hour; // то перед ними поставим 0
        }
        if (minute < 10) { // если минут будет меньше 10,
            minute = "0" + minute; // то перед ними поставим 0
        }
        //Функция fullDate возвращает текущую дату и время: 
        return date + "." + month + "." + year + " " + hour + ":" + minute;
    };

    const sanitizeHtml = (htmlString) => {
        return htmlString.replaceAll("&", "&amp;")// обязательно начинать обработку с "&", "&amp;"! иначе  при символе "<" будет выводиться "&lt;" и т.д.
            .replaceAll("<", "&lt;")// элементарная обработка пользовательского ввода на предмет
            .replaceAll(">", "&gt;") // всяких нехороших вещей в HTML-коде, в данном случае управляющие символы разметки "<" и ">"
            .replaceAll('"', "&quot;");// меняются; на их коды, а браузер всёравно выводит эти символы
    };

    const startAt = Date.now();
    console.log("Начинаю делать запрос");

    commentContainer.name = nameInputElement.value;//сохраняем имя коментатора на случай ошибки 
    commentContainer.text = commentInputElement.value;//сохраняем коментарий на случай ошибки

    buttonElement.disabled = true;// Выключаем кнопку добавления комментария
    buttonElement.textContent = 'Коментарий добавляется...';// Меняем надпись кнопки





    postData({
        text: sanitizeHtml(commentInputElement.value),
        name: sanitizeHtml(nameInputElement.value),
    }).then((response) => {
        console.log("Время:" + (Date.now() - startAt));
        return response;
    })
        .then((response) => {
            console.log(response);
            // Код который обрабатывает ошибку
            //throw new Error("Сервер упал");- был в уроке
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                return Promise.reject("Короткое имя");
            } else {
                // Код который обрабатывает ошибку
                //throw new Error("Сервер упал");
                return Promise.reject("Сервер упал");

            }
        })
        .then(() => {
            return apiGet();// Вызываем функцию получения данных с сервера по API
        })
        .then(() => {
            buttonElement.disabled = false;// Включаем кнопку добавления комментария
            buttonElement.textContent = 'Написать';// И меняем надпись обратно
        })
        .catch((error) => {// Обработчик ошибок
            console.warn(error);
            error === "Короткое имя" ? alert("Имя должно содержать хотя бы три символа") : alert("Что-то пошло не так, попробуйте отправить коментарий позже");
            return renderError();// вызываем функцию обработки ошибок связанных с работой API

        })


    nameInputElement.value = '';// Очиска формы имени после ввода данных
    commentInputElement.value = '';// Очиска формы коментария после ввода данных
    renderComments();
});





console.log("Время:" + (Date.now() - startAt));
renderComments();// Вызываем функцию рендеринга страницы
likeButtons();//Вызываем функцию обработки клика по лайкам





console.log("It works!");