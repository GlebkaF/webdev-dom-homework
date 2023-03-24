const listElement = document.getElementById("list");
const formElement = document.getElementById("form");
const loaderText = document.getElementById("loaderText");
// const quoteElement = document.getElementById("form__quote");
const inputNameElement = document.getElementById("input__name");
// const quoteNameElement = document.getElementById("quote__name");
// const quoteBodyElement = document.getElementById("quote__body");
const buttonWriteElement = document.getElementById("button__write");
const buttonDeleteElement = document.getElementById("button__delete");
// const buttonQuoteElement = document.getElementById("button__quote");
const loaderCommentsElement = document.getElementById("loaderComments");
const textareaCommentElement = document.getElementById("textarea__comment");
let redactClickCheck = false;
let listObject = [];

fetchGetAndRenderComment();

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

    formElement.classList.add("-display-none");
    loaderText.textContent = "Комментарий добавляется"
    loaderCommentsElement.classList.remove("-display-none")

    fetch("https://webdev-hw-api.vercel.app/api/v1/ilia-abramov/comments", {
        method: "POST",
        body: JSON.stringify({
            text: `${safeHtmlString(textareaCommentElement.value)}`,
            name: `${safeHtmlString(inputNameElement.value)}`
        }),
    })
        .then(() => fetchGetAndRenderComment())
        .then(() => {
            inputNameElement.value = "";
            textareaCommentElement.value = "";
            formElement.classList.remove("-display-none");
            // quoteNameElement.innerHTML = "";
            // quoteBodyElement.innerHTML = "";
            // quoteElement.classList.add("-display-none");
        })
}

function renderComment() {
    listElement.innerHTML = listObject.map((listObject, i) => `
            <li class="comments__list">
                <div class="comments__header">
                    <p>${listObject.author.name}</p>
                    <p>${correctDate(listObject.date)}</p>
                </div>
                <div id="comments__quote" class="comments__quote ${!listObject.quoteName ? '-display-none' : ''}">
                    <p>${listObject.quoteName}</p>
                    <p>${listObject.quoteComment}</p>
                </div>
                <div data-comments="${i}" class="comments__body">
                    <p>${listObject.text}</p>
                </div>
                <textarea data-textarea="${i}" type="textarea" class="-redactor-textarea -display-none">${listObject.text}</textarea>
                <div class="comments__footer">
                    <button data-redact="${i}" class="comments__button-redact">Редактировать</button>
                    <div>
                        <span>${listObject.likes}</span>
                        <button data-hard="${i}" class="comments__button-hard ${!listObject.isLiked ? '' : '-active-like'}"></button>
                    </div>
                </div>
            </li>`
    ).join("");

    clickCheck();
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

function fetchGetAndRenderComment() {
    buttonWriteElement.disabled = true;
    loaderCommentsElement.classList.remove("-display-none");
    return fetch("https://webdev-hw-api.vercel.app/api/v1/ilia-abramov/comments", {
        method: "GET"
    })
        .then((response) => response.json())
        .then((responseDate) => {
            listObject = responseDate.comments;
            loaderCommentsElement.classList.add("-display-none")
            renderComment();
        })
}

function clickCheck() {
    const commentBodyElements = document.querySelectorAll(".comments__body");
    const textareaRedactElements = document.querySelectorAll(".-redactor-textarea");
    const buttonHardElements = document.querySelectorAll(".comments__button-hard");
    const buttonRedactElements = document.querySelectorAll(".comments__button-redact");

    for (const buttonHardElement of buttonHardElements) {
        buttonHardElement.addEventListener("click", () => {
            const i = buttonHardElement.dataset.hard;
            buttonHardElement.disabled = true;
            buttonRedactElements[i].disabled = true;
            buttonHardElement.classList.add("-loading-like");
            if (!listObject[i].isLiked) {
                listObject[i].likes += 1;
            } else {
                listObject[i].likes -= 1;
            }
            listObject[i].isLiked = !listObject[i].isLiked;
            delay(2000).then(() => renderComment())
        });
    }

    for (const buttonRedactElement of buttonRedactElements) {
        buttonRedactElement.addEventListener("click", () => {
            const i = buttonRedactElement.dataset.redact;      
            buttonHardElements[i].disabled = true;
            if (!redactClickCheck) {
                buttonRedactElements[i].textContent = "Сохранить";
                commentBodyElements[i].classList.add("-display-none");
                textareaRedactElements[i].classList.remove("-display-none");
            } else {
                buttonRedactElements[i].textContent = "Редактировать";
                listObject[i].text = safeHtmlString(document.querySelectorAll(".-redactor-textarea")[i].value);
                renderComment();
            }
            redactClickCheck = !redactClickCheck;
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

function delay(interval = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
}