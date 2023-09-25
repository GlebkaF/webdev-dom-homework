let formName = document.querySelector('.add-form-name');
let formText = document.querySelector('.add-form-text');

const getComments = ({ baseUrl }) => {
    return fetch(baseUrl, {
        method: 'GET'
    })
        .then((response) => {
            if (response.status === 500) {
                throw new Error('Сервер недоступен');
            }
            return response.json();
        });
};

const postComment = ({ baseUrl }) => {
    return fetch(baseUrl, {
        method: 'POST',
        body: JSON.stringify({ text: formText.value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'), name: formName.value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;'), forceError: true })
    });
};

export { getComments, postComment };