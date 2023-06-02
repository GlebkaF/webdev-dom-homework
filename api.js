const host = "https://wedev-api.sky.pro/api/v2/dmitry-tell/comments";

export function getFetch() {
    return fetch(host, {
        method: "GET"
    })
    .then(response => response.json());
}