export function getComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
    method: "GET"
  }).then((response) => {
    if (response.status === 500) {
      throw new Error("Сервер упал.");
    } else if (response.status !== 200) {
      throw new Error("Отсутствует интернет");
    } else {
      return response.json();
    };
  });
}


/*export function postComments(name,date,text,likesCounter,itLikes, original,answer,isLikeLoading,forceError) {
    return fetch('https://wedev-api.sky.pro/api/v1/:Tatyana-JSc2/comments', {
      method: "POST",
      body: JSON.stringify({
        name: name,
        date: date,
        text: text,
        likesCounter: likesCounter,
        itLikes: itLikes,
        original:  original,
        answer: answer,
        isLikeLoading: isLikeLoading,
        forceError: forceError,
      }),
    });
}*/