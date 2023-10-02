
export let token;
export let userLogin;

export function autorization () {

    const autorizationButton = document.querySelector('.add-form-button-in');
    const login = document.getElementById('login');
    const password = document.getElementById('password');

    autorizationButton.addEventListener("click", () => {

        return fetch ("https://wedev-api.sky.pro/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                login: login.value,
                password: password.value
            })
        })
        .then((response) => {

            if (response.status === 400) {
                alert ('Неправильный логин или пароль');
                throw new Error("Неправильный логин или пароль")
              } else {
                return response.json();
              }
        })
        .then((responseData) => {
            console.log(`Bearer token is arrived`);
            token = responseData.user.token;
            return responseData.user.name;
        })
        .then((response) => {
            document.querySelector(".login_form_box").classList.add('hide-elem');
            document.querySelector(".add-form").classList.remove('hide-elem');
            document.querySelector('.comments').classList.remove('hide-elem');
            document.getElementsByClassName('add-form-name')[0].value=response;
        })
        .catch((error) => {
            console.log(error);
        })
    })
};

export function registration () {
    const registrationButton = document.querySelector('.add-form-button-reg');
    const login = document.getElementById('login');
    const name = document.getElementById('name');
    const password = document.getElementById('password');

    registrationButton.addEventListener("click", () => {
        return fetch ('https://wedev-api.sky.pro/api/user', {
            method: "POST",
            body: JSON.stringify({
                login: login.value,
                name: name.value,
                password: password.value
                })
            })
            .then((response) => {
                if (response.status === 400) {
                  alert ('Пользователь с таким логином уже сущетсвует');
                  throw new Error("Пользователь с таким логином уже сущетсвует")
                } else {
                  return response.json();
                }
            })
            .then((responseData) => {
                console.log(`Bearer token is arrived`);
                token = responseData.user.token;
                return responseData.user.name;
            })
            .then((response) => {
                document.querySelector(".login_form_box").classList.add('hide-elem');
                document.querySelector(".add-form").classList.remove('hide-elem');
                document.querySelector('.comments').classList.remove('hide-elem');
                document.getElementsByClassName('add-form-name')[0].value=response;
            })
            .catch((error) => {
                console.log(error);
            })
    });
}