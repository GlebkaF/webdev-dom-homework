
import { formatDateTime } from "./datetime.js";
import { get, post } from "./api.js";
import { initDeleteButtonsListeners } from "./delbutton.js";
import { hideSeeAddComment } from "./hide.js";
import { renderComments } from "./render.js";
// Поиск в именах id 
const buttonElement = document.getElementById("add-form-button");

const textAreaElement = document.getElementById("add-text");
const inputElement = document.getElementById("add-name");
const outerFormElement = document.getElementById("add-form");

const addFormElement = document.querySelector(".add-form");


//Прелоадер страницы

let commentList = [];
// запрос коммента с api
const getComments = () => {
    get().then((responseData) => {
        commentList = responseData.comments.map((comment) => {
            return {
                name: comment.author.name,
                date: formatDateTime(comment.date),
                id: comment.id,
                isLiked: comment.isLiked,
                likes: comment.likes,
                text: comment.text,
            };
        });
        let hidePreload = document.querySelector(".preload").style.display = "none";
        console.log(commentList);
        hideSeeAddComment();
        renderComments(commentList);
        buttonElement.disabled = false;
    });
};

hideSeeAddComment();

//1.commentList необходимо получать из хранилища коммент через API (метод GET). Строки 47-62
getComments();

//Активность кнопки удаления
initDeleteButtonsListeners();

//Отрисовка формы существующих комментов
/* renderComments(); */
//Активность кнопки лайк
export const initLikeListener = () => {
    const buttonLike = document.querySelectorAll(".like-button");
    for (const iteratorLike of buttonLike) {
        iteratorLike.addEventListener("click", (event) => {
            event.stopPropagation();
            const index = iteratorLike.dataset.index;
            commentList[index].likes += commentList[index].isLiked ? -1 : +1;
            commentList[index].isLiked = !commentList[index].isLiked;
            renderComments(commentList); //перерисовываем форму для лайков с счетчиком
        });
    }
};

//Цитата коммента
export const quoteCommets = () => {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
        commentElement.addEventListener("click", () => {
            const index = commentElement.dataset.index;
            const commentText = commentList[index].text;
            const commentAuthor = commentList[index].name;
            textAreaElement.value = `${commentText} > ${commentAuthor}`;
        })
    }
}

//Кнопка с добавлением коммента
buttonElement.addEventListener("click", () => {
    inputElement.classList.remove("error");
    if (inputElement.value === "") {
        inputElement.classList.add("error");
    }
    if (textAreaElement.value === "") {
        textAreaElement.classList.add("error");
        return;
    };
    //2.13. надпись о загрузке коммента и блокировка кнопки "добавить".

    const fetchPromise = () => {
        post(inputElement.value,
            textAreaElement.value)
            .then((response) => {
                if (response.status === 201) {
                    return response.json();
                }
                if (response.status === 400) {
                    throw new Error("Некорректный запрос error 400");
                } if (response.status === 500) {
                    throw new Error("Ошибка сервера error 500");
                }
            }).then(() => {
                inputElement.value = "";
                textAreaElement.value = "";
                return getComments();
            })
            .catch((error) => {
                buttonElement.disabled = true;
                if (error.message === "Некорректный запрос error 400") {
                    alert("Длина имени не может быть меньше 3 символов");
                } else if (error.message === "Ошибка сервера error 500") {
                    alert("Ошибка сервера");
                } else if (error.message === "Failed to fetch") {
                    alert("Отуствует соединение к интеренету");
                };
                buttonElement.disabled = false;
                renderComments(commentList);
            });
    };
    fetchPromise();
    renderComments(commentList);
})
