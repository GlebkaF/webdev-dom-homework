let token
const host = ' https://wedev-api.sky.pro/api/v2/ruslan-shevelev/comments'
function getAPI(callback) {
    return fetch(host, {
        method: "GET"
    })
        .then((response) => {
            return response.json();
        })
        .then((responseData) => {
            return responseData.comments.map((item) => callback(item))
        });

};

function postApi(body, callback) {
    fetch(host, {
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((response) => {
            callback(response);
        });
};

export { getAPI, postApi };

export function registerUser({ login, password, name }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
        name,
      }),
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Такой пользователь уже существует");
      }
      return response.json();
    });
  };
  
  export function loginUser({ login, password }) {
    return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
      method: "POST",
      body: JSON.stringify({
        login,
        password,
      }),
    }).then((response) => {
      if (response.status === 400) {
        throw new Error("Неверный логин или пароль");
      }
      return response.json();
    });
  }
