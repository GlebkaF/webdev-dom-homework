export async function fetchComments() {
    try {
        const response = await fetch("https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments");
        if (!response.ok) {
            throw new Error("Failed to fetch comments.");
        }
        const comments = await response.json();
        return comments;
    } catch (error) {
        console.error("Error fetching comments:", error);
        throw error;
    }
}

export async function addComment(newComment) {
    try {
        const response = await fetch("https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments", {
            method: "POST",
            body: JSON.stringify(newComment),
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Failed to add a comment.");
        }
        const addedComment = await response.json();
        return addedComment;
    } catch (error) {
        console.error("Error adding comment:", error);
        throw error;
    }
}

export async function deleteComment(commentId) {
    try {
        const response = await fetch(`https://wedev-api.sky.pro/api/v1/atamyrat-isayev/comments/${commentId}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Failed to delete the comment.");
        }
    } catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
}
