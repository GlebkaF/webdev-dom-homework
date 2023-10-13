
const textInputElement = document.querySelector(".add-form-text");

export const answerText = () => {
    const textTextElement = document.querySelectorAll(".comment-text");
    const textNameElement = document.querySelectorAll(".comment-name");
    for (const text of textTextElement) {
      text.addEventListener("click", () => {
        const index = text.dataset.index;
        textInputElement.value = `${textTextElement[index].innerHTML} ${textNameElement[index].innerHTML}`;
      });
    }
  };