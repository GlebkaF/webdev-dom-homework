export const getCommentsApi = () => {
    return fetch('https://wedev-api.sky.pro/api/v1/ulyana-lazutina/comments', {
        method: 'GET',
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался')
            }
            document.querySelector('.loader').style.display = "none";
            document.querySelector('.add-form').style.display = "flex";
            return response.json()
        })
}

export const addCommentApi = ({text, name}) => {
    return fetch('https://wedev-api.sky.pro/api/v1/ulyana-lazutina/comments', {
        method: 'POST',
        body: JSON.stringify({
            "text": text
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;')
                .replaceAll("%BEGIN_QUOTE", "<div class='quote'>")
                .replaceAll("END_QUOTE%", "</div>"),
            "name": name,
            forceError: false
        }),
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер сломался')
            };
            if (response.status === 400) {
                throw new Error('Плохой запрос');
            };
            return response.json();
        })
}
