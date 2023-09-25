// Функция ответа на комментарий
export function answerComment () {
    const commentTextElement = document.querySelectorAll('.comment-text');
    const commentNameElement = document.querySelectorAll('.comment-name');
    for (const comment of commentTextElement) {
      comment.addEventListener("click", () => {
        const index = comment.dataset.index;

        commentInputElement.value = 
        `>${commentTextElement[index].innerHTML} ${commentNameElement[index].innerHTML}`;
      })
    } 
};