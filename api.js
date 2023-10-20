export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/dmitriy-panfilov/comments", {
      method: "GET",
    }).then((response) => {
       return response.json()
});
}
//передаем текст, дату в качестве аргумента
export function postApi({ text, name, date }) {
   return fetch("https://wedev-api.sky.pro/api/v1/dmitriy-panfilov/comments", {
      method: "POST",
      body: JSON.stringify({
         name: name
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        date: date,
        text: text
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;"),
        Likes: 0,
        isLiked: false,
      }),
      })
      .then((response) => {
          console.log(response);
          if (response.status === 500) {
             throw new Error("Сервер сломался");
          }
          if (response.status === 400) {
             throw new Error("Плохой запрос");
          }
          else {
          return response.json();
          }
        });
}