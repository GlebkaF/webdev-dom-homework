const commentElement = document.getElementById("addComment");
const listElement = document.getElementById("list");
const nameInputEl = document.getElementById("name-input");
const textInputEl = document.getElementById("text-input");

const comments = [
    {
        name: "Глеб Фокин",
        date: "12.02.22 12:18",
        comment: "Это будет первый комментарий на этой странице",
        likes: "3",
        likeCheck: false,
    },
    {
        name: "Варвара Н.",
        date: "13.02.22 19:22",
        comment: "Мне нравится как оформлена эта страница! ❤",
        likes: "75",
        likeCheck: true,
    },
];

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-like="">
        <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
        </div>
        <div class="comment-body" data-body = '${comment.comment}, ${comment.name}'>
        <div class="comment-text">
            ${comment.comment}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span  data-index = '${index}'class="likes-counter">${comment.likes}</span>
            <button data-index = '${index}' class="${comment.likeCheck ? 'like-button -active-like' : 'like-button'}"></button>
        </div>
        </div>
    </li>`
    }).join("");

    listElement.innerHTML = commentsHtml;

    commentAnswerElement();
    initMyLikeListeners();
};

const commentAnswerElement = () => {
    const commentAnswers = document.querySelectorAll(".comment-body");

    for (const commentAnswer of commentAnswers) {
        commentAnswer.addEventListener("click", () => {
            const index = commentAnswer.dataset.body;
            textInputEl.value += `${index}`;
        })
    }
}

commentAnswerElement();

const initMyLikeListeners = () => {
    const likeButtons = document.querySelectorAll(".like-button");

    for (const likeElement of likeButtons) {
        likeElement.addEventListener("click", () => {
            const index = comments[likeElement.dataset.index];
            index.likeCheck ? --index.likes : ++index.likes;
            index.likeCheck = !index.likeCheck;
            renderComments();
        });
    };
};

renderComments();


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

    comments.push({
        name: nameInputEl.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
        date: `${date}.${month}.${year} ${hour}:${minute}`,
        comment: textInputEl.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
        likes: 0,
        likeCheck: false,
    });

    renderComments();

    nameInputEl.value = "";
    textInputEl.value = "";
});