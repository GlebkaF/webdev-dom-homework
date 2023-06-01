export function loadComments() {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/olesia-koneva/comments", {
    method: "GET"
  })
  .then((response) => {
    return response.json();
  })
}

export function postComment(text, name) {
  return fetch("https://webdev-hw-api.vercel.app/api/v1/olesia-koneva/comments", {
    method: "POST",
    body: JSON.stringify({
      text,
      name,
      forceError: true
    })
  })
  .then((response) => {
    if (response.status === 500) {
      postComment();
    }
    else if (response.status !== 201) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    }
  })
}
