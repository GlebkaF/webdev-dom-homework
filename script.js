import { getFetch, postComment } from "./api.js";
import { renderComments } from "./renderComments.js";
export { delay } from "./supportFunc.js";

const app = document.getElementById("app");

let comments = [];

let isLoading = true;
let isWaitingComment = false;

function startFetch(user) {
    getFetch()
        .then((startJson) => {
            comments = startJson.comments;
            isWaitingComment = false;
            isLoading = false;
            renderComments(app, isLoading, isWaitingComment, comments, user);
        })
        .catch((error) => {
            console.log(error.message);
        });
}
startFetch();

// const handlePostClick = (user) => {
//     postComment(text, user.token)
//         .then(() => {
//             return startFetch(user);
//         })
//         .catch((error) => {
//             if (error.message === "Ошибка 400") {
//                 console.log("Ошибка 400");
//                 alert("Имя и комментарий должны быть не короче 3 символов");
//                 return getFetch();
//             }
//             else if (error.message === "Ошибка 500") {
//                 console.log("Ошибка 500");
//                 alert("Сервер сломался, попробуй позже");
//                 return getFetch();
//             }
//             else {
//                 isWaitingComment = false;
//                 renderComments(app, isLoading, isWaitingComment, comments, user);
//                 alert("Кажется, у вас сломался интернет, попробуйте позже");
//             }
//         });
//     renderComments(app, isLoading, isWaitingComment, comments, user);
// }
// handlePostClick();

