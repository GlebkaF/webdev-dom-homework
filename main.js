import { displayComments, addComment, handleLikeButtonClick } from './comments.js';
import { showError } from './ui.js';

const addCommentButton = document.getElementById("add-comment-button");
addCommentButton.addEventListener("click", () => {
  addComment();
});

const commentsList = document.getElementById("comments-list");
commentsList.addEventListener("click", (event) => {
  const target = event.target;
  if (target.classList.contains("like-button")) {
    handleLikeButtonClick(target);
  }
});

const deleteCommentButton = document.getElementById("deleteCommentButton");
deleteCommentButton.addEventListener("click", async () => {
  deleteCommentButton.textContent = "Deleting...";
  const lastComment = commentsList.lastElementChild;

  if (lastComment) {
    const commentId = lastComment.getAttribute("data-comment-id");

    if (commentId) {
      try {
        await deleteComment(commentId);
        commentsList.removeChild(lastComment);
        deleteCommentButton.textContent = "Delete the last comment";
      } catch (error) {
        showError("Error deleting comment: " + error.message);
        deleteCommentButton.textContent = "Delete the last comment";
      }
    } else {
      showError("No comments to delete");
      deleteCommentButton.textContent = "Delete the last comment";
    }
  } else {
    showError("No comments to delete");
    deleteCommentButton.textContent = "Delete the last comment";
  }
});

async function initialize() {
  try {
    const comments = await fetchComments();
    displayComments(comments);
  } catch (error) {
    showError("Failed to fetch comments: " + error.message);
  }
}

initialize();
