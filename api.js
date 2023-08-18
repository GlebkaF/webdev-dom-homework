// api.js
export const getComments = () => {
  return fetch('https://wedev-api.sky.pro/api/v1/kristina-sapega/comments', {
    method: 'GET',
  })
    .then((response) => {
      if (!response) {
        throw new Error('Ошибка при получении комментариев');
      }
      return response.json();
    })
    .then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          id: comment.id,
          name: comment.author.name,
          date: new Date(comment.date), // Преобразование строки даты в объект Date
          text: comment.text,
          likes: comment.likes,
          liked: false,
        };
      });
      return appComments;
    });
};

export const addCommentRequest = (newComment) => {
  console.log(newComment);
  return fetch('https://wedev-api.sky.pro/api/v1/kristina-sapega/comments', {
    method: 'POST',
    body: JSON.stringify({
      text: newComment.text,
      name: newComment.name,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверный запрос');
    } else if (response.status === 500) {
      throw new Error('Ошибка сервера');
    }
    return response.json();
  });
};
