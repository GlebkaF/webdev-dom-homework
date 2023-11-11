export let userName;
export const setUserName = (newUserName) => {
  userName = newUserName;
};

export let token;

export const setToken = (newToken) => {
token = newToken;
}
export function getCommentsApi() {
    return fetch(
        "https://wedev-api.sky.pro/api/v2/valeriya-kiseleva/comments",
        {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
        })
        .then((response) => {
            if (response.status === 500) {
                throw new Error("Неполадки с сервером");
            }

            return response.json();
        })

}

export function postCommentsApi({ nameElement, commentElement }) {
    return fetch("https://wedev-api.sky.pro/api/v2/valeriya-kiseleva/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
            text: commentElement.value
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;"),
                
            forceError: true
        }),
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("Не может быть добавлено меньше 3-ёх символов");
            }
            if (response.status === 500) {
                throw new Error("Неполадки с сервером");
            }
            return response.json();
        })
}

export function login({ login,password }) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
           login,
           password,
        })
    })
        .then((response) => {
            if(response.status === 400){
                throw new Error("Неправильный логин или пароль");
            }
            return response.json();
        });
};

export function registration({login,password,name}){
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
           login,
           password,
           name,
        }),
    })
    .then((response) => {
        if (response.status === 400) {
            throw new Error("Данный логин уже занят");
         } 
            return response.json();
    })
}