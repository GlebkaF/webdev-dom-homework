const host = "https://wedev-api.sky.pro/api/v2/vladimir-rychkov/comments"

export function getComments() {
    return fetch(host, {
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
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            // forceError: true,
        })
    })
}