const listElement = document.getElementById("list");
const inputNameElement = document.getElementById("input__name");
const textareaCommentElement = document.getElementById("textarea__comment");
const buttonWriteElement = document.getElementById("button__write");
const buttonDeleteElement = document.getElementById("button__delete");
const listObject = [
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

buttonWriteElement.disabled = true;
buttonWriteElement.addEventListener('click', newComment);
inputNameElement.addEventListener('keyup', checkEnter);
textareaCommentElement.addEventListener('keyup', checkEnter);
buttonDeleteElement.addEventListener('click', deleteLi);

window.addEventListener('input', function () {
    if (inputNameElement.value === "" || textareaCommentElement.value === "") {
        buttonWriteElement.disabled = true;
    } else {
        buttonWriteElement.disabled = false;
    }
}, false);

function newComment() {
    inputNameElement.classList.remove("-background-error")
    textareaCommentElement.classList.remove("-background-error")
    if (inputNameElement.value === "" || textareaCommentElement.value === "") {
        if (inputNameElement.value === "") inputNameElement.classList.add("-background-error")
        if (textareaCommentElement.value === "") textareaCommentElement.classList.add("-background-error")
        return;
    }

    listObject.push({
        name: inputNameElement.value,
        date: date(),
        comment: textareaCommentElement.value,
        like: 0,
        hard: ""
    });

    renderComment();

    inputNameElement.value = "";
    textareaCommentElement.value = "";
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
    listObject.pop();
    renderComment();
}

function renderComment() {
    listElement.innerHTML = listObject.map((listObject, i) => `
    <li class="comments__list">
        <section class="comments__header">
            <p>${listObject.name}</p>
            <p>${listObject.date}</p>
        </section>
        <section data-comment__body="${i}" class="comments__body">
            <p>${listObject.comment}</p>
        </section>
        <div class="comments__footer">
            <button data-button__redact="${i}" class="comments__button-redact">Редактировать</button>
            <div>
                <span>${listObject.like}</span>
                <button data-button__hard="${i}" class="comments__button-hard ${listObject.hard}"></button>
            </div>
        </div>
    </li>`).join("");

    const buttonHardElements = document.querySelectorAll(".comments__button-hard");

    for (const buttonHardElement of buttonHardElements) {
        buttonHardElement.addEventListener("click", () => {
            const i = buttonHardElement.dataset.button__hard;
            if (!listObject[i].hard) {
                listObject[i].hard = "-active-like"
                listObject[i].like += 1;
                renderComment();
            } else {
                listObject[i].hard = ""
                listObject[i].like -= 1;
                renderComment();
            }
        });
    }

    const buttonRedactElements = document.querySelectorAll(".comments__button-redact");
    for (const buttonRedactElement of buttonRedactElements) {
        buttonRedactElement.addEventListener("click", () => {
            const i = buttonRedactElement.dataset.button__redact;
            if (buttonRedactElements[i].innerHTML === "Редактировать") {
                buttonRedactElements[i].innerHTML = "Сохранить";
                const commentBodyElements = document.querySelectorAll(".comments__body")
                const commentBodyElement = commentBodyElements[i];
                const textareaElement = `<textarea type="textarea" class="-redactor-textarea" rows="4">${listObject[i].comment}</textarea>`;
                commentBodyElement.innerHTML = textareaElement;
            } else {
                const redactCommentElement = document.querySelectorAll(".-redactor-textarea");
                listObject[i].comment = redactCommentElement[0].value;
                renderComment();
            }
        });
    }
}