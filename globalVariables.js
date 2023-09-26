let baseUrl = 'https://wedev-api.sky.pro/api/v1/evgeniy-zaretskiy8/comments';
let commentsArr = [];

let changeCommentsArr = (newParams) => {
    commentsArr = newParams;
};

export { baseUrl, commentsArr, changeCommentsArr };