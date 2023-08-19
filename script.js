const commentElement = document.getElementById("addComment");
const listElement = document.getElementById("list");
const nameInputEl = document.getElementById("name-input");
const textInputEl = document.getElementById("text-input");

commentElement.addEventListener("click", () => {

    const plus0 = (el) => {
        return el < 10 ? `0${el}` : el;
    };

    let currentDate = new Date();
    let date = plus0(currentDate.getDate());
    let month = plus0(currentDate.getMonth());
    let year = plus0(currentDate.getFullYear());
    let hour = plus0(currentDate.getHours());
    let minute = plus0(currentDate.getMinutes());

    nameInputEl.classList.remove("error");
    if (nameInputEl.value === "") {
        nameInputEl.classList.add("error");
        return;
    };

    textInputEl.classList.remove("error");
    if (textInputEl.value === "") {
        textInputEl.classList.add("error");
        return;
    };

    const oldListElements = listElement.innerHTML;
    listElement.innerHTML = oldListElements + `<li class="comment">
        <div class="comment-header">
        <div>${nameInputEl.value}</div>
        <div>${date}.${month}.${year} ${hour}:${minute}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">
            ${textInputEl.value}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span class="likes-counter"></span>
            <button class="like-button"></button>
        </div>
        </div>
    </li>`;

    nameInputEl.value = "";
    textInputEl.value = "";
});