const host = 'https://wedev-api.sky.pro/api/v2/olga-okulova/comments'
const userUrl = 'https://wedev-api.sky.pro/api/user/login';
const newUserUrl = "https://wedev-api.sky.pro/api/user";
export let token;
export const setToken = (newToken) => {
    token = newToken;
}

export function getTodos(){
   return fetch(host, {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            return response.json();
        })
}

export function postTodos(textInputElement){
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: String(textInputElement.value)
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался')
            };
            if (response.status === 400) {
                throw new Error('Ошибка запроса');
            };
            return response.json();
        })
}

export const login = ({ login, password }) => {
    return fetch(userUrl, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            return response.json();
        })
}

export const registration = ({ name, login, password }) => {
    return fetch(newUserUrl, {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    }).then((response) => {
        console.log(response);
        if (response.status === 400) {
            throw new Error("Пользователь с таким логином уже существует");
        }
        return response.json();
    });
};