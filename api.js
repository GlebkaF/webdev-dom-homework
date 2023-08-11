// api.js
export const getComments = () => {
    return fetch("https://wedev-api.sky.pro/api/v1/kristina-sapega/comments", {
      method: "GET",
    })
    .then((response) => {
      if (!response) {
        throw new Error("Ошибка при получении комментариев");
      }
      return response.json();
    });
  };
  
  export const addCommentRequest = (newComment) => {
    return fetch("https://wedev-api.sky.pro/api/v1/kristina-sapega/comments", {
      method: "POST",
      body: JSON.stringify(newComment),
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Неверный запрос");
      } else if (response.status === 500) {
        throw new Error("Ошибка сервера");
      }
      return response.json();
    });
  };
  