// Получениe комментов с сервера (часть кода)

const host = 'https://wedev-api.sky.pro/api/v2/rustam-kholov/comments';
const userUrl = 'https://wedev-api.sky.pro/api/user';

let token = '';


export function fetchAndRenderComments() {
    return fetch(

        host,

        {
            method: "GET",
        }
    ).then((response) => {

        if (response.status === 500) {

            return Promise.reject('Сервер сломался, попробуй позже');

        } else {

            return response.json();

        }
    }).catch((err) => {

        if (err.message === 'Сервер сломался, попробуй позже') {

            return alert('Сервер сломался, попробуй позже')

        } else if (err.message === 'Failed to fetch') {

            return alert('Кажется, у вас сломался интернет, попробуйте позже')
        };
    });
};



export function postComment({ name }, { text }) {

    return fetch(
        host,
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
            }),
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


export function login({login, password}) {

    return fetch(userUrl, {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {

        return response.JSON();
    })
}