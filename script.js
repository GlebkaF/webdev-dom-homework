const ButtonElement = document.getElementById('add-form-button');
const ListElement = document.getElementById('comments');
const UserName = document.getElementById('add-form-name');
const UserComment = document.getElementById('add-form-text');

const currentDate = new Date();
const dateString = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()} `;

ButtonElement.addEventListener("click", () => {
    const name = UserName.value;
    const comment = UserComment.value;
    const OldLIstHTML = ListElement.innerHTML;
    UserName.style.backgroundColor = "white";
    UserComment.style.backgroundColor = "white";
    if (name === "" ){
        UserName.style.backgroundColor = "red";
        UserName.placeholder = "Пожалуйста заполните это поле";
    }
    else if (comment === ""){
        UserComment.style.backgroundColor = "red";
        UserComment.placeholder = "Пожалуйста заполните это поле";
    }
    else{
        ListElement.innerHTML = OldLIstHTML + `  
            <li class="comment">
            <div class="comment-header">
            <div>${name}</div>
            <div class="comment-date">${dateString}</div>
            </div>
            <div class="comment-body">
            <div class="comment-text">
                ${comment}
            </div>
            </div>
            <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">0</span>
                <button class="like-button"></button>
            </div>
            </div>
            </li>
        `;}
});
console.log("It works!");