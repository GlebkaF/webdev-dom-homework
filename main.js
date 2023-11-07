import { getTodos, postTodo } from "./api.js";

const nameInputElement = document.getElementById("name-input");
const commInputElement = document.getElementById("comm-input");
const buttonElement = document.getElementById("publish-button");
const listElement = document.getElementById("list");

const loaderComment = document.getElementById("loader-comment");
const addLoaderComment = document.getElementById("add-loader-comment");

const addForm = document.getElementById("id-form");


addLoaderComment.style.display = "none";







function attachLikeHandler(button, counter) {
    let liked = false;
    button.addEventListener('click', () => {
        if (liked) {
            liked = false;
            button.classList.remove('-active-like');
            counter.textContent = parseInt(counter.textContent) - 1;

        } else {
            liked = true;
            button.classList.add('-active-like');
            counter.textContent = parseInt(counter.textContent) + 1;

        }
    });
}
function answerComments() {
    const commentsElements = document.querySelectorAll(".comment-text");
    commentsElements.forEach((commentElement, index) => {
        commentElement.addEventListener("click", () => {
            if (index !== null) {
                const comment = commentsData[index];
                commInputElement.value = `> ${comment.text} \n ${comment.name}.,`;
                renderComments();
            }
        });
    })
}




buttonElement.addEventListener("click", () => {
commInputElement.style.backgroundColor = "";
nameInputElement.style.backgroundColor = "";
if (commInputElement.value === "" || nameInputElement.value === "") {
    commInputElement.style.backgroundColor = "red";
    nameInputElement.style.backgroundColor = "red";

    return;
}
sendCommentToServer()
addForm.style.display = "none";
addLoaderComment.style.display = "block";


})


function renderComments() {
    const allCommentsHtml = commentsData.map((comment, index) => {
        return `<li class="comment">
        <div class="comment-header">
           <div>${comment.name}</div>
            <div id="comment-date-1">${comment.date}</div>
        </div>
        <div class="comment-body">
            <div class="comment-text">
                ${comment.text}
            </div>
        </div>
        <div class="comment-footer">
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button"></button>
            </div>
        </div>
    </li>`
    }).join("")
    listElement.innerHTML = allCommentsHtml;

    const likeButtons = document.querySelectorAll(".like-button");
    const likeCounts = document.querySelectorAll(".likes-counter");
    likeButtons.forEach((button, index) => {
    attachLikeHandler(button, likeCounts[index]);
    answerComments()
});

}


let commentsData = [];


function getCommentsFromServer() {
// fetch("https://wedev-api.sky.pro/api/v1/yana-orlova/comments", {
//     method: "GET",
// })
// .then((response) => {
//     if (response.status === 500) {
//             //код который обработает ошибку
//             throw new Error('Сервер упал');
//         } 
//     return response.json();
// })
getTodos().then((responseData) => {
    console.log(responseData)
    let appComments = responseData.comments.map((comment) => {
        return {
            name: comment.author.name,
            text: comment.text,
            date: new Date(comment.date).toLocaleDateString() + " " + (new Date(comment.date).getHours() < 10 ? '0' + new Date(comment.date).getHours() : new Date(comment.date).getHours()) + ":" + (new Date(comment.date).getMinutes() < 10 ? '0' + new Date(comment.date).getMinutes() : new Date(comment.date).getMinutes()) + ":" + (new Date(comment.date).getSeconds() < 10 ? '0' + new Date(comment.date).getSeconds() : new Date(comment.date).getSeconds()),
            likes: comment.likes,
            isLike: comment.isLike,
        };
    }); 

console.log(appComments)
    commentsData = appComments;
    renderComments();
})
    .then((dataResponse) => {
        console.log("data",dataResponse);
        loaderComment.style.display = "none";
    })
.catch((error) => {
    if (error.message === 'Failed to fetch') {
                alert ('У вас неполадки с интернетом');
            }
            else {
                alert(error.message);
            }
    console.error("Fetch error:", error);
});
}

// Вызываем getCommentsFromServer для загрузки комментариев при загрузке страницы
getCommentsFromServer();


function sendCommentToServer(comment) {
    const postData = {
        name: nameInputElement.value,
        text: commInputElement.value,
        forceError: true,

    };

    // fetch("https://wedev-api.sky.pro/api/v1/yana-orlova/comments", {
    //     method: "POST",
    //     body: JSON.stringify(
    //         postData
    //         ),
    // })
    // .then((response) => {
    //     if (response.status === 500) {
    //         //код который обработает ошибку
    //         throw new Error('Сервер упал');
    //     } 
    //     if (response.status === 400) {
    //         //код который обработает ошибку
    //         throw new Error('Неверные данные ввода');
    //     } 
    //         return response.json();
    

        
    // }).
    postTodo({
        name: nameInputElement.value,
        text: commInputElement.value,
        forceError: true,
    }).then(() => {
        // Обработка успешной отправки комментария
        // Очищаем поля ввода
        commInputElement.value = "";
        nameInputElement.value = "";
       getCommentsFromServer()
        console.log("Comment sent successfully:");
    })
        

        .catch((error) => {
            if (error.message === 'Failed to fetch') {
                alert ('У вас неполадки с интернетом');
            }
            else {
                alert(error.message);
            }
        
        console.error("Fetch error:", error);
        
    }).finally(() => {
        addLoaderComment.style.display = "none";
        addForm.style.display = "flex";


    })
}


console.log("It works!");
