const host = 'https://wedev-api.sky.pro/api/v2/tanya-koryachkina/comments';

export function getFetchComments({ token }) {
    return fetch(host, {
        method: "GET",
        headers: {
            Authorization: token,
        }
    })
    .then((response) => {
        if(response.status ===401) {

            alert("Не авторизованы");
            throw new Error ("Не авторизованы");
            
        }
        return response.json();
    })
};

export function addComment({ name, text, token }) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
          name,
          text,
          //forceError: true,
        }), 
        headers: {
            Authorization: token,
        }
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            alert('Имя и комментарий должны содержать хотя бы 3 символа');
              
            throw new Error("Неверный запрос");

        } else {
            return response.json();
        } 
    })
};

export function loginUser({ login, password }) {
    return fetch('https://wedev-api.sky.pro/api/user/login', {
        method: "POST",
        body: JSON.stringify({
          login,
          password,
          //forceError: true,
        }), 
        
    })
    .then((response) => {
        if(response.status === 500) {

            alert('Сервер сломался, попробуй позже');
              
            throw new Error("Сервер упал");

        } else if(response.status === 400) {

            //alert('Неверный логин или пароль');
              
            throw new Error("Неверный логин или пароль");

        } else {
            return response.json();
        } 
    })
}