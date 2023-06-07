export const renderUsersComments = (usersComments, listElement) => {
    const usersCommentsHTML = usersComments.map((usersComment, index) => {
        return `<ul id="list" class="comment">
        <div class="comment-header">
        <div>${usersComment.name}</div>
        <div>${usersComment.date}</div>
        </div>
        <div class="comment-body">
        <div class="comment-text">
            ${usersComment.text}
        </div>
        </div>
        <div class="comment-footer">
        <div class="likes">
            <span id="like-count" class="likes-counter">${usersComment.likes}</span>
            <button id="like" data-index="${index}" class="like-button liked ${usersComment.isLiked ? '-active-like' : ''}"></button>
        </div>
        </div>
    </ul>`;
    }).join('');

    listElement.innerHTML = usersCommentsHTML;
};  
