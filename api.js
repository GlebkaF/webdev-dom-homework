import { takeDate } from "./date.js";


const host = "https://wedev-api.sky.pro/api/v2/:sofia-iakovleva/comments"

const fetchGet = () => {
    return fetch(host, {
    method: "GET"
})
    // Подписываемся на успешное завершение запроса с помощью then
    .then((response) => {
        // Запускаем преобразовываем "сырые" данные от API в json формат и 
        //подписываемся на успешное завершение запроса с помощью then:
        return response.json();
    })
};


const fetchPOST = (nameInputElement, comentInputElement, token) => {
    return fetch(host, {
    method: "POST",
    headers: {
        Authorization: token
    },
    body: JSON.stringify({
        name: nameInputElement.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;"),
        text: comentInputElement.value
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("QUOTE_BEGIN", "<div class='quote'>")
            .replaceAll("QUOTE_END", "</div><br><br>,"),
        eachDate: takeDate(new Date),
        likes: 0,
        currentLike: false,
        classLike: 'like-button -no-active-like',
        isEdit: false,
        forceError: true,
    }),
})
    // Подписываемся на успешное завершение запроса с помощью then
    .then((response) => {
        if (response.status === 500) {
            throw new Error("Сервер сломался");
        } else if (response.status === 400) {
            throw new Error("Плохой запрос");
        } else {
            return response.json();
        }

    })}

export { fetchGet, fetchPOST};
