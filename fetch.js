import { renderApp } from "./renderContent.js";
import { getComments } from "./api.js";
import { setUsers } from "./users.js";
import { addEventButton, addLike } from "./renderApp.js";

// renderApp(true);

export const fetchAndRenderComments = () => {
    getComments()
    .then((data) => {
        return setUsers(data.comments);
    })
    .then (() => {
        renderApp()
        addEventButton()
    })
}