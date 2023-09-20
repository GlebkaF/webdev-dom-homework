import { postComment, token } from './api.js'
import { renderLogin } from './loginPage.js'

export function renderComments({ comments, fetchAndRenderTasks, name }) {
	const commentsHtml = comments
		.map((comment, index) => {
			return `
			<li class='comment' data-index='${index}'>
				<div class='comment-header'>
					<div>${comment.name}</div>
					<div>${comment.date}</div>
				</div>
				<div class='comment-body'>
					${
						comment.isEdit
							? `<textarea class='add-form-text comment-edit-text'>${comment.text}</textarea>`
							: `<div class='comment-text' style='white-space:pre-line'>${comment.text}</div>`
					}
				</div>
				<button class='add-form-button edits' data-index='${index}'>
					${comment.isEdit ? 'Сохранить' : 'Редактировать'}
				</button>
				<div class='comment-footer'>
					<div class='likes'>
					<span class='likes-counter'>${comment.likes}</span>
					<button class='like-button ${
						comment.isLiked ? ' -active-like' : ''
					}' data-index='${index}'>
					</button>
				</div>
				</div>
			</li>
				`
		})
		.join('')

	const appElement = document.getElementById('app')

	const appHtml = `
		<div class='container'>
		<div id='container-preloader'>Пожалуйста подождите, загружаю комментарии..</div>
		<ul class='comments' id='list'>${commentsHtml}
		</ul>
		<div id='container-preloader-post'></div>
		${
			token
				? `<div class='add-form'>
			<input type='text' class='add-form-name' placeholder='Введите ваше имя' disabled value='${name}' />
			<textarea type='textarea' class='add-form-text' placeholder='Введите ваш коментарий' rows='4'></textarea>
					<div class='add-form-row'>
						<button class='add-form-button' id='add-button'>Написать</button>
					</div>
				</div>`
				: `<div class='authorization'>Чтобы добавить комментарий, <a href='index.html' id='authorization-link'>авторизуйтесь</a></div>`
		}
		</div>`

	appElement.innerHTML = appHtml

	const authorizationElement = document.getElementById('authorization-link')
	authorizationElement?.addEventListener('click', (event) => {
		event.preventDefault()
		renderLogin({ comments, fetchAndRenderTasks })
	})

	const btnElement = document.getElementById('add-button')
	const nameInputElement = document.querySelector('.add-form-name')
	const nameTextAreaElement = document.querySelector('.add-form-text')
	const addFormElement = document.querySelector('.add-form')

	const containerPreloader = document.getElementById('container-preloader')
	containerPreloader.textContent = ''

	btnElementInit(
		btnElement,
		nameInputElement,
		nameTextAreaElement,
		addFormElement,
		fetchAndRenderTasks,
	)
	initEventListeners(comments, fetchAndRenderTasks, nameTextAreaElement)
	functionEdit(comments, fetchAndRenderTasks)
}

function btnElementInit(
	btnElement,
	nameInputElement,
	nameTextAreaElement,
	addFormElement,
	fetchAndRenderTasks,
) {
	const containerPreloaderPost = document.getElementById(
		'container-preloader-post',
	)

	btnElement?.addEventListener('click', () => {
		nameInputElement.classList.remove('error')
		nameTextAreaElement.classList.remove('error')

		if (nameInputElement.value === '') {
			nameInputElement.classList.add('error')
			return
		}
		if (nameTextAreaElement.value === '') {
			nameTextAreaElement.classList.add('error')
			return
		}
		// скрываем форму отправки
		addFormElement.classList.add('form-none')
		containerPreloaderPost.textContent = 'Добавляется комментарий...'

		// подписываемся на успешное завершение запроса с помощью then
		function addTodo() {
			postComment({
				text: nameTextAreaElement.value,
				name: nameInputElement.value,
			})
				.then(() => {
					return fetchAndRenderTasks()
				})
				.then(() => {
					containerPreloaderPost.textContent = ''
					addFormElement.classList.remove('form-none')
					nameInputElement.value = ''
					nameTextAreaElement.value = ''
				})
				.catch((error) => {
					containerPreloaderPost.textContent = ''
					addFormElement.classList.remove('form-none')

					if (error.message === 'Неверный запрос!') {
						alert(
							'Имя и комментарий должны быть не короче 3 символов',
						)
					} else if (error.message === 'Ошибка сервера') {
						alert('Сервер сломался, попробуй позже')
						addTodo()
					} else {
						console.error(error)
					}
				})
		}

		addTodo()
	})
}

function initEventListeners(
	comments,
	fetchAndRenderTasks,
	nameTextAreaElement,
) {
	if (!token) return

	const buttonElements = document.querySelectorAll('.like-button')

	for (const buttonElement of buttonElements) {
		buttonElement.addEventListener('click', (event) => {
			// тормозим цепочку распростронения событий
			event.stopPropagation()
			// индекс = номер обьекта в массиве, получаем из дата атрибута кнопки на которую нажимаем
			const index = buttonElement.dataset.index

			// Пример использования:
			delay(2000).then(() => {
				if (comments[index].isLiked) {
					comments[index].isLiked = false
					comments[index].likes--
				} else {
					comments[index].isLiked = true
					comments[index].likes++
				}
				renderComments({ comments, fetchAndRenderTasks })
			})

			renderComments({ comments, fetchAndRenderTasks })
		})
	}
	// создаю коллекцию коменнтариев
	const answerElements = document.querySelectorAll('.comment')

	for (const answer of answerElements) {
		answer.addEventListener('click', () => {
			const index = answer.dataset.index
			// вариант со звездой
			nameTextAreaElement.value = `QUOTE_BEGIN${comments[index].name}:\n${comments[index].text}QUOTE_END`
		})
	}
}

function functionEdit(comments, fetchAndRenderTasks) {
	if (!token) return

	const commentEditText = document.querySelector('.comment-edit-text')

	const editElements = document.querySelectorAll('.edits')

	for (const edit of editElements) {
		edit.addEventListener('click', () => {
			const index = edit.dataset.index

			if (comments[index].isEdit) {
				comments[index].isEdit = false
				comments[index].text = commentEditText.value
			} else {
				comments[index].isEdit = true
			}

			renderComments({
				comments,
				fetchAndRenderTasks,
				name: window.userName,
			})
		})
	}
}

function delay(interval = 300) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve()
		}, interval)
	})
}
