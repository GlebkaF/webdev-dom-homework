const listElement = document.getElementById("list");
// const quoteElement = document.getElementById("form__quote");
// const quoteNameElement = document.getElementById("quote__name");
// const quoteBodyElement = document.getElementById("quote__body");
const inputNameElement = document.getElementById("input__name");
// const buttonQuoteElement = document.getElementById("button__quote");
const buttonWriteElement = document.getElementById("button__write");
const buttonDeleteElement = document.getElementById("button__delete");
const textareaCommentElement = document.getElementById("textarea__comment");
let listObject = [];

fetch("https://webdev-hw-api.vercel.app/api/v1/ilia-abramov/comments", {
    method: "GET"
}).then((response) => response.json().then((responseDate) => { listObject = responseDate.comments; renderComment(); }));


buttonWriteElement.disabled = true;
buttonWriteElement.addEventListener('click', newComment);
inputNameElement.addEventListener('keyup', checkEnter);
textareaCommentElement.addEventListener('keyup', checkEnter);
buttonDeleteElement.addEventListener('click', deleteComment);

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

    const formElements = document.querySelectorAll(".form");
    const loaderElements = document.querySelectorAll(".loader")
    formElements[0].classList.add("-display-none");
    loaderElements[0].classList.remove("-display-none")

    fetch("https://webdev-hw-api.vercel.app/api/v1/ilia-abramov/comments", {
        method: "POST",
        body: JSON.stringify({
            text: `${safeHtmlString(textareaCommentElement.value)}`,
            name: `${safeHtmlString(inputNameElement.value)}`
        }),
    }).then(() => {
        fetch("https://webdev-hw-api.vercel.app/api/v1/ilia-abramov/comments", {
            method: "GET"
        }).then((response) => response.json().then((responseDate) => { listObject = responseDate.comments; renderComment(); formElements[0].classList.remove("-display-none"); loaderElements[0].classList.add("-display-none") }));
    });

    inputNameElement.value = "";
    textareaCommentElement.value = "";
    // quoteNameElement.innerHTML = "";
    // quoteBodyElement.innerHTML = "";
    // quoteElement.classList.add("-display-none");
}

function renderComment() {
    listElement.innerHTML = listObject.map((listObject, i) => `
            <li class="comments__list">
                <section class="comments__header">
                    <p>${listObject.author.name}</p>
                    <p>${correctDate(listObject.date)}</p>
                </section>
                <div id="comments__quote" class="comments__quote ${!listObject.quoteName ? '-display-none' : ''}">
                    <p>${listObject.quoteName}</p>
                    <p>${listObject.quoteComment}</p>
                </div>
                <section data-comments="${i}" class="comments__body">
                    <p>${listObject.text}</p>
                </section>
                <div class="comments__footer">
                    <button data-redact="${i}" class="comments__button-redact">Редактировать</button>
                    <div>
                        <span>${listObject.likes}</span>
                        <button data-hard="${i}" class="comments__button-hard ${!listObject.isLiked ? '' : '-active-like'}"></button>
                    </div>
                </div>
            </li>`
    ).join("");

    const buttonHardElements = document.querySelectorAll(".comments__button-hard");

    for (const buttonHardElement of buttonHardElements) {
        buttonHardElement.addEventListener("click", () => {
            const i = buttonHardElement.dataset.hard;
            if (!listObject[i].isLiked) {
                listObject[i].isLiked = true;
                listObject[i].likes += 1;
                renderComment();
            } else {
                listObject[i].isLiked = false;
                listObject[i].likes -= 1;
                renderComment();
            }
        });
    }

    const buttonRedactElements = document.querySelectorAll(".comments__button-redact");

    for (const buttonRedactElement of buttonRedactElements) {
        buttonRedactElement.addEventListener("click", () => {
            const i = buttonRedactElement.dataset.redact;
            if (buttonRedactElements[i].innerHTML === "Редактировать") {
                buttonRedactElements[i].innerHTML = "Сохранить";
                const commentBodyElements = document.querySelectorAll(".comments__body");
                const textareaElement = `<textarea type="textarea" class="-redactor-textarea" rows="4">${listObject[i].text}</textarea>`;
                commentBodyElements[i].innerHTML = textareaElement;
            } else {
                const redactCommentElement = document.querySelectorAll(".-redactor-textarea");
                listObject[i].text = safeHtmlString(redactCommentElement[0].value);
                renderComment();
            }
        });
    }

    // const commentQuoteElements = document.querySelectorAll(".comments__body");

    // for (const commentQuoteElement of commentQuoteElements) {
    //     commentQuoteElement.addEventListener("click", () => {
    //         const i = commentQuoteElement.dataset.comments;
    //         quoteNameElement.innerHTML = listObject[i].author.name;
    //         quoteBodyElement.innerHTML = listObject[i].text;
    //         quoteElement.classList.remove("-display-none")
    //     });
    // }

    // buttonQuoteElement.addEventListener("click", () => {
    //     quoteElement.classList.add("-display-none")
    //     quoteNameElement.innerHTML = "";
    //     quoteBodyElement.innerHTML = "";
    // });
}


// function date() {
//     const date = new Date();
//     let day = date.getDate();
//     if (day < 10) day = "0" + day;
//     let month = date.getMonth() + 1;
//     if (month < 10) month = "0" + month;
//     let year = date.getFullYear();
//     let hour = date.getHours();
//     if (hour < 10) hour = "0" + hour;
//     let minute = date.getMinutes();
//     if (minute < 10) minute = "0" + minute;
//     return day + "." + month + "." + year + " " + hour + ":" + minute;
// }

function correctDate(str) {
    const time = str.split("");
    const result = `${time[8] + time[9] + "." + time[5] + time[6] + "." + time[0] + time[1] + time[2] + time[3] + " " + time[11] + time[12] + time[13] + time[14] + time[15]}`;
    return result;
}

function checkEnter(key) {
    if (key.code === "Enter" || key.code === "NumpadEnter") {
        newComment();
    }
}

function deleteComment() {
    listObject.pop();
    renderComment();
}

function safeHtmlString(str) {
    str = str
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
    return str;
}