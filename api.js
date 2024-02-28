export function getFetchModule() {
    return fetch("https://wedev-api.sky.pro/api/v1/:aleksandr-penkov/comments", {
        method: "GET"
    })
        .then((response) => {
            return response.json()
        })

}

export function postFetchModule() {
    const textareaElement = document.getElementById('commitInput');
    const inputElement = document.getElementById('nameInput');
    return fetch("https://wedev-api.sky.pro/api/v1/:aleksandr-penkov/comments", {
        method: "POST",
        body: JSON.stringify({
            text: textareaElement.value
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
            name: inputElement.value
                .replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
        })
    })
}

