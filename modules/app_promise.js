export const appPromise = (ARRAY, getApi, render, addcom, api, formString) => {
    const formItem = document.querySelector(".add-form");
    getApi(formItem.innerHTML, api).then((responseData) => {
        ARRAY = responseData.comments;
        formItem.innerHTML = formString;
        render(ARRAY);
        addcom(ARRAY, api);
        // promiseSend();
    });
};
