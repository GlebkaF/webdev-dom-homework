export function getData() {

    return fetch("https://wedev-api.sky.pro/api/v1/stepan-titov/comments", {
        method: "GET"
    })
        .then((response) => {

            return response.json();
        })
};

export function postData({ text, name }) {
    return fetch("https://wedev-api.sky.pro/api/v1/stepan-titov/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: true //Согласно документации POST-запрос будет в половине случаев отвечать 500-й ошибкой
            //добавлено для домашки 2.14
        }),

    })
};