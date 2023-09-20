import { register, setToken } from './api.js'
import { setName } from './loginPage.js'

export function renderRegister({ fetchAndRenderTasks }) {
	const appElement = document.getElementById('app')
	const loginHtml = `
	<div class="container">
	<div class="add-form">
		<h2 class="login-title">Форма регистрации</h2>
		<input type="text" id="login-name" placeholder="Введите имя" value="" />
		<input type="text" id="login-login" placeholder="Введите логин" value="" />
		<input type="password" id="login-password" placeholder="Введите ваш пароль">
		<button id="login-btn">Зарегистрироваться</button>
		<a class="login-link" href="index.html">Войти</a>
	</div> 
	`

	appElement.innerHTML = loginHtml

	const btnLoginElement = document.getElementById('login-btn')
	const loginInputElement = document.getElementById('login-login')
	const passwordInputElement = document.getElementById('login-password')
	const nameRegisterElement = document.getElementById('login-name')

	btnLoginElement.addEventListener('click', () => {
		btnLoginElement.disabled = true
		register({
			login: loginInputElement.value,
			password: passwordInputElement.value,
			name: nameRegisterElement.value,
		})
			.then((responseData) => {
				setToken(responseData.user.token)

				localStorage.setItem('tokenSave', responseData.user.token)

				setName(responseData.user.name)
			})
			.then(() => {
				fetchAndRenderTasks()
			})
	})
}
