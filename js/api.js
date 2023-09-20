const commentsUrl = 'https://wedev-api.sky.pro/api/v2/alisher-bazhenov/comments'
const userUrl = 'https://wedev-api.sky.pro/api/user/login'
const userRegistr = 'https://wedev-api.sky.pro/api/user'

export let token

export const setToken = (newToken) => {
	token = newToken
}

export function getComments() {
	return fetch(commentsUrl, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}).then((response) => {
		if (response.status === 401) {
			throw new Error('Нет авторизации')
		}
		return response.json()
	})
}

export function postComment({ text, name }) {
	return fetch(commentsUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			text: text
				.replaceAll('&', '&amp;')
				.replaceAll('<', '&lt;')
				.replaceAll('>', '&gt;')
				.replaceAll('"', '&quot;')
				.replaceAll('QUOTE_BEGIN', "<div class='quote'>")
				.replaceAll('QUOTE_END', '</div>'),
			name: name
				.replaceAll('&', '&amp;')
				.replaceAll('<', '&lt;')
				.replaceAll('>', '&gt;')
				.replaceAll('"', '&quot;')
				.replaceAll('QUOTE_BEGIN', "<div class='quote'>")
				.replaceAll('QUOTE_END', '</div>'),
			// forceError: true,
		}),
	}).then((response) => {
		if (response.status === 500) {
			throw new Error('Ошибка сервера')
		} else if (response.status === 400) {
			throw new Error('Неверный запрос!')
		} else {
			return response.json()
		}
	})
}

export function login({ login, password }) {
	return fetch(userUrl, {
		method: 'POST',
		body: JSON.stringify({
			login,
			password,
		}),
	}).then((response) => {
		return response.json()
	})
}

export function register({ login, password, name }) {
	return fetch(userRegistr, {
		method: 'POST',
		body: JSON.stringify({
			login,
			password,
			name,
		}),
	}).then((response) => {
		return response.json()
	})
}
