export function getCommentsAPI() {
    return fetch("https://wedev-api.sky.pro/api/v1/:anastasiya-grebneva/comments", {
    method: "GET"
  })
  .then((response) => {
   return response.json()
  })
};

export function postCommentAPI({name, text}) {
    return fetch("https://wedev-api.sky.pro/api/v1/:anastasiya-grebneva/comments", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            text: text
        })
    })
};