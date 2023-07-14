// api.js
export async function getCommentsFromAPI() {
    try {
      const response = await fetch("https://wedev-api.sky.pro/api/v1/Maksim-Bersenev/comments");
  
      if (!response?.ok) {
        throw new Error("Сервер сломался, попробуй позже");
      }
  
      const data = await response.json();
      return data.comments;
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  
  export async function addCommentViaAPI(comment) {
    try {
      const response = await fetch("https://wedev-api.sky.pro/api/v1/Maksim-Bersenev/comments", {
        method: 'POST',
        body: JSON.stringify(comment),
      });
  
      if (!response?.ok) {
        if (response.status === 400) {
          throw new Error("Имя и комментарий должны быть не короче 3 символов");
        } else {
          throw new Error("Ошибка при добавлении комментария. Проверьте интернет-соединение.");
        }
      }
  
      const data = await response.json();
  
      if (data.result === "ok") {
        console.log("Комментарий успешно добавлен.");
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
}
  