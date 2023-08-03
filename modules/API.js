export const API_LINK = "https://wedev-api.sky.pro/api/v1/pavelzяяza/comments";

export const getTodos = ({ form }, API_LINK) => {
    return fetch(API_LINK, {
        method: "GET",
    })
        .then((response) => {
            form = `Загрузка...`;
            return response;
        })
        .then((response) => {
            return response.json();
        });
};
