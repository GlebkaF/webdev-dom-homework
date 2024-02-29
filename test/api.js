import { fetchAndRenderTasks, tasks } from './main.js'
import { renderTasks } from './renderTasks.js'

// Модуль api.js
const host = 'https://wedev-api.sky.pro/api/v1/pavel-fedotov/comments'
const hostAuth = 'https://wedev-api.sky.pro/api/user/login'
export let authUser = false
export let token

export function getAuthUser(newAuthUser) {
    return (authUser = newAuthUser)
}

export const getToken = (newToken) => {
    token = 'Bearer ' + newToken
    console.log(token)
}

// export const token =
//   "Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k";

export function getTodos() {
    return fetch(host, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json()
    })
}

export function deleteTodo({ id }) {
    return fetch(`${host}/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json()
    })
}

export function postTodo({ name, text }) {
    return fetch(host, {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            name,
            text,
        }),
    }).then((response) => {
        return response.json()
    })
}

export function auth({ login, password }) {
    return fetch(hostAuth, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json()
    })
}
