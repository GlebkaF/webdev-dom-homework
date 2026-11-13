const commentInput = document.querySelector(".add-form-name");
const commentText = document.querySelector(".add-form-text");
const commentBtn = document.querySelector(".add-form-button");

export function delay(interval = 300) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, interval);
  });
}

export const errorMoment = (text) => {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll("\n", "<br>");
};

export const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const validateInput = () => {
  if (commentInput.value === "" || commentText.value === "") {
    commentBtn.disabled = true;
  } else {
    commentBtn.disabled = false;
  }
};
