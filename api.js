const host = "https://webdev-hw-api.vercel.app/api/v2/marina-obruch/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login";

const getFetch = () => {
    return fetch(host, {
        method: "GET"
    })
        .then((responseStart) => {
            return responseStart.json();
        })
};


// Добавляем новый комментарий в ленту с помощью POST
function postComment(commentInputElement, token) {
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            text: commentInputElement.value,
        }),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            if (response.status === 201) {
                console.log(response);
                return response.json();
            }
            if (response.status === 400) {
                console.log("Ошибка 400");
                alert("Имя и комментарий должны быть не короче 3 символов");
                throw new Error("Ошибка 400");
            }
            if (response.status === 500) {
                console.log("Ошибка 500");
                alert("Сервер сломался, попробуй позже");
                throw new Error("Ошибка 500");
            }
        })
}

function fetchLogin(login, password) {
    return fetch(loginHost, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    })
}

export { getFetch, postComment, fetchLogin }