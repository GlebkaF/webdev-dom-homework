
export function getTodos() {

return fetch("https://wedev-api.sky.pro/api/v1/yana-orlova/comments", {
    method: "GET",
})
.then((response) => {
    if (response.status === 500) {
            //код который обработает ошибку
            throw new Error('Сервер упал');
        } 
    return response.json();
});
}

 export function postTodo(postData) {
return fetch("https://wedev-api.sky.pro/api/v1/yana-orlova/comments", {
        method: "POST",
        body: JSON.stringify(
            postData
            ),
    })
    .then((response) => {
        if (response.status === 500) {
            //код который обработает ошибку
            throw new Error('Сервер упал');
        } 
        if (response.status === 400) {
            //код который обработает ошибку
            throw new Error('Неверные данные ввода');
        } 
            return response.json();
    
    });
}
