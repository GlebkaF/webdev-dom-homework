
const baseUrl = "https://wedev-api.sky.pro/api/v2/pavel-fedotov/";
const token = "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export function getComments() {
    return fetch(`${baseUrl}comments`, {
        method: "GET",
        headers: {
            Authorization: token,
        },
        })
        .then((result) => {
          if (result.status === 500) {
            throw new Error("Cервер не отвечает");
          } else {
            return result.json();
          }
        })
}

export function postComment( {text, date, likes, isLiked, forceError} ) {
    
    return fetch(`${baseUrl}comments`, {
        method: "POST",
        body: JSON.stringify({
          text: text,
          date: date,
          likes: likes,
          isLiked: isLiked,
          forceError: forceError
        }),
        headers: {
            Authorization: token,
        },
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