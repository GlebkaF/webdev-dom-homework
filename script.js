"use strict";
const mainList = document.querySelector(".comments");
const mainForm = document.querySelector(".add-form");
const addCommentsBtn = document.querySelector(".add-form-button");
const inputName = document.querySelector(".add-form-name");
const textareaText = document.querySelector(".add-form-text");
const newDate = new Date()
  .toLocaleDateString("ru", {
    day: "numeric",
    year: "2-digit",
    month: "numeric",
    hour: "numeric",
    minute: "numeric",
  })
  .replace(",", "");
console.log(newDate);
addCommentsBtn.addEventListener("click", () => {
  if (inputName.value == "" && textareaText.value == "") {
    textareaText.classList.add("error");
    inputName.classList.add("error");
    updateBtn();
    return;
  } else {
    inputName.classList.remove("error");
    textareaText.classList.remove("error");
  }
  addPosts();
  deleteValue();
});
const deleteValue = () => {
  inputName.value = "";
  textareaText.value = "";
};
const updateBtn = () => {
  if (inputName.value == "" && textareaText.value == "") {
    addCommentsBtn.disabled = true;
    textareaText.readOnly = true;
    inputName.readOnly = true;
    addCommentsBtn.classList.add("grey");
  } else {
    addCommentsBtn.disabled = false;
    textareaText.readOnly = false;
    addCommentsBtn.disabled = false;
    addCommentsBtn.classList.remove("grey");
    inputName.classList.remove("error");
    textareaText.classList.remove("error");
  }
};
inputName.addEventListener("input", () => {
  updateBtn();
});
textareaText.addEventListener("input", () => {
  updateBtn();
});
mainForm.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    addPosts();
    deleteValue();
  }
});

const addPosts = () => {
  const newList = mainList.innerHTML;
  mainList.innerHTML =
    newList +
    `<li class="comment">
  <div class="comment-header">
    <div>${inputName.value}</div>
    <div>${newDate}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text">
      ${textareaText.value} ❤
    </div>
  </div>
  <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">0</span>
      <button class="like-button"></button>
    </div>
  </div>
</li>`;
};
