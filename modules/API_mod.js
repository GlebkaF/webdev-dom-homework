export let token;
export let myName;




export const setToken = (newToken) => {
    token = newToken;
}

export const readingName = (newName) => {
    myName = newName;
}


// export const formString = ;


export const API_LINK = "https://wedev-api.sky.pro/api/v2/pavdeeeee/comments";
export const userUrl = "https://wedev-api.sky.pro/api/user/login";
export const regUrl = "https://wedev-api.sky.pro/api/user";



export const postTodo = (text, name, api) => {
    return fetch(api, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`
        },
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
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};


export const login = (pasinput, paslogin) => {
    return fetch(userUrl, {
        method: "POST",
        body: JSON.stringify({
            login: paslogin,
            password: pasinput
        })
    }).then((response) => {
        return response.json();
    });
};

export const signup = (pasinput, paslogin, pasname) => {
    return fetch(regUrl, {
        method: "POST",
        body: JSON.stringify({
            login: paslogin,
            password: pasinput,
            name: pasname
        })
    }).then((response) => {
        return response.json();
    }).then((response) => {
        setToken(response.user.token)
        readingName(response.user.name)
        return true;
    })
}

export const signin = (log, pas) => {
    const addError = (error) => {
        let errorMessage = `${error}`;
        document.body.style.overflow = "hidden";
        const popup = document.querySelector(".bg-container");

        popup.innerHTML = `<div class="bg-modal"><div class="modal">
                            <div class="modal__header">
                                <button class="close-btn">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                    >
                                        <path
                                            d="M7.69217 6.28141L13.5161 0.45752L15.1797 2.12115L9.3558 7.94504L15.1797 13.7689L13.5161 15.4326L7.69217 9.60867L1.86828 15.4326L0.204651 13.7689L6.02854 7.94504L0.204651 2.12115L1.86828 0.45752L7.69217 6.28141Z"
                                            fill="#4F4F4F"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div class="modal__body">
                                <div class="modal__picture">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="43"
                                        height="43"
                                        viewBox="0 0 43 43"
                                        fill="none"
                                    >
                                        <path
                                            d="M21.8304 39.3109C26.6548 39.3109 31.0225 37.3554 34.1841 34.1938C37.3457 31.0322 39.3013 26.6644 39.3013 21.84C39.3013 17.0156 37.3457 12.6479 34.1841 9.48624C31.0225 6.32464 26.6548 4.36914 21.8304 4.36914C17.006 4.36914 12.6382 6.32464 9.4766 9.48624C6.31499 12.6479 4.3595 17.0156 4.3595 21.84C4.3595 26.6644 6.31499 31.0322 9.4766 34.1938C12.6382 37.3554 17.006 39.3109 21.8304 39.3109Z"
                                            fill="#F5F5F5"
                                            stroke="#4F4F4F"
                                            stroke-width="2.99501"
                                            stroke-linejoin="round"
                                        />
                                        <path
                                            d="M14.842 21.8404L20.0833 27.0816L30.5658 16.5991"
                                            stroke="#4F4F4F"
                                            stroke-width="2.99501"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </div>
                                <div class="modal__wrap-text-content">
                                    <div class="modal__text-title">Уведомление!</div>
                                    <div class="modal__text-main">
                                        ${errorMessage}
                                    </div>
                                </div>
                            </div>
                            <button class="modal__btn-accept">ОК</button>
                        </div></div>`;

        const btnPopup = document.querySelector(".modal__btn-accept");
        const btnClosePop = document.querySelector(".close-btn");
        btnPopup.addEventListener("click", () => {

            popup.innerHTML = ``;
            document.body.style.overflow = "overlay";
        });
        btnClosePop.addEventListener("click", () => {

            popup.innerHTML = ``;
            document.body.style.overflow = "overlay";
        });
    }


    return fetch(userUrl, {
        method: "POST",
        body: JSON.stringify({
            "login": log.value,
            "password": pas.value
        })
    })
        .then((response) => {
            if (response.status !== 201 && response.status !== 200) {
                return new Promise.reject(data.status);
            }
            return response.json()
        })
        .then((data) => {
            const { user } = data;
            console.log(data)
            return [user.token, user.name]
        })
        .then((user) => {

            setToken(user[0])
            readingName(user[1])

            return true;
        })
        .catch((error) => {
            log.classList.add('error')
            pas.classList.add('error')
            addError(error)
            return false;
        })
}

