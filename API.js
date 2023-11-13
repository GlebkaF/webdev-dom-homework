export function getTodos() {
  return fetch("https://wedev-api.sky.pro/api/v1/viktor-pirogov/comments", {
    method: "GET",
  }).then((response) => {
    return response.json();
  });
}

export function postTodo(textElement, nameElement) {
  return fetch("https://wedev-api.sky.pro/api/v1/viktor-pirogov/comments", {
    method: "POST",
    body: JSON.stringify({
      text: textElement.value
        .replaceAll("QUOTE_BEGIN", "<div>")
        .replaceAll("QUOTE_END", "</div>"),
      name: nameElement.value,
      forceError: false,
    }),
  });
}

export function login(login, password) {
  return fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login: login,
      password: password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      alert("передан неправильный логин или пароль");
    } else {
      return response.json();
    }
  });
}
export let userName;
export const setUserName = (newUserName)=>{
  userName = newUserName;
}
