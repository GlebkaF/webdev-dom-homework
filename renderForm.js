
import { addPost, autoInfo } from "./main.js";
import { renderLogin } from "./renderLogin.js";

export const renderForm = () => {
    const footer = document.querySelector(".footer");
    console.log(autoInfo)

    footer.innerHTML = ` <div class="add-form" id="form-add" >
    <input id="inputName" type="text" class="add-form-name" value="${autoInfo.user.name}" disabled placeholder="Введите ваше имя" />
    <textarea id="inputText" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
    rows="4"></textarea>
    <div class="add-form-row">
    <button id="buttonPush" class="add-form-button">Написать</button>
    </div>
</div >`
    addPost();

}

export const renderFormButton = () => {

    const footer = document.querySelector(".footer");
    footer.innerHTML = `<p class="form">Что бы добавить комментарий, пройдите авторизацию <button class="footer__button">Авторизация</button></p>`
    const buttonFooter = document.querySelector(".footer__button");
    buttonFooter.addEventListener("click", () => {
        console.log("Вы нажали на копнку авторизации")
        renderLogin();

        footer.innerHTML = " ";
    })

}

