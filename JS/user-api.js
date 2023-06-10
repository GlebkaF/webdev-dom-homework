

// const userHost = "https://wedev-api.sky.pro/api/user";


function loginToApp({ login, password }) {

    return fetch("https://wedev-api.sky.pro/api/user/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    }).then((response) => {
        return response.json();
    })
    // .catch((error) => {
    //     if (error.message === "Ошибка 400") {
    //         console.log(error);
    //         alert("Имя и комментарий должны быть не короче 3 символов");
    //     } else {
    //         alert("Кажется, у вас сломался интернет, попробуйте позже");
    //     };
    // })
};

export { loginToApp };