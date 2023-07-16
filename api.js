function getFetch() {
    return fetch("https://wedev-api.sky.pro/api/v1/nkvereshch/comments", {
        method: "GET"
    })
    .then((response) => {
            if (response.status === 200) {
            return response.json();
            }
            if (response.status === 400) {
            throw new Error('Имя и комментарий должны быть не короче 3 символов')
            }
            if (response.status === 500) {
            throw new Error('Сервер сломался, попробуй позже')
            }
            else {
            throw new Error('Не работает интернет')
            }
    })
}

function postFetch() {
    const nameUser = document.querySelector(".add-form-name");
    const commentUser = document.querySelector(".add-form-text");
    return fetch("https://wedev-api.sky.pro/api/v1/nkvereshch/comments", {
		method: "POST",
		body: JSON.stringify({
			text: commentUser.value,
			name: nameUser.value,
			// forceError: true
		}),
    })
    .then((response) => {
        if (response.status === 201) {

            nameUser.value = "";
            commentUser.value = "";
            return response.json();
        }
        if (response.status === 400) {
            throw new Error('Имя и комментарий должны быть не короче 3 символов')
        }
        if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже");
        }
        if (nameUser.value.length < 3 ||  commentUser.value.length < 3) {
            throw new Error("Имя и комментарий должны быть не короче 3 символов");
        }
    })
}

function catchFetch(error) {
        if (error.message === "Сервер сломался, попробуй позже") {
            console.error('Сервер сломался, попробуй позже');
            addComment();
        }
        if (error.message === "Имя и комментарий должны быть не короче 3 символов") {
            console.error('Имя и комментарий должны быть не короче 3 символов');
            alert("Имя и комментарий должны быть не короче 3 символов");
        }
        else {
            console.warn(error)
        }
}

export {getFetch, postFetch, catchFetch}