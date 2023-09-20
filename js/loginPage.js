import { login, setToken } from './api.js'
import { renderRegister } from './renderRegistr.js'

export function setName(newName) {
	window.userName = newName
}

export function renderLogin({ fetchAndRenderTasks }) {
	const appElement = document.getElementById('app')
	const loginHtml = `
	<div class="container">
		<div class="add-form">
			<h2 class="login-title">Форма входа</h2>
			<input type="text" id="login-login" placeholder="Введите логин" value="" />
			<input type="password" id="login-password" placeholder="Введите ваш пароль">
			<button id="login-btn">Войти</button>
			<a id="register-link" class="login-link" href="#">Зарегистрироваться</a>
		</div>
	</div>
	`

	appElement.innerHTML = loginHtml

	const registerElement = document.getElementById('register-link')

	registerElement?.addEventListener('click', (event) => {
		event.preventDefault()
		renderRegister({ fetchAndRenderTasks })
	})

	const btnLoginElement = document.getElementById('login-btn')
	const loginInputElement = document.getElementById('login-login')
	const passwordInputElement = document.getElementById('login-password')

	btnLoginElement.addEventListener('click', () => {
		login({
			login: loginInputElement.value,
			password: passwordInputElement.value,
		})
			.then((responseData) => {
				setToken(responseData.user.token)
				localStorage.setItem('token', responseData.user.token)
				setName(responseData.user.name)
			})
			.then(() => {
				fetchAndRenderTasks()
			})
	})
}
