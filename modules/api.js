export function getComments() {
    return fetch("https://wedev-api.sky.pro/api/v2/Volkov_Pavel/comments", {
        method: "GET"
    })
    .then((response) => {
        if (response.status === 500) {          
            throw new Error("Сервер сломался, попробуй позже");
        }
        else {
            return response.json();
        }      
    })
}

export function postComment({text, name}) {
    return fetch("https://wedev-api.sky.pro/api/v2/Volkov_Pavel/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: true,
        }),
    }).then((response) => {
        if (response.status === 400) {   
            throw new Error('Имя и комментарий должны быть не короче 3 символов');          
        }
        else if (response.status === 500) {    
            throw new Error('Сервер сломался, попробуй позже');          
        }
        else {
            return response.json();
        }
    })
}