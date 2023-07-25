import { getComments, getCommentsWithoutAuthorization } from "./api.js";
import { renderComments } from "./renderComments.js";
import { currentDate } from "./date.js";
import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js"
import { renderCommentsMainPage } from "./renderCommentsMainPage.js";

// Основное задание

// const buttonElement = document.getElementById("add-button"), // Находит первый элемент Button "Написать комментарий"
//   nameInput = document.getElementById("name-input"), // Находит первый элемент Input для ввода имени
//   commentTextarea = document.getElementById("comment-textarea"), // Находит первый элемент Textarea для ввода комментария
//   deleteComment = document.getElementById("delete-comment"), // Находит первый элемент Button "удалить последний комментарий"
//   lastComments = document.querySelector(".comments"); // Находит все элементы Контейнер с одним комментарием

let comments = [];

// Функция для отрисовки главной страницы
function fetchPromiseFunctionGetMainPage() {
  return getCommentsWithoutAuthorization().then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: currentDate(new Date(comment.date)),
        text: comment.text,
        likes: comment.likes,
        isLiked: false,
      };
    });
    comments = appComments;
    renderCommentsMainPage({ comments });
  });
}

fetchPromiseFunctionGetMainPage(); // Вызов функции отрисовки главной страницы

// Функция запроса данных из сервера и API
export function fetchPromiseFunctionGet() {
  return getComments()
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        // перебираем и возвращаем новый массив
        return {
          name: comment.author.name,
          date: currentDate(new Date(comment.date)),
          text: comment.text,
          likes: comment.likes,
          isLiked: false,
        };
      });
      comments = appComments;
      renderComments({ comments, fetchPromiseFunctionGet });
    });
}

// Дополнительные задания - старые задания

// // Ввод текста через Enter & NumpadEnter
// // Обработчик события на нажатие клавиш Enter & NumpadEnter - при нажатии на Enter & NumpadEnter срабатывает "button - Написать комментарий" и добавляется новый комментарий
// commentTextarea.addEventListener('keyup', (event) => {

//   // Удаление валидации input и textarea от красного поля
//   nameInput.classList.remove('error-input');
//   commentTextarea.classList.remove('error-input');

//   // Добавление валидации красного поля input и textarea
//   if (nameInput.value === '') {
//     nameInput.classList.add('error-input');
//     return;
//   } else if (commentTextarea.value === '') {
//     commentTextarea.classList.add('error-input');
//     return;
//   }

//   // При нажатии на "Enter" добавляется новый массив
//   if (event.code === 'Enter') {
//     comments.push({
//       name: nameInput.value
//         .replaceAll('>', '&gt;')
//         .replaceAll('<', '&lt;'),
//       text: commentTextarea.value
//         .replaceAll('>', '&gt;')
//         .replaceAll('<', '&lt;')
//         .replaceAll("BEGIN_QUOTE", "<div class='quote'>")
//         .replaceAll("BEGIN_END", "</div>"),
//       date: currentDate(fetchPromise.date),
//       likes: 0,
//       isLiked: false
//     })

//     renderComments();

//     // При нажатии на "NumpadEnter" добавляется новый массив
//   } else if (event.code === 'NumpadEnter') {

//     comments.push({
//       name: nameInput.value
//         .replaceAll('>', '&gt;')
//         .replaceAll('<', '&lt;'),
//       text: commentTextarea.value
//         .replaceAll('>', '&gt;')
//         .replaceAll('<', '&lt;'),
//       date: currentDate(fetchPromise.date),
//       likes: 0,
//       isLiked: false
//     })

//     renderComments();
//   }
// });

// // Удаление последнего комменатрия
// // Обработчик события клика - при клики на "button (delete-comment)" удаляется последний контейнер с комментариес
// deleteComment.addEventListener("click", () => {
//   // В массиве всех комментариев нашли последний children
//   const lastLi = lastComments.children[lastComments.children.length - 1];

//   // Удаляем последний children при клике
//   lastLi.remove();
// });

// // Не кликабельная кнопка
// // Обработчик события кнопки "button (add-button) - Написать комментарий" - становится серым цветом пока не будет заполнены оба поля
// nameInput.addEventListener("input", () => {
//   // Добавление валидации серого цвета на "button (add-button) - Написать комментарий" если в input есть текст, а textarea отсутствует
//   if (commentTextarea.value === "") {
//     buttonElement.classList.add("error-button");
//     return;
//   }
//   // Удаление валидации серого цвета "button (add-button) - Написать комментарий"
//   buttonElement.classList.remove("error-button");
// });

// commentTextarea.addEventListener("input", () => {
//   // Добавление валидации серого цвета на "button (add-button) - Написать комментарий" если в textarea есть текст, а textarea отсутствует
//   if (nameInput.value === "") {
//     buttonElement.classList.add("error-button");
//     return;
//   }

//   // Удаление валидации серого цвета "button (add-button) - Написать комментарий"
//   buttonElement.classList.remove("error-button");
// });
