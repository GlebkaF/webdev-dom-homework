
const containerPreloader = document.getElementById('container-preloader');

containerPreloader.textContent = 'Пожалуйста подождите, загружаю комментарии...';

export function getComments() {
	return fetch("https://wedev-api.sky.pro/api/v1/elnur-kakhramanov/comments", {
		method: "GET"
	})
		.then((response) => {

			containerPreloader.textContent = '';
			return response.json();

		})
}

export function postComment({ text, name }) {
	return fetch("https://wedev-api.sky.pro/api/v1/elnur-kakhramanov/comments", {

		method: "POST",
		body: JSON.stringify({
			text: text.replaceAll("&", "&amp;")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replaceAll('"', "&quot;")
				.replaceAll("QUOTE_BEGIN", "<div class='quote'>")
				.replaceAll("QUOTE_END", "</div>"),
			name: name.replaceAll("&", "&amp;")
				.replaceAll("<", "&lt;")
				.replaceAll(">", "&gt;")
				.replaceAll('"', "&quot;")
				.replaceAll("QUOTE_BEGIN", "<div class='quote'>")
				.replaceAll("QUOTE_END", "</div>"),
			// forceError: true,
		})
	})
		.then((response) => {

			if (response.status === 500) {
				throw new Error('Ошибка сервера');
			}
			else if (response.status === 400) {
				throw new Error('Неверный запрос!');
			}
			else {
				return response.json();
			}
		})
}