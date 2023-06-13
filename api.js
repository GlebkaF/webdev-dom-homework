export function getApi(token) {
    return fetch('https://wedev-api.sky.pro/api/v2/sergey-bondarenko/comments', {
        method: "GET",
        headers: {
            Authorization: token
        }
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            }
            else {
                throw new Error()
            }
        })
}

export function postApi({
    token,
    text
}) {
    return fetch('https://wedev-api.sky.pro/api/v2/sergey-bondarenko/comments', {
        method: "POST",
        body: JSON.stringify({
            //   name: addFormName.value,
            text
        }),
        headers: {
            Authorization: token
        }
    })
        .then((response) => {
            // console.log(response);
            if (response.status === 201) {
                return response.json()
            }
            else if (response.status === 400) {
                throw new Error("Ошибка ввода")
            }
            else if (response.status === 500) {
                throw new Error("Ошибка сервера")
            }
            else {
                throw new Error("Ошибка")
            }
        })
}

export function loginUser({
    login,
    password
}) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
            login,
            password
        })
    })
        .then((response) => {

            if (response.status == "400") {
                throw new Error("Неверный логин или пароль")
            }
            return response.json()
        })
}

export function registrationUser({
    login,
    password,
    name
}) {
    return fetch('https://wedev-api.sky.pro/api/user', {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
            name
        })
    })
        .then((response) => {

            if (response.status == "400") {
                throw new Error("Неподходящее имя пользователя или пароль")
            }
            return response.json()
        })
}