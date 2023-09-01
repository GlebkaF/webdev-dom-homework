export function getComments () {
    return fetch("https://wedev-api.sky.pro/api/v1/lana-olhowko/comments", {
        method: "GET",
      })
        .then((response) => {
          // containerPreloader.textContent = '';
          response.json();
});
} 


export function postComments({name, text}) {
    return fetch("https://wedev-api.sky.pro/api/v1/lana-olhowko/comments", {
        method: "POST",
        body: JSON.stringify({
          name: name.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
            .replaceAll("QUOTE_END", "</div>"),
          // date: fullDate + fullTime,
          text: text.replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
            .replaceAll("QUOTE_END", "</div>"),
          forceError: true,
        }),
      })
        .then((response) => {
          if (response.status === 400) {
            throw new Error('Неверный запрос')
          }
          if (response.status === 500) {
            throw new Error('Ошибка сервера')
          }
          if (response.status === 201) {
            return response.json();
          }
    
        })
}