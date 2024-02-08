// 2.9 DOM 1. Управление шаблоном из JS, события
"use strict";
const name_Input_Element = document.querySelector(".add-form-name");
const comment_Input_Element = document.querySelector(".add-form-text");
const button_Element = document.querySelector(".add-form-button");

button_Element.addEventListener("click", add_New_Comment);
function add_New_Comment() {
  let commentList = document.querySelector(".comments")
  commentList.innerHTML += `
    <li class="comment">
      <div class="comment-header">
        <div>${name_Input_Element.value}</div>
        <div>${(new Date()).toLocaleString()}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">
          ${comment_Input_Element.value}
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">0</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>`;

  function input() {
    if (name_Input_Element.value == "" || comment_Input_Element.value == ""){
      button_Element.setAttribute("disabled", true);
    } else {
      button_Element.removeAttribute("disabled");
    }
  }

  name_Input_Element.addEventListener("input", input);
  comment_Input_Element.addEventListener("input", input);

  button_Element.addEventListener('click', () => {
    name_Input_Element.classList.remove("error");
    comment_Input_Element.classList.remove("error");
    if (name_Input_Element.value === "" && comment_Input_Element.value === "") {
        name_Input_Element.classList.add("error");
        comment_Input_Element.classList.add("error");
        return;

    } else if (name_Input_Element.value === ""){
        name_Input_Element.classList.add("error")
        return;

    } else if (comment_Input_Element.value === ""){
        comment_Input_Element.classList.add("error")
        return;
    }
        const old_List_Element = commentList.innerHTML;
        commentList.innerHTML = old_List_Element +  `
        <li class="comment">
            <div class="comment-header">
                <div>${name_Input_Element.value}
                    @@ -127,7 +123,7 @@
                </div>
            </div>
        </li>`;
        name_Input_Element.value = "";
        textInputElement.value = "";
  });
  comment_Input_Element.value = "";
  //console.log(commentList)
  //console.log(name_Input_Element.value)
  //console.log(comment_Input_Element.value)
};
