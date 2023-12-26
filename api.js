const host = "https://wedev-api.sky.pro/api/v1/nastya-mikheykina/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

export let token=null;
export const setToken = (newToken) => {
  token = newToken;
};


export function getComments() {
  return fetch(host, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((responce) => {
    if (responce.status === 401) {
      throw new Error("Not authorised");
    }
    return responce.json();
  })
}


export function postComment({ text }) {
  return fetch(host,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stribgify({
      name: name,
      text: text,
    }),
  })
}


export function login({ login, password}) {
  return fetch(userUrl, {
    method: "POST",
    body: JSON.stribgify({
      login,
      password,
    }),
  }).then((responce) => {
    if (responce.status === 201) {
      console.log("это страница с комментариями и формой");
    }
    return responce.json();
  });
}