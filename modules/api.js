export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/elena-bersh/comments", {
        method: "GET",
    })
        .then((response) => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 500) {
                alert("Сервер сломался, попробуйте позже");
                throw new Error("Сервер сломался");
            }
        });  
}
export function postTodo({text, name}) {
return fetch("https://wedev-api.sky.pro/api/v1/elena-bersh/comments", {
    method: "POST",
    body: JSON.stringify({
        text: text,
        name: name,
        // Проверка кода на 500 ошибку. POST-запрос будет в половине случаев отвечать 500-й ошибкой,
         // если в теле запроса передать параметр forceError: true
        forceError: true,
    }),
})
    .then((response) => {
        if (response.status === 201) {
            return response.json();
        } else if (response.status === 500) {
            alert("Сервер сломался, попробуйте позже");
            throw new Error("Сервер сломался");
        } else {
            // alert ставить перед throw, если поменять местами, то алёрт не показывает.
            alert("Вы ввели меньше трёх символов в поле ввода имени или комментария. Введите, пожалуйста, заново.");
            throw new Error("Имя или комментарий короче 3х символов");
        }
    });
}