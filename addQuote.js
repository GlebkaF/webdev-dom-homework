export const addQuote = ({ comments }) => {
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      commentElement.addEventListener('click', () => {
        const index = commentElement.dataset.index;
        if (index !== null) {
          const comment = comments[index];
          const commentInputElement = document.getElementById("comment-input");
          commentInputElement.value = `>>${comment.text} \nto: ${comment.name},`;
  
          comment.text.replace("<div class='quote'</div>");
          const styleQuote = document.querySelectorAll(".quote");
        }
      })
    }
  }