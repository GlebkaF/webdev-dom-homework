export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v1/anton-shlyapkin/comments", {
        method: "GET"
    })
    .then((response) => {
        return response.json();
    });
}

export function postComment({date, likes, isLiked, text, name, isEdit, forceError}) { 
    return fetch("https://wedev-api.sky.pro/api/v1/anton-shlyapkin/comments", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        likes: likes,
        isLiked: isLiked,
        text: text,
        name: name,
        isEdit: isEdit,
        forceError: forceError,
      })
    })
}