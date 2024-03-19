export function postComment() {
    fetch("https://wedev-api.sky.pro/api/v1/alenka-s/comments", {
        method: "POST",
        body: JSON.stringify({
            name: nameInputElement.value
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            text: commentInputElement.value
                .replaceAll("<", "&lt")
                .replaceAll(">", "&gt")
                .replaceAll("&", "&amp;")
                .replaceAll('"', "&quot;"),
            forceError: true,
        }),
    })
}