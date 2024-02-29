const baseUrl = 'https://wedev-api.sky.pro/api/v2/pavel-fedotov/'
const userUrl = 'https://wedev-api.sky.pro/api/user/login'

export let token
export let userAuth = false
export let userName

export const getToken = (newToken, name) => {
    token = 'Bearer ' + newToken
    userName = name
}

export const getUserAuth = (newUserAuth) => {
    userAuth = newUserAuth
}

console.log(userName)

export function getComments() {
    return fetch(`${baseUrl}comments`, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }).then((result) => {
        if (result.status === 500) {
            throw new Error('Cервер не отвечает')
        } else {
            return result.json()
        }
    })
}

export function postComment({ text, name, date, likes, isLiked, forceError }) {
    return fetch(`${baseUrl}comments`, {
        method: 'POST',
        body: JSON.stringify({
            text: text,
            name: name,
            date: date,
            likes: likes,
            isLiked: isLiked,
            forceError: forceError,
        }),
        headers: {
            Authorization: token,
        },
    }).then((resultComments) => {
        if (resultComments.status == 201) {
            return resultComments.json()
        } else if (resultComments.status === 400) {
            throw new Error('Имя или комментраий короткие')
        } else if (resultComments.status === 500) {
            throw new Error('Сервер не отвечает')
        }
    })
}

export function auth({ login, password }) {
    return fetch(`${userUrl}`, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((resultUser) => {
        if (resultUser.status == 201) {
            getUserAuth(true)
            return resultUser.json()
        } else if (resultUser.status === 400) {
            throw new Error('Неверные имя или пароль')
        } else if (resultUser.status === 500) {
            throw new Error('Сервер не отвечает')
        }
    })
}
