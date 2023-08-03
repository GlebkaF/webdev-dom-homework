export function saveUserInLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserInLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserInLocalStorage(user) {
  window.localStorage.removeItem("user");
}
