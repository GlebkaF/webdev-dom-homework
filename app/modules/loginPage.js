import { commentsBox, linkRow, isLogin, setIsLogin, nameInput } from "../app.js"
import { login, registration, setToken } from "./api.js"
import { renderApp } from "./renderApp.js"

//рендер страницы авторизации/регистрации
export const loginPageRender = (call) => {
    commentsBox.innerHTML = 
    `
<div class="login__page">
    <div class="autorization-page">
        <div class="autorization-page__login add-form">
            <div class="autorautorization-page__title">Форма входа</div>
            <input id="input-login-for-login" class="add-form-name" type="text" placeholder="Введите логин" class="autorization-page__input">
            <input id="input-password-for-login" class="add-form-name" type="text" placeholder="Введите пароль" class="autorization-page__input">
            <button id="loginBtn" class="add-form-button">Войти</button>
            <a id="go-To-login" class="autorautorization-page__link">Нет аккаунта? Зарегистрироваться!</a>
        </div>
        <div class="autorization-page__registration add-form hidden">
            <div class="autorautorization-page__title">Форма Регистрации</div>
            <input id="input-login-for-reg" class="add-form-name" type="text" placeholder="Введите логин" class="autorization-page__input">
            <input id="input-name-for-reg" class="add-form-name" type="text" placeholder="Введите имя" class="autorization-page__input">
            <input id="input-pass-for-reg" class="add-form-name" type="text" placeholder="Введите пароль" class="autorization-page__input">
            <button id="registrationBtn" class="add-form-button">Зарегистрироваться</button>
            <a id="go-To-Registration" class="autorautorization-page__link">Уже есть аккаунт? Войти!</a>
        </div>
    </div>
</div>
    `
    
    linkRow.classList.add('hidden')

    //хренова туча элементов для разных ивентов
    const goToLogin = document.querySelector('#go-To-login')
    const goToRegistration = document.querySelector('#go-To-Registration')
    const loginBox = document.querySelector('.autorization-page__login')
    const registrationBox = document.querySelector('.autorization-page__registration')
    const loginBtn = document.querySelector('#loginBtn')
    const registrationBtn = document.querySelector('#registrationBtn')
    const inputLoginForLogin = document.querySelector('#input-login-for-login')
    const inputPasswordForLogin = document.querySelector('#input-password-for-login')
    const inputLoginForRegistration = document.querySelector('#input-login-for-reg')
    const inputNameForRegistration = document.querySelector('#input-name-for-reg')
    const inputPasswordForRegistration = document.querySelector('#input-pass-for-reg')

    goToLogin.addEventListener('click', () => {
        loginBox.classList.add('hidden')
        registrationBox.classList.remove('hidden')
    })

    goToRegistration.addEventListener('click', () => {
        loginBox.classList.remove('hidden')
        registrationBox.classList.add('hidden')
    })

    //клик на вход
    loginBtn.addEventListener('click', () => {        
        login(inputLoginForLogin.value, inputPasswordForLogin.value)
        .then((responseDate) => {                       
            setToken(responseDate.user.token)
            localStorage.setItem('token', responseDate.user.token)
            localStorage.setItem('name', responseDate.user.name)
            return responseDate.user.name
        })
        .then((response) => {
            console.log(response);
            setIsLogin(true)
            renderApp(isLogin, call)
            nameInput.value = response
        })
        .catch((error) => {
            alert(error.message)
        }) 
    })

    //клик на регистрацию
    registrationBtn.addEventListener('click', () => {
        registration(inputLoginForRegistration.value, inputPasswordForRegistration.value, inputNameForRegistration.value)
        .then((responseDate) => {
            setToken(responseDate.user.token)
            localStorage.setItem('token', responseDate.user.token)
            localStorage.setItem('name', responseDate.user.name)
            return responseDate.user.name
        })
        .then((response) => {
            console.log(response);
            setIsLogin(true)
            renderApp(isLogin, call)
            nameInput.value = response
        })
        .catch((error) => {
            alert(error.message)
        }) 
    })
}