const commentsUrl = 'https://wedev-api.sky.pro/api/v2/adam-batukaev/comments';
const userUrl = 'https://wedev-api.sky.pro/api/user/login';
const newUser = 'https://wedev-api.sky.pro/api/user';

export let token;

export const setToken = (newToken) => {
    token = newToken;
}



export function getComments() {
    return fetch(commentsUrl, {
        method: "GET",
    })
        .then((response) => {
            return response.json();
        })
}


export function postComments(newComment) {
    return fetch(commentsUrl, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
        .then((response) => {
            // Code handling errors
            if (response.status === 201) {
                return response.json();
            } else if (response.status === 400) {
                return Promise.reject("Bad request");
            } else {
                return Promise.reject("Bad connection");
            }
        })
}


export function login({ login, password }) {
    return fetch(userUrl, {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        return response.json();
    });
}

export function regNewUser({ login, name, password }) {
    return fetch(newUser, {
        method: "POST",
        body: JSON.stringify({
            login,
            name,
            password,
        }),
    }).then((response) => {
        return response.json();
    });
}