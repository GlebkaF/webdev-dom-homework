export const formString = `<input
type="text"
id="add-form-name"
class="add-form-name"
placeholder="Введите ваше имя"
/>
<textarea
type="textarea"
id="add-form-text"
class="add-form-text"
placeholder="Введите ваш коментарий"
rows="4"
wrap="soft"
maxlength="100"


></textarea>
<div class="add-form-row">
<button class="add-form-button">Написать</button>
</div>`;

export const API_LINK =
    "https://wedev-api.sky.pro/api/v1/pavelzяяzaaa/comments";

export const postTodo = (text, name, api) => {
    return fetch(api, {
        method: "POST",
        body: JSON.stringify({
            text: text,
            name: name,
            forceError: true,
        }),
    });
};

export const getTodos = (api) => {
    return fetch(api, {
        method: "GET",
    });
};
