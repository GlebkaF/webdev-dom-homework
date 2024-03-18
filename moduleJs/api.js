export function fetchAndRenderComments() {
    return fetch(

        'https://wedev-api.sky.pro/api/v1/rustam-kholov/comments',

        {
            method: "GET"
        }
    ).then((response) => {

        if (response.message === 500) {

            return Promise.reject('Сервер сломался, попробуй позже');

        } else {
        
            return response.json();

        }
    }).catch((err) => {

        if (err.message === 'Сервер сломался, попробуй позже') {
            
            return alert('Сервер сломался, попробуй позже')

        } else if(err.message === 'Failed to fetch') {
            
            return alert('Кажется, у вас сломался интернет, попробуйте позже')
        };
    });
};



export function postComment({ name }, { text }) {
    
    return fetch(
        'https://wedev-api.sky.pro/api/v1/rustam-kholov/comments',
        {
            method: "POST",
            body: JSON.stringify({
                name: name
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;"),
                text: text
                    .replaceAll("&", "&amp;")
                    .replaceAll("<", "&lt;")
                    .replaceAll(">", "&gt;")
                    .replaceAll('"', "&quot;"),
            })
        }).catch(() => {

            alert('Кажется, у вас сломался интернет, попробуйте позже');
            addButtonElement.disabled = false;
            addButtonElement.textContent = 'Добавить';

        }).then((response) => {

            if (response.status === 500) {

                return Promise.reject('Сервер сломался, попробуй позже');

            } else if (response.status === 400) {

                return Promise.reject('Имя и комментарий должны быть не короче 3 символов');

            } else {

                return response.json();

            }
        });
};