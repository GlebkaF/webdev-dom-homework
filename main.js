import {
    handleLike,
    deleteLastComment,
    addCommentViaAPIWrapper,
    renderCommentsFromAPI,
    setCommentInput, 
  } from './comments.js';
  
  // Массив комментов
  let commentsData = [];

  // Переменные для сохранения данных формы
  let nameInputValue = "";
  let commentInputValue = "";
  
  // Добавление комментария
  const nameInput = document.querySelector(".add-form-name");
  const commentInput = document.querySelector(".add-form-text");
  const addButton = document.querySelector(".add-form-button");
  
  // Событие input для сохранения введенных данных в переменные
  nameInput.addEventListener("input", (event) => {
    nameInputValue = event.target.value;
  });
  
  commentInput.addEventListener("input", (event) => {
    commentInputValue = event.target.value;
  });
  setCommentInput(commentInput); 
  
  document.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addCommentViaAPIWrapper(commentsData, nameInputValue, commentInputValue);
    }
  });
  
  addButton.addEventListener("click", () => {
    addCommentViaAPIWrapper(commentsData, nameInputValue, commentInputValue);
  });
  
  // Удаление последнего комментария
  const deleteButton = document.querySelector(".delete-button");
  deleteButton.addEventListener("click", () => deleteLastComment(commentsData));
  
  // Лайки
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("like-button")) {
      handleLike(event, commentsData);
    }
  });
  
  // Запуск отрисовки комментариев из API при загрузке страницы
  renderCommentsFromAPI(commentsData);
  
  console.log("It works!");
  