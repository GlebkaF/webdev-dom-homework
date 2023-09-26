const API_ENDPOINT = "https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments";

export async function fetchComments() {
  try {
    const response = await fetch(API_ENDPOINT);

    if (response.status === 500) {
      throw new Error("Server is down, please try again later");
    }

    const comments = await response.json();
    return comments.comments;
  } catch (error) {
    throw error;
  }
}

export async function postComment(newComment) {
  try {
    const response = await fetch(API_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(newComment),
    });

    if (response.status === 400) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    } else if (response.status === 500) {
      throw new Error("Сервер сломался, попробуйте позже");
    } else if (!response.ok) {
      throw new Error(`Error adding comment: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    throw error;
  }
}

export async function deleteComment(commentId) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${commentId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error deleting comment: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}
