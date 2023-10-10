import { userUrl, baseUrl } from './globalVariables.js'

export const getComments = () => {
    let requestParams
    if (window.localStorage.getItem('Token') === '') {
        requestParams = {
            method: 'GET',
        }
    } else {
        requestParams = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Token')}`,
            },
        }
    }

    return fetch(
        `${baseUrl}${
            window.localStorage.getItem('login')
                ? window.localStorage.getItem('login')
                : 'default'
        }/comments`,
        requestParams
    ).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер недоступен')
        }
        return response.json()
    })
}

export const deleteComment = (index) => {
    return fetch(
        `${baseUrl}${
            window.localStorage.getItem('login')
                ? window.localStorage.getItem('login')
                : 'default'
        }/comments/${index}`,
        {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Token')}`,
            },
        }
    ).then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер недоступен')
        }
        return response.json()
    })
}

export const postComment = () => {
    let formText = document.querySelector('.add-form-text')
    return fetch(
        `${baseUrl}${
            window.localStorage.getItem('login')
                ? window.localStorage.getItem('login')
                : 'default'
        }/comments`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Token')}`,
            },
            body: JSON.stringify({
                text: formText.value
                    .replaceAll('&', '&amp;')
                    .replaceAll('"', '&quot;')
                    .replaceAll('<', '&lt;')
                    .replaceAll('>', '&gt;'),
            }),
        }
    )
}

export const loginUser = ({ loginInput, passwordInput }) => {
    return fetch(`${userUrl}/login`, {
        method: 'POST',
        body: JSON.stringify({ login: loginInput, password: passwordInput }),
    }).then((responseData) => {
        if (responseData.status === 500) {
            throw new Error('Сервер недоступен')
        }
        return responseData.json()
    })
}

export const registrateUser = ({ loginInput, passwordInput, nameInput }) => {
    return fetch(userUrl, {
        method: 'POST',
        body: JSON.stringify({
            login: loginInput,
            password: passwordInput,
            name: nameInput,
        }),
    }).then((responseData) => {
        if (responseData.status === 500) {
            throw new Error('Сервер недоступен')
        }
        return responseData.json()
    })
}

export const toggleLike = (index) => {
    return fetch(
        `${baseUrl}${
            window.localStorage.getItem('login')
                ? window.localStorage.getItem('login')
                : 'default'
        }/comments/${index}/toggle-like`,
        {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem('Token')}`,
            },
        }
    ).then((responseData) => {
        if (responseData.status === 500) {
            throw new Error('Сервер недоступен')
        }
        return responseData.json()
    })
}
