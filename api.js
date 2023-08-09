
export const getComments = (nameInputValue, commentInputValue) => {
    return fetch("https://wedev-api.sky.pro/api/v1/kristina-sapega/comments")
      //method: "GET",
    //})
      .then((response) => {
        if (!response) {
          throw new Error("Ошибка при получении комментариев");
        }
        return response.json();
      })
      .then((responseData) => responseData.comments);
        
    };


//функция для добавления комментария
export function addCommentRequest() {
   // const newComment = {
    //name: nameInput.value,
   // text: commentInput.value,
  //};
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
    })
    .then(() => {
      return fetch("https://wedev-api.sky.pro/api/v1/kristina-sapega/comments");
    })
    .then((response) => {
  if (!response.ok) {
    throw new Error("Ошибка при получении комментариев");
  }
  return response.json();
});
};
    

  