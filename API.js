const BASE_URL_COMMENTS = "https://wedev-api.sky.pro/api/v2/atamyrat-isayev/comments";
const BASE_URL_USER = "https://wedev-api.sky.pro/api/user";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export async function login({ login, password }) {
  try {
    const response = await fetch(`${BASE_URL_USER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data.user.token;
    } else if (response.status === 400) {
      throw new Error("Invalid login or password");
    } else {
      throw new Error(`Login failed with status ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export async function register({ login, password, name }) {
  try {
    const response = await fetch(`${BASE_URL_USER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, password, name }),
    });

    if (response.status === 201) {
      const data = await response.json();
      return data.user;
    } else if (response.status === 400) {
      throw new Error("User with the same login already exists");
    } else {
      throw new Error(`Registration failed with status ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchComments() {
  try {
    const response = await fetch(BASE_URL_COMMENTS);

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
    const response = await fetch(BASE_URL_COMMENTS, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
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
    const response = await fetch(`${BASE_URL_COMMENTS}/${commentId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting comment: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}
