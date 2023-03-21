const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const currentDate = new Date().toLocaleString();
const deleteButton = document.getElementById("del-button");


buttonElement.addEventListener('click', () => {
    nameInputElement.classList.remove("error");
    if (nameInputElement.value === "") {
        nameInputElement.classList.add("error");
        return;
    } else if (textInputElement.value === "") {
        textInputElement.classList.add("error");
        return;
    }
    newComment();
});

function inputCheck() {
    buttonElement.classList.remove("turn-off"); 
    if (document.getElementById("name-input").value === "") { 
      document.getElementById("add-button").disabled = true; 
      buttonElement.classList.add("turn-off"); 
      return; 
    } 
}

function newComment(){
    const oldListHtml = listElement.innerHTML;
    listElement.innerHTML = oldListHtml +
        `<li class="comment">
    <div class="comment-header">
      <div>${nameInputElement.value}</div>
      <div>${currentDate}</div>
    </div>
    <div class="comment-body">
      <div class="comment-text">
        ${textInputElement.value}
      </div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter"></span>
        <button class="like-button"></button>
      </div>
    </div>
  </li>`;
}

nameInputElement.addEventListener("input", inputCheck);

textInputElement.addEventListener("input", inputCheck);

nameInputElement.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        nameInputElement.classList.remove("error");
        if (nameInputElement.value === "") {
            nameInputElement.classList.add("error");
            return;
        } else if (textInputElement.value === "") {
            textInputElement.classList.add("error");
            return;
        }
        newComment();

    }
});

textInputElement.addEventListener("keyup", ({key}) => {
    if (key === "Enter") {
        textInputElement.classList.remove("error");
        if (textInputElement.value === "") {
            textInputElement.classList.add("error");
            return;
        } else if (nameInputElement.value === "") {
            nameInputElement.classList.add("error");
            return;
        }
        newComment();
    }
});

deleteButton.addEventListener('click', () => {
    listElement.lastElementChild.remove(`${textInputElement.value}`);
});