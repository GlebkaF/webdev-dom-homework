export function tryPostAgain(error, func) {
    if (error.message === 'Сервер упал') {
        func()
    //В ином случае алертим сообщение об ошибке
    } else {
        alert(error)
    }
}