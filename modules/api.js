const commentsUrl = 'https://wedev-api.sky.pro/api/v1/lyubov-khusnullina/comments';

export function getApiComments() {
    return fetch(commentsUrl, {
    method: 'GET'
})
    .then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер упал');
        }
        return response.json()
    })
}

export function postApiComment({ name, text, date, forceError }) {
    return fetch(commentsUrl, {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            text: text,
            date: date,
            forceError: forceError, 
        }),
    })
    .then((response) => {
        if (response.status === 500) {
            throw new Error('Сервер упал');
        }
        if (response.status === 400) {
            throw new Error('Bad Request');
        }
        return response.json();
    })
    .then((responseData) => {
        comments = responseData.comments;
        renderComments();
    })
}



