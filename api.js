const baseUrl = "https://wedev-api.sky.pro/api/v2/pavel-fedotov/";

export function getComments() {
    return fetch(`${baseUrl}comments`, {
        method: "GET",
        })
        .then((result) => {
          if (result.status === 500) {
            throw new Error("Cервер не отвечает");
          } else {
            return result.json();
          }
        })
}

export function postComment( {text, name, date, likes, isLiked, forceError} ) {

    return fetch(`${baseUrl}comments`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          name: name,
          date: date,
          likes: likes,
          isLiked: isLiked,
          forceError: forceError
        }),
      })
      .then((resultComments) => {
        if (resultComments.status == 201) {
          return resultComments.json();
        } else if (resultComments.status === 400) {
          throw new Error("Имя или комментраий короткие");
        } else if (resultComments.status === 500) {
          throw new Error("Сервер не отвечает");
        }
      })
}