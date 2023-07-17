//перменная для токена
export let token

//функция для перезаписи токена из других модулей
export const setToken = (newToken) => {
   return token = newToken
}

//получение данных с api
export function getCommentList() {
    return fetch("https://wedev-api.sky.pro/api/v2/georgi-silanyev/comments", {
        method: "GET",
    })
    .then((response) => response.json())
}

//добавление нового коментария в api
export function postNewComment(comment, name, func) {
    return fetch("https://wedev-api.sky.pro/api/v2/georgi-silanyev/comments", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
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

//авторизация
export function login(login, password) {
    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body : JSON.stringify({
            login: login,
            password: password,
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
                case 400: throw new Error('Неправильный логин или пароль!')
                case 500: throw new Error('Сервер упал')
                default: throw new Error('Что-то пошло не так, попробуйте позже')
            }
        }
        
    })
}

//Регистрация
export function registration(login, password, userName) {
    return fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body : JSON.stringify({
            login: login,
            name: userName,
            password: password,
        })
    })
    .then((response) => {
        //если статус 201 просто продолжаем цепочку промисов
        if (response.status === 201) {
            alert('Вы успешно зарегистрировались!')
            return response.json()
        // в ином случае проверяем код статуса и по разному обрабатываем
        } else {
            //просто попробовать на практике switch/case
            switch (response.status) {
                case 400: throw new Error('Пользователь с таким логином уже сущетсвует!')
                case 500: throw new Error('Сервер упал')
                default: throw new Error('Что-то пошло не так, попробуйте позже')
            }
        }
        
    })
}