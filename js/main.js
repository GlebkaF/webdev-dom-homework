import { getComments } from './api.js'
import { renderComments } from './renderComments.js'
import { format } from 'date-fns'

// Код писать здесь

// COMMENTS нужно получать из хранилища данных
let comments = []

// запрос GET
function fetchAndRenderTasks() {
	getComments().then((responseData) => {
		const appComments = responseData.comments.map((comment) => {
			const createDate = format(
				new Date(comment.date),
				'yyyy-MM-dd hh.mm.ss',
			)
			return {
				name: comment.author.name,
				date: createDate,
				likes: comment.likes,
				isLiked: false,
				text: comment.text,
			}
		})

		comments = appComments

		renderComments({
			comments,
			fetchAndRenderTasks,
			name: window.userName,
		})
	})
}

fetchAndRenderTasks()
