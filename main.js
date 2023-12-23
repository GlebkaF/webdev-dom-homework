import { getTodos, postTodo } from "./api.js";
import {renderStudentsComments} from "./renderStudentsComments.js";
import {formatDateTime} from "./date.js";

//"use strict"; Модули по умолчанию работают в строгом режиме,
// писать use strict в начале не нужно.
const inputElement = document.getElementById('add-name');
const textAreaElement = document.getElementById('add-text');
const buttonElement = document.getElementById('button-add');

formatDateTime();
// Задание 2.12 - Асинхронность, API
// Подключите приложение комментариев к API комментариев, в результате приложение должно 
// получать список комментариев из API и добавлять новый комментарий через API.
// Задание 2.13 - Цепочки промисов.
// 1 переделайте все вызовы then на цепочки промисов, 
// 2 вынесите код получения списка комментариев в отдельную функцию, 
// 3 Используйте «замедление интернета» в консоли разработчика 
//    на вкладке сеть, чтобы отладить работу лоадеров,
// Результат: 1  Я как пользователь при запуске приложения понимаю, 
//                что данные загружаются и мне нужно немного подождать.
//             2 Я как пользователь при добавлении комментария понимаю, 
//                что мне нужно подождать и не могу случайно отправить коммент
//                 повторно во время загрузки предыдущего.

let studentsComments = [
    // {
    //     name: "Глеб Фокин",
    //     date: "12.02.22 12:18",
    //     text: "Это будет первый комментарий на этой странице",
    //     likes: 3,
    //     isLiked: true,
    // },
    // {
    //     name: "Варвара Н.",
    //     date: "13.02.22 19:22",
    //     text: "Мне нравится как оформлена эта страница! ❤",
    //     likes: 75,
    //     isLiked: false,
    // },
];
// 2.13: 1 переделайте все вызовы then на цепочки промисов, 

const fetchAndRenderComments = () => {

        getTodos().then((responseData) => {
            console.log(responseData);
            let addComments = responseData.comments.map((comment) => {
                return {
                    // Достаём имя автора
                    name: comment.author.name,
                    // Преобразуем дату-строку в Date
                    date: new Date(comment.date),
                    text: comment.text,
                    // date: currentDate.toLocaleString('ru-RU', options),
                    // date: formatDateTime(new Date()),
                    likes: comment.likes,
                    // в апи пока вообще нет признака лайкнутости
                    // поэтому пока добавляем заглушку
                    isLiked: false,
                };

            });
            // добавим таймер при получении данных с сервера
            setTimeout(() => {
                // обратимся по дереву к span в начале html-кода через его класс и к его css,
                // где выключим отображение фразы, записанной в span
                // Через style мы обращаемся к css
                document.querySelector(".alert").style.display = 'none';
                studentsComments = addComments;
                console.log(addComments);
                renderStudentsComments({studentsComments, fetchAndRenderComments});
            }, 1000);
        })
        .catch((error) => {
            console.warn(error);
            alert("К сожалению у вас пропал интернет, вам нужно повторить попытку добавить комментарий позже");
        })
};
fetchAndRenderComments();

// Постановка лайков
const initLikeListeners = () => {
    const likeButtons = document.querySelectorAll(".like-button");
    for (const likeButton of likeButtons) {
        likeButton.addEventListener('click', (event) => {
            event.stopPropagation();

            const index = likeButton.dataset.index;
            studentsComments[index].likes += studentsComments[index].isLiked ? -1 : +1;
            studentsComments[index].isLiked = !studentsComments[index].isLiked;

            renderStudentsComments({studentsComments, fetchAndRenderComments});

        });
    };

};
// План ответа на комментарии
// 1. (+) Мы храним список студентов в js массиве
// 2. (+) При клике мы показываем  нужный элемент из массива в форме
// 3. Мы добавляем в форму свой коммент на этот и отправляем в ленту, в новый массив
// 4. (+) На основе нового массива в js формируем html разметку комментариев

//Цитируем комментарий в форму
const initAnswerComments = () => {
    const commentsElements = document.querySelectorAll(".comment");
    for (const commentsElement of commentsElements) {
        commentsElement.addEventListener("click", () => {
            const index = commentsElement.dataset.index;
            //console.log(index);
            const commentText = studentsComments[index].text;
            const commentAuthor = studentsComments[index].name;
            //console.log(commentText, commentAuthor);
            textAreaElement.value = `${commentText} > ${commentAuthor}`;


            renderStudentsComments({studentsComments, fetchAndRenderComments});
        });
    };
};


renderStudentsComments({studentsComments, fetchAndRenderComments});


// Кнопка добавления комментов
buttonElement.addEventListener("click", () => {
    // const currentDate = new Date();
    //const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    // console.log(currentDate.toLocaleString('ru-RU', options));
    // Подсветка ошибочных комментариев
    inputElement.classList.remove("error");
    textAreaElement.classList.remove("error");

    if (inputElement.value === '') {
        // const newError = new Error("Не вводите пустую строку");
        // console.log(newError);
        // если он в переменной, то можно с ним работать в коде, отображать в интерфейсе.
        inputElement.classList.add("error");
        if (textAreaElement.value === '') {
            textAreaElement.classList.add("error");
            return;
        };
        return;
    };
    // const oldListHtml = listElement.innerHTML;

    //2.13 2) Я как пользователь при добавлении комментария понимаю, 
    //   что мне нужно подождать и не могу случайно отправить коммент
    //    повторно во время загрузки предыдущего.
    buttonElement.disabled = true;
    buttonElement.textContent = "Комментарий добавляется...";


    // 2.13: 1 переделайте все вызовы then на цепочки промисов, 

    studentsComments.push(
       
            postTodo({
                text: textAreaElement.value,
                name: inputElement.value
            }).then(() => {
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                // мы не хотим, чтобы данные пользователя стирались, поэтому переносим обнуление инпута сюда,
                // внутрь последнего then, там же, где мы включаем кнопку.
                inputElement.value = '';
                textAreaElement.value = '';
                // 2.13: 2 вынесите код получения списка комментариев в отдельную функцию, 
            })
            .catch((error) => {
                // В catch-обработчике включаем обратно кнопку, чтобы пользователю можно было работать дальше после ошибки.
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                // алёрт с сообщением по пропаже интернета лучше писать один раз, 
                //если написать и у GET, и у POST, то нужно будет нажимать два раза.
                //alert("К сожалению у вас пропал интернет, вам нужно повторить попытку добавить комментарий позже");
                console.warn(error);
            })
        // 2.13 2 Я как пользователь при добавлении комментария понимаю, 
        // что мне нужно подождать и не могу случайно отправить коммент
        // повторно во время загрузки предыдущего. Еле нашла, куда ставить кнопку!

    );

    fetchAndRenderComments();
    renderStudentsComments({studentsComments, fetchAndRenderComments});

});
//  2.14. Задание:
// + Я, как пользователь, понимаю, что ввел слишком короткую строчку в имя или текст комментария при добавлении комментария.
//+ Я, как пользователь, понимаю, что у меня пропал интернет и мне нужно повторить попытку добавить комментарий позже.
// Что нужно сделать
// + Обработать 400-ю ошибку в POST-запросе на добавление комментария и показать пользователю alert.
// + Обработать 500-е ошибки в запросе на получение комментов и на добавление коммента.
//+ Обработать ошибки типа «у пользователя пропал интернет» во всех запросах.
// + Форма добавления не должна сбрасываться в случае ошибки.
// «Как не терять введенные данные при перерендере формы добавления?»
// Подсказка
// Простой вариант: сделайте форму статичной — просто скрывайте ее на время добавления комментария через display: block.

// Сложный вариант: используйте событие input на элементах формы, чтобы отслеживать, что пользователь ввел в форму,
// и сохранить их в переменную. Во время рендера подставляйте эти данные в инпуты.

//2.11.Ответы на комментарии. План:
//1. При клике на комментарий в списке в форму подставляется текст комментария и имя автора комментария
//2. Я могу ответить на этот текст в форме
// Уязвимость «HTML-теги в имени автора и тексте комментария». План:
//+ 1. Написать в поле «Ваше имя» HTML-разметку, например `<strong> Глеб </strong>`.
//  +  2. Написать в поле «Ваше комментарий» HTML-разметку, например `<h1> Коммент </h1>`.
//   + 3. Нажать на кнопку «Написать».
// Код писать здесь
// console.log("It works!");
// А как добавить лоадер при загрузке приложения?
// Можно создать переменную, которая будет хранить статус загрузки приложения.
//  Можно вызвать рендер, и если переменная равна true, то можно показать этот лоадер.
//  После первой загрузки комментариев нужно изменить значение переменной на противоположное.
//  В функции получения комментариев снова вызывается рендер-функция — переменная уже будет
//  все время с другим значением и на экране не появится до перезагрузки страницы.



// 2.15 Разбейте ваше приложение с лентой комментариев на модули. 
// main.js  станет главным модулем, точкой входа.
// В этом файле должны остаться только импорты других модулей,
//  а также код, который необходим для их работы.
// При разбиении проекта учтите главные принципы создания модулей
// и постарайтесь сделать их универсальными.