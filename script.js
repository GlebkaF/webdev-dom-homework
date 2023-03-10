const commentsElement = document.querySelector('.comments');
const nameInputElement = document.querySelector('.add-form-name');
const textInputElement = document.querySelector('.add-form-text');
const buttonElement = document.querySelector('.add-form-button');
const buttonDelete = document.querySelector('.deleteButton')

buttonElement.disabled = true;
buttonElement.addEventListener('click', newComment);
nameInputElement.addEventListener('keyup', checkEnter);
textInputElement.addEventListener('keyup', checkEnter);
buttonDelete.addEventListener('click', deleteLi);


    //     Это второй способ вкл/выкл кнопки     //
// nameInputElement.oninput = function () {
//     if (nameInputElement.value === "" || textInputElement.value === "") {
//         buttonElement.disabled = true;
//     } else {
//         buttonElement.disabled = false;
//     }
// }
// textInputElement.oninput = function () {
//     if (nameInputElement.value === "" || textInputElement.value === "") {
//         buttonElement.disabled = true;
//     } else {
//         buttonElement.disabled = false;
//     }
// }

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

    const oldCommentsElement = commentsElement.innerHTML;

    commentsElement.innerHTML = oldCommentsElement +
        `<li class="comment">
            <div class="comment-header">
                <div>${nameInputElement.value}</div>
                <div>${date()}</div>
            </div>
            <div class="comment-body">
                <div class="comment-text">
                    ${textInputElement.value}
                </div>
            </div>
            <div class="comment-footer">
                <div class="likes">
                    <span class="likes-counter">0</span>
                    <button class="like-button"></button>
                </div>
            </div>
        </li>`;

    nameInputElement.value = "";
    textInputElement.value = "";
}

const date = () => {
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
    const ulList = document.querySelector('.comments')
    ulList.lastChild.remove();
}