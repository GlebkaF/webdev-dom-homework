const commentElement = document.getElementById("addComment");
const listElement = document.getElementById("list");
const nameInputEl = document.getElementById("name-input");
const textInputEl = document.getElementById("text-input");
const disabledEl = document.getElementById("disabled");
const disabledComment = document.getElementById("disabled-add-comment");
const commentInput = document.getElementById("add-form")

const plus0 = (el) => {
    return el < 10 ? `0${el}` : el;
};

const commentDate = (currentDate) => {
    let date = plus0(currentDate.getDate());
    let month = plus0(currentDate.getMonth() + 1);
    let year = plus0(currentDate.getFullYear());
    let hour = plus0(currentDate.getHours());
    let minute = plus0(currentDate.getMinutes());
    return `${date}.${month}.${year} ${hour}:${minute}`
};
let currentDate = new Date();

function getComments() {

    const fetchPromise = fetch("https://wedev-api.sky.pro/api/v1/almash/comments", {
        method: "GET"
    });

    fetchPromise.then((response) => {

        const jsonPromise = response.json();

        jsonPromise.then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: commentDate(new Date(comment.date)),
                    text: comment.text,
                    likes: comment.likes,
                    likeCheck: false,
                };
            });

            comments = appComments;
            console.log(responseData);
            renderComments();
            
        }).then(() => {
            disabledEl.disabled = false;
            disabledEl.textContent = "";
        });

    });
};

disabledEl.disabled = true;
disabledEl.textContent = "Пожалуйта подождите, загружаю комментарии...";

getComments();

let comments = [
    // {
    //     name: "Глеб Фокин",
    //     date: "12.02.22 12:18",
    //     comment: "Это будет первый комментарий на этой странице",
    //     likes: "3",
    //     likeCheck: false,
    // },
    // {
    //     name: "Варвара Н.",
    //     date: "13.02.22 19:22",
    //     comment: "Мне нравится как оформлена эта страница! ❤",
    //     likes: "75",
    //     likeCheck: true,
    // },
];

const renderComments = () => {
    const commentsHtml = comments.map((comment, index) => {
        return `<li class="comment" data-like="">
        <div class="comment-header">
        <div>${comment.name}</div>
        <div>${comment.date}</div>
        </div>
        <div class="comment-body" data-body = '${comment.text}, ${comment.name}'>
        <div class="comment-text">
            ${comment.text}
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
            textInputEl.value += `${index} \n`;
        })
    }
}

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



commentElement.addEventListener("click", () => {

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

    commentInput.style.display = "none";
    disabledComment.textContent = "Комментарий добавляется..."

    // comments.push({
    //     name: nameInputEl.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
    //     date: commentDate(currentDate),
    //     comment: textInputEl.value.replaceAll("<", "&lt").replaceAll(">", "&gt"),
    //     likes: 0,
    //     likeCheck: false,
    // });

    fetch("https://wedev-api.sky.pro/api/v1/almash/comments",
        {
            method: "POST",
            body: JSON.stringify({
                text: textInputEl.value,
                name: nameInputEl.value,
            }),
        })
        .then((response) => {
            return response.json();
        })
        .then(() => {
            return getComments();
        })
        .then(() => {
            commentInput.style.display = "block";
            disabledComment.textContent = "";
        })

    //renderComments();

    nameInputEl.value = "";
    textInputEl.value = "";
});