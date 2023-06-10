const userHost = "https://wedev-api.sky.pro/api/user";

function loginToApp({ login, password }) {

    return fetch(userHost + "/login", {
        method: "POST",
        body: JSON.stringify({
            login,
            password,
        })
    }).then((response) => {
        if (response.status === 400) {
            throw new Error("Неверный логин или пароль");
        };
        return response.json();
    })
};


export { loginToApp };