
function getAPI(callback) {
    return fetch("https://webdev-hw-api.vercel.app/api/v1/ruslan-shevelev/comments", {
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
    fetch("https://webdev-hw-api.vercel.app/api/v1/ruslan-shevelev/comments", {
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((response) => {
            callback(response);
        });
};

export { getAPI, postApi };
