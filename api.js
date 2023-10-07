export function getComments() {
  return fetch("https://wedev-api.sky.pro/api/v1/alexander-potapov/comments", {
    method: "GET",
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Что то с сервером");
    } else {
      return response.json();
    }
  });
}

 export function postComment(firstValue, secondValue) {
    return fetch("https://wedev-api.sky.pro/api/v1/alexander-potapov/comments", {
      method: "POST",
      body: JSON.stringify({
        text: firstValue.value,
        name: secondValue.value,
        forceError: true,
      })
    })
}
