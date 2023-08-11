
import { getComments, addCommentRequest } from "./api.js";
import { renderComments } from "./render.js";

const nameInput = document.querySelector('#name-input');
const commentInput = document.querySelector('#comment-input');
const addButton = document.querySelector('.add-form-button');
const commentsList = document.querySelector('.comments');
const loadingMessage = document.querySelector('.loading-message');
let isLoading = true;

let comments = [];

const showLoadingMessage = () => {
    if (isLoading) {
        loadingMessage.textContent = "Пожалуйста, подождите, загружаю комментарии...";
        loadingMessage.style.display = 'block';
    } else {
        loadingMessage.style.display = 'none';
    }
}

const main = () => {
  getComments()
    .then((responseData) => {
      const comments = responseData.comments; // Получаем массив комментариев из responseData

      // Рендеринг начального списка комментариев
      renderComments(commentsList, comments);

      // Обработчик кнопки "Написать"
      addButton.addEventListener("click", () => {
        if (nameInput.value.trim().length < 3 || commentInput.value.trim().length < 3) {
          alert("Имя и комментарий должны содержать хотя бы 3 символа!");
          return;
        }

        // Скрытие формы добавления комментария и отображение сообщения "Комментарий добавляется ..."
        nameInput.disabled = true;
        commentInput.disabled = true;
        addButton.disabled = true;
        loadingMessage.textContent = "Комментарий добавляется...";

        // Создание нового комментария
        const now = new Date();
        const dateString = `${now.getDate()}.${now.getMonth() + 1}.${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}`;

        /*const newComment = {
          id: comments.length + 1,
          author: nameInput.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
          date: dateString,
          text: commentInput.value
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;"),
          likes: "0",
          liked: false,
        };*/
        const newComment = {
          author: nameInput.value,
          date: dateString,
          text: commentInput.value,
          likes: 0,
          liked: false,
        };

        // Отправляем новый комментарий на сервер через POST-запрос
        addCommentRequest(newComment)
          .then(() => {
            return getComments();
          })
          .then((responseData) => {
            const updatedComments = responseData.comments; // Получаем обновленный массив комментариев

            // Обновляем список комментариев на странице
            renderComments(commentsList, updatedComments);

            // Очистка полей ввода и включение элементов формы
            nameInput.value = "";
            commentInput.value = "";
            nameInput.disabled = false;
            commentInput.disabled = false;
            addButton.disabled = false;
            addButton.textContent = "Добавить";
            loadingMessage.style.display = "none";
          })
          .catch((error) => {
            // Обработка ошибок при добавлении комментария
            console.log(error);
            nameInput.disabled = false;
            commentInput.disabled = false;
            addButton.disabled = false;
            addButton.textContent = "Добавить";
            loadingMessage.style.display = "none";

            if (error.message === "Ошибка сервера") {
              alert("Сервер сломался, попробуй позже");
              return;
            }
            if (error.message === "Неверный запрос") {
              alert("Имя и комментарий должны быть не короче трех символов");
              return;
            }
            alert("Отсутствует интернет-соединение");
          });
      });

      // 

      const likeButtons = document.querySelectorAll('.like-button');
      likeButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
      event.stopPropagation();
      
      const commentId = parseInt(button.dataset.commentId);
      const comment = comments.find((c) => c.id === commentId);

      if (comment.liked) {
        comment.likes--;
      } else {
        comment.likes++;
      }
      comment.liked = !comment.liked;
      // Обновляем список комментариев на странице
      renderComments(commentsList, comments);
    });
  });
  // Показываем начальный список комментариев
  renderComments(commentsList, comments);
})

    .catch((error) => {
      console.error(error);
      alert("Кажется что-то пошло не так, попробуйте позже.");
      isLoading = false;
      renderComments(commentsList, comments); // Показываем сообщение об ошибке
    });
};

main();
