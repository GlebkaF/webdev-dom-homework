// Модуль renderTasks.js
import { deleteTodo, postTodo } from './api.js'
import { fetchAndRenderTasks } from './main.js'
import { renderAuth } from './renderAuth.js'

const container = document.getElementById('container')
let formAddComment
let blockAuth
let blockDelete

export const renderTasks = ({ tasks, fetchAndRenderTasks, authUser }) => {
    if (authUser) {
        blockDelete = 'block'
    } else {
        blockDelete = 'none'
    }

    const tasksHtml = tasks
        .map((task) => {
            return `
      <li class="task">
        <p class="task-text">
          ${task.text}
          <button data-id="${task.id}" class="button delete-button" style="display: ${blockDelete};">Удалить</button>
        </p>
      </li>`
        })
        .join('')

    if (authUser) {
        formAddComment = 'block'
        blockAuth = 'none'
    } else {
        formAddComment = 'none'
        blockAuth = 'block'
    }

    const commentHtml = `
        <h1>Список задач</h1>
        <ul class="tasks" id="list">${tasksHtml}</ul>
        <br />
        <div class="form" style="display: ${formAddComment};">
            <h3 class="form-title">Форма добавления</h3>
            <div class="form-row">
                Что нужно сделать:
                <input
                    type="text"
                    id="text-input"
                    class="input"
                    placeholder="Выпить кофе"
                />
                <br />
                <button class="button" id="add-button">Добавить</button>
            </div>
        </div>
        <div id="form-none-comment" style="display: ${blockAuth};">
            <p>Добавлять комментарии могут только авторизованные пользователи</p>
            <button id="link-to-auth">Авторизоваться</button>
        </div>
    `

    container.innerHTML = commentHtml

    const deleteButtons = document.querySelectorAll('.delete-button')
    const buttonElement = document.getElementById('add-button')
    const textInputElement = document.getElementById('text-input')
    const buttonAuth = document.getElementById('link-to-auth')

    for (const deleteButton of deleteButtons) {
        deleteButton.addEventListener('click', (event) => {
            event.stopPropagation()

            const id = deleteButton.dataset.id

            deleteTodo({ id }).then(() => {
                fetchAndRenderTasks()
            })
        })
    }

    buttonElement.addEventListener('click', () => {
        if (textInputElement.value === '') {
            return
        }

        console.log(buttonElement)
        buttonElement.disabled = true
        buttonElement.textContent = 'Элемент добавляется...'

        postTodo({
            name: 'Pavel',
            text: textInputElement.value,
        }).then(() => {
            return fetchAndRenderTasks()
        })
    })

    buttonAuth.addEventListener('click', () => {
        renderAuth()
    })
}
