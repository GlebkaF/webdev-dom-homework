'use strict';

import { comments } from "./api.js";
import { getListComments } from "./listComments.js";
import { renderApp } from "./renderComments.js";
import { getComments, postComments } from "./api.js";

let token = 'Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k4g37k3bk3cg3c03ck4k';
token = null;



const commentsListElement = document.getElementById('commentsList');


commentsListElement.textContent = 'Загружаю комментарии... еще чуть-чуть';


getComments({token})
    .then(() => {
        return renderApp(commentsListElement, getListComments, token);
    });

