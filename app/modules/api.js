export function getCommentList() {
    return fetch("https://wedev-api.sky.pro/api/v1/georgi-silanyev/comments", {
        method: "GET",
    })
    .then((response) => response.json())
}

export function postNewComment(comment, name, func) {
    return fetch("https://wedev-api.sky.pro/api/v1/georgi-silanyev/comments", {
        method: "POST",
        body : JSON.stringify({
            text: func(comment),
            name: func(name),
            date: new Date(),
            likes: 0,
            isLiked: false,
            forceError: true
        })
    })
    .then((response) => {
        //если статус 201 просто продолжаем цепочку промисов
        if (response.status === 201) {
            return response.json()
        // в ином случае проверяем код статуса и по разному обрабатываем
        } else {
            //просто попробовать на практике switch/case
            switch (response.status) {
                case 400: throw new Error('Имя и комментарий не могут быть меньше 3-х символов')
                case 500: throw new Error('Сервер упал')
                default: throw new Error('Что-то пошло не так, попробуйте позже')
            }
        }
        
    })
}