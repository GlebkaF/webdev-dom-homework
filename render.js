import { commentsList } from "./script.js";
import { initLikesButton } from "./like-button.js";
import { addReply } from "./add-reply.js";

export const renderComments = (comm) => {
    const commentsHtml = comm.map((comment, index) => {

        return `<li class="comment" data-index="${index}">
        <div class="comment-header">
            <div>${comment.name.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")} </div>
            <div>${comment.date} </div>
        </div>
        <div class="comment-body"> 
            <div class="comment-text">
            ${comment.text.replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll('QUOTE_BEGIN', "<div class='quote'>")
                .replaceAll('QUOTE_END', "</div>")
            }
        <button class="edit-button" data-index="${index}">Редактировать</button>
            </div>
        </div>
        <div class="comment-footer"> 
            <div class="likes">
                <span class="likes-counter">${comment.likes}</span>
                <button class="like-button ${comment.likeStatus}" data-index="${index}"</button>
            </div>
        </div> 
    </li>`
    }).join("");

    commentsList.innerHTML = commentsHtml;

    initLikesButton();
    addReply();
}