import { correctDate } from "../handleFunctions.js";

export function renderComments({ comments, isStarting }) {
    const commentsHtml = comments.map(comment => {
        return `
            <li class="comment">
                <div class="comment-header">
                    <div>${comment.author.name}</div>
                    <div>${correctDate({ date: comment.date })}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">
                        ${comment.text}
                    </div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button 
                            class="like-button 
                                ${comment.isLiked ? '-active-like' : ''} 
                                ${comment.isLikeLoading ? '-loading-like' : ''}">
                            </button>  
                    </div>
                </div>
            </li>`;
    }).join('');

    return isStarting ?
        '<p class="starting">Список загружается...</p>' :
        `<ul class="comments">
            ${commentsHtml}
        </ul>`;
}