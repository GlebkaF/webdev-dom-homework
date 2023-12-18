export function fetchPromise() {
    return fetch ("https://wedev-api.sky.pro/api/v1/ekaterina-mikhalko/comments", {
      metod: "GET"
    })

    .then((response) => {
      if (response.status === 500) {
        throw new Error ("Сервер сломался");
      } else {
        return response.json();
      }
      
    });
}

export function postComment({text, name}) {
    return fetch ("https://wedev-api.sky.pro/api/v1/ekaterina-mikhalko/comments", {
          method: "POST",
          body: JSON.stringify({
            text: text
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            name: name
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
            forceError: true,
          }),

        })
}