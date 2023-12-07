export function getTodos(){
   return fetch('https://wedev-api.sky.pro/api/v1/olga-okulova/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался');
            }
            return response.json();
        })
}

export function postTodos(nameInputElement, textInputElement){
    return fetch("https://wedev-api.sky.pro/api/v1/olga-okulova/comments", {
        method: "POST",
        body: JSON.stringify({
            text: String(textInputElement.value)
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: String(nameInputElement.value)
                .replaceAll('<', `&lt;`)
                .replaceAll('>', `&gt;`),
            forceError: false
        })
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался')
            };
            if (response.status === 400) {
                throw new Error('Ошибка запроса');
            };
            return response.json();
        })
}