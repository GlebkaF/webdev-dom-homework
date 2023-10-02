
export let token;
export let userLogin;

export function autorization () {

    const autorizationButton = document.querySelector('.add-form-button-in');
    const login = document.getElementById('login');
    const password = document.getElementById('password');

    autorizationButton.addEventListener("click", () => {
        // Отправили данные в API
        return fetch ("https://wedev-api.sky.pro/api/user/login", {
            method: "POST",
            body: JSON.stringify({
                login: login.value,
                password: password.value
            })
        })
        .then((response) => {
            // Получили ответ и перевели с json
            if (response.status === 400) {
                alert ('Неправильный логин или пароль');
                throw new Error("Неправильный логин или пароль")
              } else {
                return response.json();
              }
        })
        .then((responseData) => {
            console.log(`Bearer token is arrived`);

            // Записали полученый токен в token
            token = responseData.user.token;

            // Сохранили в localStorage токен и имя
            localStorage.setItem('token', token);
            localStorage.setItem('name', responseData.user.name);

            // Передали имя пользователя для формы
            return responseData.user.name;
        })
        .then((response) => {
            // Скрыли форму входа или регистрации
            document.querySelector(".login_form_box").classList.add('hide-elem');

            // Показали форму добавления нового комментария
            document.querySelector(".add-form").classList.remove('hide-elem');

            // Показали список комментариев
            document.querySelector('.comments').classList.remove('hide-elem');

            // Имя в форме равно имени вошедшего пользователя
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
        // Отправили данные в API
        return fetch ('https://wedev-api.sky.pro/api/user', {
            method: "POST",
            body: JSON.stringify({
                login: login.value,
                name: name.value,
                password: password.value
                })
            })
            .then((response) => {
                // Получили ответ и перевели с json
                if (response.status === 400) {
                  alert ('Пользователь с таким логином уже сущетсвует');
                  throw new Error("Пользователь с таким логином уже сущетсвует")
                } else {
                  return response.json();
                }
            })
            .then((responseData) => {

                // Записали полученый токен в token
                token = responseData.user.token;
                
                // Очистили localStorage
                localStorage.clear();

                // Сохранили в localStorage токен и имя
                localStorage.setItem('token', token);
                localStorage.setItem('name', responseData.user.name);

                // Передали имя пользователя для формы
                return responseData.user.name;
            })
            .then((response) => {
                // Скрыли форму входа или регистрации
                document.querySelector(".login_form_box").classList.add('hide-elem');
                
                // Показали форму добавления нового комментария
                document.querySelector(".add-form").classList.remove('hide-elem');

                // Показали список комментариев
                document.querySelector('.comments').classList.remove('hide-elem');

                // Имя в форме равно имени вошедшего пользователя
                document.getElementsByClassName('add-form-name')[0].value=response;
            })
            .catch((error) => {
                console.log(error);
            })
    });
}

// Проверка на сохраненный токен в LocalStorage
export function alreadyLoggedIn () {

    // Если в LocalStorage есть токен, то
    if (localStorage.getItem('token') != null) {
        
        // Мы сохранили его в token
        token = localStorage.getItem('token');

        // Скрыли предложение авторизоваться
        document.querySelector(".move_to_autorization_box").classList.add('hide-elem');

        // Показали форму добавления нового комментария
        document.querySelector(".add-form").classList.remove('hide-elem');

        // Имя в форме равно имени в localStorage
        document.getElementsByClassName('add-form-name')[0].value = localStorage.getItem('name');
    }
}