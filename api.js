export function getCommentsApi() {
    return fetch(
        "https://wedev-api.sky.pro/api/v1/valeriya-kiseleva/comments"
      )
        .then((response) => {
          if (response.status === 500) {
            throw new Error("Неполадки с сервером");
          }
  
          return response.json();
        })
  
}

export function postCommentsApi({nameElement, commentElement}) {
    return fetch("https://wedev-api.sky.pro/api/v1/valeriya-kiseleva/comments", {
        method: "POST",
        body: JSON.stringify({
          name: nameElement.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
          text: commentElement.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
          forceError: true
        })
      })
        .then((response) => {
          if (response.status === 400) {
            throw new Error("Не может быть добавлено меньше 3-ёх символов");
          }
          if (response.status === 500) {
            throw new Error("Неполадки с сервером");
          }
          return response.json();
        })
}