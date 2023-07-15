//Ответы на комментарии

export function replyТoСomment(commentTextEl) {
    const listElements = document.querySelectorAll(".comment");
    for (const listElement of listElements){
      listElement.addEventListener("click", () => {
        const commentText = listElement.dataset.comment;
        const userName = listElement.dataset.name;
        commentTextEl.value = ">" + " "  + commentText + " " + userName;
      });
      //renderApp();
    }
  }