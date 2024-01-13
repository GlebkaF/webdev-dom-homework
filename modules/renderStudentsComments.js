import { initLikeListeners } from "./initLikelisteners.js";
import { initAnswerComments } from "./initAnswerComments.js";
import { format } from "date-fns";
import { postTodo } from "./api.js";
const now = new Date();
format(now, "yyyy-MM-dd hh.mm.ss");
// Рендер-функция отрисовывает новые комменты
//const listElement = document.getElementById('list');
export const renderStudentsComments = ({
    studentsComments,
    fetchAndRenderComments,
}) => {
    const appElement = document.getElementById("app");
    const studentsHtml = studentsComments
        .map((comment, index) => {
            const creatDate = format(
                new Date(comment.date),
                "yyyy-MM-dd hh.mm.ss",
            );
            return `<li class="comment" data-index="${index}">
<div class="comment-header">
<div>${comment.name}</div>
<div>${creatDate}</div>
</div>
<div class="comment-body">
<div class="comment-text">
  ${comment.text}
</div>
</div>
<div class="comment-footer">
<div class="likes">
  <span class="likes-counter">${comment.likes}</span>
  <button class="like-button ${
      studentsComments[index].isLiked ? "-active-like" : ""
  }" data-index="${index}"></button>
</div>
</div>
</li>`;
        })
        .join("");
    const appHtml = `
  <div class="container">
        <!--<span class="wait">Подождите, пожалуйста, идёт загрузка данных!</span>-->
        <ul id="list" class="comments">${studentsHtml}</ul>
        <div class="add-form">
            <input id="add-name" value="" type="text" class="add-form-name" placeholder="Введите ваше имя" />
            <textarea id="add-text" value="" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
                rows="4"></textarea>
            <!--<div class="add-form-row">
                <button id="button-add" class="add-form-button">Написать</button> 
            </div>--> 
        </div>
        <p>Чтобы добавить комментарий, <a href="login.html" class="link-authorization">авторизуйтесь</a></p>
    </div>
  `;
    // console.log(studentsHtml);
    appElement.innerHTML = appHtml;
    initLikeListeners();
    initAnswerComments();
    const buttonElement = document.getElementById("button-add");
    const textAreaElement = document.getElementById("add-text");
    const inputElement = document.getElementById("add-name");

    function addCommentButton() {
        buttonElement?.addEventListener("click", () => {
            //console.log(4);
            // Подсветка ошибочных комментариев
            inputElement.classList.remove("error");
            textAreaElement.classList.remove("error");

            if (inputElement.value === "") {
                // const newError = new Error("Не вводите пустую строку");
                // console.log(newError);
                // если он в переменной, то можно с ним работать в коде, отображать в интерфейсе.
                inputElement.classList.add("error");
                if (textAreaElement.value === "") {
                    textAreaElement.classList.add("error");
                    return;
                }
                return;
            }
            // const oldListHtml = listElement.innerHTML;

            buttonElement.disabled = true;
            buttonElement.textContent = "Комментарий добавляется...";

            postTodo({
                text: textAreaElement.value,
                name: inputElement.value,
            })
                .then(() => {
                    fetchAndRenderComments();
                })
                .then(() => {
                    buttonElement.disabled = false;
                    buttonElement.textContent = "Написать";
                    // мы не хотим, чтобы данные пользователя стирались, поэтому переносим обнуление инпута сюда,
                    // внутрь последнего then, там же, где мы включаем кнопку.
                    inputElement.value = "";
                    textAreaElement.value = "";
                })
                .catch((error) => {
                    // В catch-обработчике включаем обратно кнопку, чтобы пользователю можно было работать дальше после ошибки.
                    buttonElement.disabled = false;
                    buttonElement.textContent = "Написать";
                    console.warn(error);
                });

            // fetchAndRenderComments();
            // renderStudentsComments({ studentsComments, fetchAndRenderComments });
        });
    }
    addCommentButton();
};
