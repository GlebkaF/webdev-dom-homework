export async function fetchComments() {
  try {
    const response = await fetch("https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments");

    if (response.status === 500) {
      throw new Error("Server is down, please try again later");
    }

    const comments = await response.json();
    return comments.comments;
  } catch (error) {
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const response = await fetch(`https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments/${commentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting comment: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}
