export function getTodos () {
  return fetch("https://wedev-api.sky.pro/api/v1/skorik-marina/comments", {
    method: "GET"
  })
    .then((response) => {
      return response.json();
    });
}

export function postTodo ({name, text}) {
   return fetch("https://wedev-api.sky.pro/api/v1/skorik-marina/comments", {
      method: "POST",
      body: JSON.stringify({
        name: name
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        text: text
          // .replace(`"${quote}"\n`, "")
          .replaceAll("&", "&amp;")
          .replaceAll("<", "&lt;")
          .replaceAll(">", "&gt;")
          .replaceAll('"', "&quot;"),
        forceError: true,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          return response.json();
        } else if (response.status === 400) {
          alert('Имя и текст должны быть длиннее 3-х символов!');
          return Promise.reject(new Error("Не верный пользовательский ввод"));
        } else if (response.status === 500) {
          return Promise.reject(new Error("Сервер упал"));
        }
      })
}
