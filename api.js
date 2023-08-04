export function getComments() {
    return fetch('https://wedev-api.sky.pro/api/v1/adam-batukaev/comments', {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
}


export function postComments(newComment) {
    return fetch('https://wedev-api.sky.pro/api/v1/adam-batukaev/comments', {
        method: "POST",
        body: JSON.stringify(newComment),
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