export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/ford-ekaterina/comments", {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже");
          } else {
            throw new Error("Failed to fetch comments");
          }
        }
        return response.json();
      })
}

export function postTodo({ name, text }) {
    return fetch("https://wedev-api.sky.pro/api/v1/ford-ekaterina/comments", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        text: text,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 400) {
            throw new Error("Имя и комментарий должны быть не короче 3 символов");
          } else {
            throw new Error("Failed to add a new comment");
          }
        }
        return response.json();
      })
}