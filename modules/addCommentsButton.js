import { postTodo } from "./api.js";
import { fetchAndRenderComments } from "./main.js";

// Кнопка добавления комментов
export { buttonElement, addCommentButton };
const buttonElement = document.getElementById('button-add');
const textAreaElement = document.getElementById('add-text');
const inputElement = document.getElementById('add-name');

console.log(buttonElement);
function addCommentButton() {
    buttonElement.addEventListener("click", () => {
        console.log(4);
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

        buttonElement.disabled = true;
        buttonElement.textContent = "Комментарий добавляется...";


        postTodo({
            text: textAreaElement.value,
            name: inputElement.value
        }).then(() => {
            fetchAndRenderComments()
        }).then(() => {
            buttonElement.disabled = false;
            buttonElement.textContent = "Написать";
            // мы не хотим, чтобы данные пользователя стирались, поэтому переносим обнуление инпута сюда,
            // внутрь последнего then, там же, где мы включаем кнопку.
            inputElement.value = '';
            textAreaElement.value = '';
        })
            .catch((error) => {
                // В catch-обработчике включаем обратно кнопку, чтобы пользователю можно было работать дальше после ошибки.
                buttonElement.disabled = false;
                buttonElement.textContent = "Написать";
                console.warn(error);
            })

        // fetchAndRenderComments();
        // renderStudentsComments({ studentsComments, fetchAndRenderComments });

    });
};