import { getComments } from './api.js'
import { renderComments } from './renderComments.js'
import { format } from 'date-fns'

// Получаем все необходимые элементы

const loaderPage = document.querySelector('.page-loader')
let comments = []

export const mapData = () => {
    return (
        getComments()
            .then((resultData) => {
                loaderPage.style.display = 'block'
                const resultComments = resultData.comments.map((comment) => {
                    let currentDate = format(
                        new Date(comment.date),
                        'yyyy-MM-dd hh.mm.ss',
                    )
                    //let currentDate = getCurrentDate(new Date(comment.date));
                    return {
                        author: comment.author.name,
                        date: currentDate,
                        text: comment.text,
                        likeCount: comment.likes,
                        myLike: comment.isLiked,
                    }
                })
                comments = resultComments
                renderComments({ comments })
            })
            // eslint-disable-next-line no-unused-vars
            .then((_resultData) => {
                loaderPage.style.display = 'none'
            })
            // eslint-disable-next-line no-unused-vars
            .catch((error) => {
                alert('Упс, сервер упал')
                loaderPage.style.display = 'none'
            })
    )
}
mapData()

//Функция рендера комментариев
renderComments({ comments })
