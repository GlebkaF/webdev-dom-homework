const API_ENDPOINT = "https://wedev-api.sky.pro/api/v2/atamyrat-isayev/comments";
const userURL = "https://wedev-api.sky.pro/api/user";
const loginURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

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
      headers: {
        authorisation: `Bearer ${token}`,
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
    const response = await fetch(`${API_ENDPOINT}/${commentId}`, {
      method: "DELETE",
      headers: {
        authorisation: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error deleting comment: ${response.status}`);
    }
  } catch (error) {
    throw error;
  }
}



export function login ({ login, password}) {
  return fetch(loginURL, {
    method: "POST",
    body: JSON.stringify ({
      login,
      password, 
    }),
  }).then ((response)=>{
    return response.json ();
  });
}