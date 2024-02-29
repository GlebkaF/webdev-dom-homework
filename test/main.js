// Модуль main.js
import { authUser, getTodos, postTodo } from './api.js'
import { renderTasks } from './renderTasks.js'

export let tasks = []

export const fetchAndRenderTasks = () => {
    getTodos().then((responseData) => {
        tasks = responseData.comments
        renderTasks({ tasks, fetchAndRenderTasks, authUser })
        return true
    })
}

fetchAndRenderTasks()

// buttonAuth.addEventListener("click", () => {

// })
