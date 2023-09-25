export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/vladimir-rychkov/comments", {
    method: "GET"
  })
  .then((response) => {
    if (response.status === 500) {
      alert ('Сервер сломался, попробуй позже');
      throw new Error("Ошибка на сервере")
    } else {
      return response.json();
    }
  })
};

export function postComments(text, name) {
    return fetch("https://wedev-api.sky.pro/api/v1/vladimir-rychkov/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            // forceError: true,
        })
    })
}