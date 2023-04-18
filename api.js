const host = "https://webdev-hw-api.vercel.app/api/v1/ekaterina-budylina/comments";

const getApi = () => {
    return fetch(host, {
        method: "GET",
        forceError: true,
    })
        .then((response) => {
            // Запускаем преобразовываем "сырые" данные от API в json формат
            return response.json();
        })
};

export default getApi;

export const options = {
    year: "2-digit",
    month: "numeric",
    day: "numeric",
    timezone: "UTC",
    hour: "numeric",
    minute: "2-digit",
};

export const nameInputElement = document.getElementById("name-input");
export const textInputElement = document.getElementById("text-input");

export const postApi = () => {
    const date = new Date().toLocaleString("ru-RU", options);
    return fetch(host, {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;"),
            date: date,
            text: textInputElement.value
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;"),
            counter: 0,
            liked: false,
            forceError: true,
        }),
    })
};