const editClick = () => {
    const editButtons = document.querySelectorAll(".edit-button");

    for (const editButton of editButtons) {
      editButton.addEventListener("click", (event) => {
        console.log("click", event.target);
        const index = editButton.dataset.index;
        // const commentText = commentsListArray[id].msg;
        const fragment = document.createDocumentFragment();
        const popup = document.createElement("div");
        popup.classList.add("popup");
        container.appendChild(popup);
        const popupTextarea = document.createElement("textarea");
        popupTextarea.classList.add("editText");
        //popupTextarea.textContent = comments[index].comment;
        //у тебя в массиве comments[index].text , а ты пишешь в textContent  comments[index].comment
        // в saveEditComment тоже самое

        popupTextarea.textContent = comments[index].text;
        const saveButton = document.createElement("button");
        saveButton.textContent = "cохранить комментарий";
        saveButton.classList.add("save_button");
        fragment.appendChild(popupTextarea);
        fragment.appendChild(saveButton);
        popup.appendChild(fragment);
        saveEditComment(index, popup);
      });
    }
  };

  function saveEditComment(index, popup) {
    const saveButtonClick = document.querySelector(".save_button");
    saveButtonClick.addEventListener("click", (e) => {
      const editText = document.querySelector(".editText");
      if (editText.value.length > 10) {
        //comments[index].comment = editText.value;
        // тут было тоже самое
        comments[index].text = editText.value;
        popup.remove();
        renderComments();
      }
    });
  }