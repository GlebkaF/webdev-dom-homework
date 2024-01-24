import { formatDateTime } from "./datetime.js";
let urlApi = "https://wedev-api.sky.pro/api/v1/zenin-dmitry/comments";
export function get() {
    return fetch(urlApi,
        {
            method: 'GET',
        })
        .then((response) => {
            return response.json();
        })
}

export function post(name, text) {
    return fetch(urlApi,
        {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                text: text,
                date: formatDateTime(new Date),
                isLiked: false,
                likes: 0,
                /* forceError: true, */
            })
        })
};