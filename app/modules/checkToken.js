import { setIsLogin, nameInput } from "../app.js";
import { setToken } from "./api.js";

//Функция проверки токена на наличие(+ соответсвущие изменения)
export const checkToken = (call) => {
    nameInput.value = localStorage.getItem('name')
    nameInput.setAttribute("readonly", "readonly")
    if (localStorage.getItem('token') === null) {        
        setIsLogin(false)
        call()
    } else {
        setToken(localStorage.getItem('token'))
        setIsLogin(true)
        call()
    }
}