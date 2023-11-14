export function getDate() {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/yaroslav-olshanskiy/comments",
    {
      method: "GET",
    }
  ).then((response) => {
    return response.json();
  });
}

export function sendDate({ name, date, text, likes, isLike }) {
  return fetch(
    "https://wedev-api.sky.pro/api/v1/yaroslav-olshanskiy/comments",
    {
      method: "POST",
      body: JSON.stringify({
        name: name,
        date: date,
        text: text,
        likes: likes,
        isLike: isLike,
      }),
    }
  ).then((response) => {
    if (response.status <= 201) {
      return response.json();
    } else if (response.status === 400) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    } else if (response.status === 500) {
      throw new Error("Сервер сломался, попробуй позже");
    }
  });
}
