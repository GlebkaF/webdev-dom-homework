const commentURL = "https://wedev-api.sky.pro/api/v2/Volkov_Pavel/comments";
const userURL = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
    token = newToken;
}

export function getComments() {
    return fetch(commentURL, {
        method: "GET",
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
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
    return fetch(commentURL, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: true,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export function login({ login, password}) {
    return fetch(userURL, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),        
    }).then((response) => {
            return response.json();
        })
    
}