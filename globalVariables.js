let baseUrl = 'https://wedev-api.sky.pro/api/v2/';
let userUrl = 'https://wedev-api.sky.pro/api/user';
let commentsArr = [];
let token;
let login = "default";
let userName;

let changeCommentsArr = (newParams) => {
    commentsArr = newParams;
};

let changeToken = (newToken) => {
    token = newToken;
};

let changeLogin = (newLogin) => {
    login = newLogin;
};

let changeUserName = (newUserName) => {
    userName = newUserName;
};

export { baseUrl, commentsArr, changeCommentsArr, userUrl, token, changeToken, login, changeLogin, changeUserName, userName };