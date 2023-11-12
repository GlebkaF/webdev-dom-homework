export default function fetchPromise() {
    return fetch("https://wedev-api.sky.pro/api/v1/daria-alekseeva/comments", {
    method: "GET"
    })
    .then((responce) => {
      if (responce.status == 500) {
        throw new Error('Сервер сломался');
      } else {
        return responce.json()
      }
    })
    .then((responceData) => {
      const comms = responceData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: new Date(comment.date).toLocaleString(),
            comment: comment.text,
            likes: comment.likes,
            isLiked: false,
          }
        })
        comments = comms;
        renderComments();
    })
    .catch((error) => {
      if (error.message == 'Сервер сломался') {
        console.log('Сервер сломался')
      } else {
        console.log('ошибка')
      }
    })
    .finally(() => {
      addForm.style.display = "flex"
    })
  
  }