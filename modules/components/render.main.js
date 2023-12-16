import { signOut, user } from "../api.js";
import { reloadComments } from "../commentsState.js";
import { renderCommentList } from "./render.commentList.js";
import { renderForm } from "./render.form.js"
import { navigateTo, render } from "../renderEngine.js";


const initHandlers = () => {
    const linksToLogin = document.querySelectorAll('.link-sing-in');
    for(const link of linksToLogin){
        link.addEventListener('click', event => {
            event.preventDefault();
            navigateTo('login');
        });
    }

    const linksToSignout = document.querySelectorAll('.link-sing-out');
    for(const link of linksToSignout){
        link.addEventListener('click', event => {
            event.preventDefault();
            
            signOut();

            reloadComments()
            .then(render);            
        });
    }
}

export const renderMain = (afterRender) => {
    afterRender.then(initHandlers);

    const renderInOutLink = () => {
        return `<div class="notification-block">
            ${user 
                ? '<a href="" class="link link-sing-out">Выйти</a>'
                : '<a href="" class="link link-sing-in">Войти</a>'
            }
        </div>`
    };

    const renderLinkToLogin = () => {
        return `<div class="notification-block">
            Чтобы добавить комментарий, <a href="" class="link link-sing-in">авторизуйтесь</a>
        </div>`;
    };

    const result = 
    `<div class="container">
        ${renderInOutLink()}
        ${renderCommentList(afterRender)}
        ${user 
            ? renderForm(afterRender) 
            : renderLinkToLogin()}        
    </div>`;
    
    return result;
}