const commentsElement = document.getElementById('commentUl');
const nameInputElement = document.querySelector('.add-form-name');
const textInputElement = document.querySelector('.add-form-text');
const buttonElement = document.querySelector('.add-form-button');
const buttonDelete = document.querySelector('.deleteButton');
const commentObjectUl = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        comment: "Это будет первый комментарий на этой странице",
        like: 3,
        hard: ""
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        comment: "Мне нравится как оформлена эта страница! ❤",
        like: 75,
        hard: "-active-like"
    }
];

renderComment();

buttonElement.disabled = true;
buttonElement.addEventListener('click', newComment);
nameInputElement.addEventListener('keyup', checkEnter);
textInputElement.addEventListener('keyup', checkEnter);
buttonDelete.addEventListener('click', deleteLi);

window.addEventListener('input', function () {
    if (nameInputElement.value === "" || textInputElement.value === "") {
        buttonElement.disabled = true;
    } else {
        buttonElement.disabled = false;
    }
}, false);

function newComment() {
    nameInputElement.classList.remove("error")
    textInputElement.classList.remove("error")
    if (nameInputElement.value === "" || textInputElement.value === "") {
        if (nameInputElement.value === "") nameInputElement.classList.add("error")
        if (textInputElement.value === "") textInputElement.classList.add("error")
        return;
    }

    commentObjectUl.push({
        name: nameInputElement.value,
        date: date(),
        comment: textInputElement.value,
        like: 0,
        hard: ""
    });

    renderComment();

    nameInputElement.value = "";
    textInputElement.value = "";
}

function date() {
    const date = new Date();
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let year = date.getFullYear();
    let hour = date.getHours();
    if (hour < 10) hour = "0" + hour;
    let minute = date.getMinutes();
    if (minute < 10) minute = "0" + minute;
    return day + "." + month + "." + year + " " + hour + ":" + minute;
}

function checkEnter(key) {
    if (key.code === "Enter" || key.code === "NumpadEnter") {
        newComment();
    }
}

function deleteLi() {
    commentObjectUl.pop();
    renderComment();
}

function renderComment() {
    const commentHtml = commentObjectUl.map((commentObjectUl, i) => {
        return `
        <li class="comment">
            <div class="comment-header">
                <div>${commentObjectUl.name}</div>
                <div>${commentObjectUl.date}</div>
            </div>
            <div id="check" class="comment-body">
                <div id="redactor${i}" class="comment-text">
                    ${commentObjectUl.comment}
                </div>
            </div>
            <button data-redactor="${i}" class="redactorButton">Редактировать</button>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">${commentObjectUl.like}</span>
                    <button data-like="${i}" class="like-button ${commentObjectUl.hard}"></button>
                </div>
            </div>
        </li>
                `
    }).join("");

    commentsElement.innerHTML = commentHtml;

    const likeButtonElements = document.querySelectorAll(".like-button");

    for (const likeButtonElement of likeButtonElements) {
        likeButtonElement.addEventListener("click", () => {
            const i = likeButtonElement.dataset.like;
            if (commentObjectUl[i].hard === "") {
                commentObjectUl[i].hard = "-active-like"
                commentObjectUl[i].like += 1;
                renderComment();
            } else {
                commentObjectUl[i].hard = ""
                commentObjectUl[i].like -= 1;
                renderComment();
            }
        });
    }

    const redactorButtonElements = document.querySelectorAll(".redactorButton");
    for (const redactorButtonElement of redactorButtonElements) {
        redactorButtonElement.addEventListener("click", () => {
            const i = redactorButtonElement.dataset.redactor;
            if (redactorButtonElements[i].innerHTML === "Редактировать") {
                const redact = `redactor${i}`;
                const commentOld = document.getElementById(redact);
                const textarea = `<textarea id="check" type="textarea" class="redactorTextArea" rows="4">${commentObjectUl[i].comment}</textarea>`;
                redactorButtonElements[i].innerHTML = "Сохранить";
                commentOld.innerHTML = textarea;
            } else {
                const redactCommentElement = document.querySelectorAll(".redactorTextArea");
                commentObjectUl[i].comment = redactCommentElement[0].value;
                renderComment();
            }
        });
    }
}