const API_URL = 'https://wedev-api.sky.pro/api/v1/masha-pavlenko/comments'
function formatDate(dateString) {
    const date = new Date(dateString)

    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear().toString().slice(-2)
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${day}.${month}.${year} ${hours}:${minutes}`
}
export function fetchComments(onSuccess) {
    const fetchPromise = fetch(API_URL, {
        method: 'GET',
    })
    fetchPromise
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ошибка отправки комментариев')
            }

            const jsonPromise = response.json()
            jsonPromise
                .then((responseData) => {
                    const newComments = responseData.comments.map((comment) => {
                        return {
                            name: comment.author.name,
                            text: comment.text,
                            likes: comment.likes,
                            isLiked: comment.isLiked,
                            date: formatDate(comment.date),
                        }
                    })
                    onSuccess(newComments)
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        })
}

export function postComment(name, text, onSuccess) {
    const fetchPromise = fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: text,
        }),
    })

    fetchPromise
        .then((response) => {
            const jsonPromise = response.json()

            jsonPromise
                .then((data) => {
                    console.log('Ответ сервера:', data)

                    if (!response.ok) {
                        throw new Error('Ошибка отправки комментария')
                    }
                    onSuccess()
                })
                .catch((error) => {
                    console.log(error)
                })
        })
        .catch((error) => {
            console.log(error)
        })
}
