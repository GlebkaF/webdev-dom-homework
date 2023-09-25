


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
