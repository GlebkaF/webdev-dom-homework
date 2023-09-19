import { postComment, getComments } from "./api.js";
import { renderComments } from "./renderComments.js";

// Код писать здесь
const btnElement = document.querySelector('.add-form-button');
const nameInputElement = document.querySelector('.add-form-name');
const nameTextAreaElement = document.querySelector('.add-form-text');
const myDate = new Date().toLocaleDateString().slice(0, 6) + new Date().toLocaleDateString().slice(-2);
const nowDate = myDate + ' ' + new Date().toLocaleTimeString().slice(0, -3);


const containerPreloaderPost = document.getElementById('container-preloader-post');
const addFormElement = document.querySelector('.add-form');
const likeBtnElement = document.querySelectorAll('.like-button');


// COMMENTS нужно получать из хранилища данных
let comments = [];

// запрос GET
const fetchAndRenderTasks = () => {
	getComments().then((responseData) => {

		const appComments = responseData.comments.map((comment) => {
			return {
				name: comment.author.name,
				date: new Date(comment.date),
				likes: comment.likes,
				isLiked: false,
				text: comment.text,
			};
		});

		comments = appComments;
		renderComments({ comments });
	});
}

function delay(interval = 300) {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, interval);
	});
}

export const initEventListeners = () => {

	const buttonElements = document.querySelectorAll('.like-button');

	for (const buttonElement of buttonElements) {
		buttonElement.addEventListener('click', (event) => {
			// тормозим цепочку распростронения событий 
			event.stopPropagation();
			// индекс = номер обьекта в массиве, получаем из дата атрибута кнопки на которую нажимаем
			const index = buttonElement.dataset.index;

			// Пример использования:
			delay(2000).then(() => {
				if (comments[index].isLiked) {
					comments[index].isLiked = false;
					comments[index].likes--;
				} else {
					comments[index].isLiked = true;
					comments[index].likes++;
				}
				renderComments({ comments });
			});

			renderComments({ comments });
		});
	}


	// создаю коллекцию коменнтариев
	const answerElements = document.querySelectorAll('.comment');

	for (const answer of answerElements) {
		answer.addEventListener('click', () => {

			const index = answer.dataset.index;
			// вариант со звездой
			nameTextAreaElement.value = `QUOTE_BEGIN${comments[index].name}:\n${comments[index].text}QUOTE_END`;
		});
	}
};


export function functionEdit() {
	const commentEditText = document.querySelector('.comment-edit-text');

	const editElements = document.querySelectorAll('.edits');

	for (const edit of editElements) {
		edit.addEventListener('click', () => {
			// event.stopPropagation();

			const index = edit.dataset.index;
			console.log(index);

			if (comments[index].isEdit) {
				comments[index].isEdit = false;
				comments[index].text = commentEditText.value;
			} else {
				comments[index].isEdit = true;
			}

			renderComments({ comments });
		});
	}
}

fetchAndRenderTasks();
renderComments({ comments });


btnElement.addEventListener('click', () => {

	nameInputElement.classList.remove('error');
	nameTextAreaElement.classList.remove('error');


	if (nameInputElement.value === '') {
		nameInputElement.classList.add('error');
		return;
	}
	if (nameTextAreaElement.value === '') {
		nameTextAreaElement.classList.add('error');
		return;
	}
	// скрываем форму отправки
	addFormElement.classList.add('form-none');


	// подписываемся на успешное завершение запроса с помощью then
	const addTodo = () => {
		containerPreloaderPost.textContent = 'Добавляется комментарий...';

		postComment({
			text: nameTextAreaElement.value,
			name: nameInputElement.value,
		}).then((responseData) => {
			return fetchAndRenderTasks();
		})
			.then((data) => {
				containerPreloaderPost.textContent = '';
				addFormElement.classList.remove('form-none');
				nameInputElement.value = '';
				nameTextAreaElement.value = '';
			})
			.catch((error) => {
				containerPreloaderPost.textContent = '';
				addFormElement.classList.remove('form-none');

				if (error.message === 'Неверный запрос!') {
					alert('Имя и комментарий должны быть не короче 3 символов');
				} else if (error.message === "Ошибка сервера") {
					alert('Сервер сломался, попробуй позже');
					addTodo();
				} else {
					alert('Кажется у вас сломался интернет');
				}
			})
	}

	addTodo();
	renderComments({ comments });

});