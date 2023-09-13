export function getTodos() {
    return fetch("https://wedev-api.sky.pro/api/v1/almash/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        });
};

export function postTodo( { text, name }) {
    return fetch("https://wedev-api.sky.pro/api/v1/almash/comments", {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: false,
        }),
    });
}