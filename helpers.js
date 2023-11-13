export const saveUserInLocalStorage = (user) => {

    localStorage.setItem("user", JSON.stringify(user))
}