// const container = document.querySelector(".container");
const listElement = document.querySelector(".comments");
const addButtonElement = document.querySelector(".add-form-button");
// const delButtonElement = document.querySelector(".del-form-button");
const nameInputElement = document.querySelector(".add-form-name");
const commentInputElement = document.querySelector(".add-form-text");
const currentDate =
    new Date().toLocaleDateString("default", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    }) +
    " " +
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

const comments = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        text: "Это будет первый комментарий на этой странице",
        likesCounter: 3,
        likeButton: " ",
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        text: "Мне нравится как оформлена эта страница! ❤",
        likesCounter: 75,
        likeButton: "-active - like",
    },
];


addButtonElement.disabled = true;
addButtonElement.classList.add("error");

nameInputElement.addEventListener("input", (event) => {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove("error");
});

commentInputElement.addEventListener("input", (event) => {
    addButtonElement.disabled = false;
    addButtonElement.classList.remove("error");
});

document.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addListComment();
    }
});



// delButtonElement.addEventListener("click", () => {

//     const oldHtml = listElement.innerHTML;
//     let position = oldHtml.lastIndexOf(`<li class="comment">`);
//     const newListHtml = oldHtml.substring(0, position - 1);
//     listElement.innerHTML = newListHtml;

//     prepareInput();

// });

const initDeleteButtonsListener = () => {
    const deleteButtonsElements = document.querySelectorAll(".del-form-button");

    for (const deleteButtonsElement of deleteButtonsElements) {
        deleteButtonsElement.addEventListener("click", () => {
            const index = deleteButtonsElement.dataset.index;
            comments.splice(index, 1);
            renderComments();
        });
    }
};


addButtonElement.addEventListener("click", addListComment);


function addListComment() {

    if (nameInputElement.value === "" ||
        commentInputElement.value === "") {
        addButtonElement.disabled = true;
        addButtonElement.classList.add("error");
        return;
    }

    comments.push({
        name: nameInputElement.value,
        date: currentDate,
        text: commentInputElement.value,
        likesCounter: 0,
        likeButton: " ",
    });

    listElement.innerHTML = listElement.innerHTML;

    renderComments();
};


const renderComments = () => {
    const commentHTML = comments.map((comment, index) => {
        return `<li class="comment">
        <div class="comment-header">
          <div>${comment.name}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">
            ${comment.text}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likesCounter}</span>
            <button data-index="${index}" dataclass="like-button"></button>
          </div>
        </div>
      </li>`
    }).join("");
    listElement.innerHTML = commentHTML;

    prepareInput();
}

function prepareInput() {
    nameInputElement.value = "";
    commentInputElement.value = "";
    addButtonElement.disabled = true;
    addButtonElement.classList.add("error");
}

// Код писать здесь
console.log("It works!");