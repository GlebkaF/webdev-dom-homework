import { fetchComments, addComment, deleteComment } from './api.js';

export async function displayComments() {
    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";

    try {
        const comments = await fetchComments();
        comments.forEach((comment) => {
            const { id, author, date, text, likes } = comment;
            const formattedDate = new Date(date).toLocaleString();

            const commentHtml = `
            <li class="comment" data-comment-id="${id}">
                <div class="comment-header">
                    <div>${author}</div>
                    <div>${formattedDate}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${text}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${likes}</span>
                        <button class="like-button">Like</button>
                    </div>
                </div>
            </li>
            `;

            commentsList.innerHTML += commentHtml;
        });
    } catch (error) {
        console.error("Error displaying comments:", error);
    }
}

export async function handleAddCommentClick() {
    const nameInput = document.getElementById("name-input");
    const commentInput = document.getElementById("comment-input");
    
    const name = nameInput.value.trim();
    const comment = commentInput.value.trim();

    if (!name || !comment) {
        alert("Please enter your name and comment.");
        return;
    }

    try {
        const newComment = {
            author: name,
            text: comment,
        };

        await addComment(newComment);
        nameInput.value = "";
        commentInput.value = "";
        displayComments();
    } catch (error) {
        console.error("Error adding comment:", error);
    }
}

export async function handleDeleteCommentClick() {
    const commentsList = document.getElementById("comments-list");
    const lastComment = commentsList.lastElementChild;

    if (!lastComment) {
        alert("No comments to delete.");
        return;
    }

    const commentId = lastComment.getAttribute("data-comment-id");

    try {
        await deleteComment(commentId);
        commentsList.removeChild(lastComment);
    } catch (error) {
        console.error("Error deleting comment:", error);
    }
}

export function handleLikeButtonClick(button) {

}
