"use strict";
const mainList = document.querySelector(".comments");
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
    // addCommentsBtn.classList.add("grey");
    // addCommentsBtn.disabled = true;
    updateBtn();
    return;
  } else {
    inputName.classList.remove("error");
    textareaText.classList.remove("error");
  }
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
  inputName.value = "";
  textareaText.value = "";
});
// inputName.addEventListener("input", () => {
//   if (inputName.value == "" && textareaText.value == "") {
//     inputName.readOnly = true;
//     textareaText.readOnly = true;
//     addCommentsBtn.disabled = true;
//     addCommentsBtn.classList.add("grey");
//     return;
//   }
// });

const updateBtn = () => {
  if (inputName.value == "" && textareaText.value == "") {
    addCommentsBtn.disabled = true;
    addCommentsBtn.classList.add("grey");
  } else {
    addCommentsBtn.disabled = false;
    addCommentsBtn.classList.remove("grey");
    inputName.classList.remove("error");
    textareaText.classList.remove("error");
  }
};

inputName.addEventListener("input", () => {
  inputName.readOnly = false;
  updateBtn();
});
textareaText.addEventListener("input", () => {
  textareaText.readOnly = false;
  updateBtn();
});
