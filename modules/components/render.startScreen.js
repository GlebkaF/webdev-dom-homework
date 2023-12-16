import { reloadComments } from "../commentsState.js";
import { navigateTo } from "../renderEngine.js";
import { delay } from "../utils/utils.promise.js";

const postRender = () => {    
    delay(700)
    .then(() => reloadComments())
    .then(() => navigateTo('main'));
};

export const renderStartScreen = (afterRender) => {
    afterRender.then(postRender);

    return `<div class="container">
        <div class="start-screen-message">
            Сообщения загружаются...
        </div>
    </div>`;
};