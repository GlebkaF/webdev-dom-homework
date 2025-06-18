const host = 'https://wedev-api.sky.pro/api/v2/vlad-pozharov'
const authHost = 'https://wedev-api.sky.pro/api/user'

export let token = ''
export const setToken = (newToken) => {
    token = newToken
}
export let name = ''
export const setName = (newName) => {
    name = newName
}

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date: new Date(comment.date),
                    text: comment.text,
                    likes: comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}

export const postComment = (name, text, retryCount = 3) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            name,
            text,
            // forceError: true,
        }),
    }).then((response) => {
        if (response.status === 500 && retryCount > 0) {
            alert('Ошибка сервера')
            return new Promise((resolve) => {
                resolve(postComment(name, text, retryCount - 1))
            })
        }

        if (response.status === 500) {
            throw new Error('Ошибка сервера')
        }
        if (response.status === 400) {
            throw new Error('Количество символов должно быть не менее трех')
        }
        if (response.status === 201) {
            return response.json()
        }
    })
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}
