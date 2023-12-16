import { renderLogin } from "./components/render.login.js";
import { renderMain } from "./components/render.main.js";
import { renderRegister } from "./components/render.register.js";
import { renderStartScreen } from "./components/render.startScreen.js";

const renderEngine = (root, content) => {
    let afterPromiseResolve;
    const afterRender = new Promise((resolve) => afterPromiseResolve = resolve);

    root.innerHTML = content(afterRender);

    afterPromiseResolve();    
};


export let activePage;
export const navigateTo = (value) => {
    activePage = value;
    render();
};

const navigationData = {
    startScreen: renderStartScreen,
    main: renderMain,
    login: renderLogin,
    register: renderRegister
};

export const render = () => {
    renderEngine(document.body, navigationData[activePage]);
};
