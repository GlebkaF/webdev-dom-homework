// Функция кнопки "Редактировать"
export function editComment () {

    // Находим кнопки "Редактировать", "Сохранить", существующие комменты и поля для ввода новых.
    const editElements = document.querySelectorAll(".edit-button");
    const saveEditElements = document.querySelectorAll(".save-edit-button");
    const commentText = document.querySelectorAll(".comment-text");
    const commentEditText = document.querySelectorAll(".comment-edit-text")
  
    // На каждую кнопу "Редактировать" вешаем слушатель событий
    for (let edit of editElements) {
      const index = edit.dataset.index;
      edit.addEventListener("click", () => {
  
        // Меняем видимость кнопок и полей местами 
        commentText[index].classList.add('hide-elem');
        commentEditText[index].classList.remove('hide-elem');
        editElements[index].classList.add('hide-elem');
        saveEditElements[index].classList.remove('hide-elem');
  
          // На открытую кнопу "Сохранить" вешаем слушатель событий
          saveEditElements[index].addEventListener("click", (event) => {
  
            // Запрещаем всплытие
            event.stopPropagation();
  
            // Меняем значение comment на новое значение
            commentsArray[index].comment = commentEditText[index].value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;");
  
            // Меняем видимость кнопок и полей обратно
            commentText[index].classList.remove('hide-elem');
            commentEditText[index].classList.add('hide-elem');
            editElements[index].classList.remove('hide-elem');
            saveEditElements[index].classList.add('hide-elem');
  
            renderList({commentsArray, commentsElement, })
          });
      });
    };
  };