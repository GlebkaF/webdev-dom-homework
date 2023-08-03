export const addComment = (ARRAY, API_LINK, appPromise) => {
    const inputName = document.getElementById("add-form-name");
    const inputText = document.getElementById("add-form-text");
    const buttonSend = document.querySelector(".add-form-button");
    const formItem = document.querySelector(".add-form");
    //dasd
    buttonSend.addEventListener("click", (event) => {
        inputName.classList.remove("error");
        inputText.classList.remove("error");
        if (inputName.value.length === 0 && inputText.value.length === 0) {
            inputName.classList.add("error");
            return;
        }
        if (inputName.value.length === 0) {
            inputName.classList.add("error");
            return;
        }
        if (inputText.value.length === 0 && inputText.value.length === 0) {
            inputText.classList.add("error");
            return;
        }
        event.stopPropagation();

        return fetch(API_LINK, {
            method: "POST",
            body: JSON.stringify({
                text: inputText.value,
                name: inputName.value,
                forceError: true,
            }),
        })
            .then((response) => {
                if (response.status === 400) {
                    let inputSaveName = inputName.value;
                    let inputSaveText = inputText.value;
                    formItem.innerHTML = `<input
                      type="text"
                      id="add-form-name"
                      class="add-form-name"
                      placeholder="Введите ваше имя"
                      value="${inputSaveName}"
                      />
                      <textarea
                      type="textarea"
                      id="add-form-text"
                      class="add-form-text"
                      placeholder="Введите ваш коментарий"
                      rows="4"
                      wrap="soft"
                      maxlength="100"
                      
                      >${inputSaveText}</textarea>
                      <div class="add-form-row">
                      <button class="add-form-button">Написать</button>
                      </div>`;
                    addComment(ARRAY, API_LINK, appPromise);
                    throw new Error("Имя или текст короче 3х символов");
                }
                if (response.status === 500) {
                    let inputSaveName = inputName.value;
                    let inputSaveText = inputText.value;
                    formItem.innerHTML = `<input
                      type="text"
                      id="add-form-name"
                      class="add-form-name"
                      placeholder="Введите ваше имя"
                      value="${inputSaveName}"
                      />
                      <textarea
                      type="textarea"
                      id="add-form-text"
                      class="add-form-text"
                      placeholder="Введите ваш коментарий"
                      rows="4"
                      wrap="soft"
                      maxlength="100"
                      
                      >${inputSaveText}</textarea>
                      <div class="add-form-row">
                      <button class="add-form-button">Написать</button>
                      </div>`;
                    addComment(ARRAY, API_LINK, appPromise);
                    throw new Error("Сервер не отвечает, попробуйте еще раз.");
                }
                console.log(appPromise(ARRAY));
                formItem.innerHTML = `Загрузка`;
                appPromise(ARRAY);

                return response;
            })
            .then((responseData) => {
                return fetch(API_LINK, {
                    method: "GET",
                });
            })
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                ARRAY = responseData.comments;
                formItem.innerHTML = formString;
                renderPeople(ARRAY);
                addComment(ARRAY, API_LINK);
                inputName.value = "";
                inputText.value = "";
            })
            .catch((error) => {
                alert(error);
                //todo: Отправлять в систему сбора ошибка
            });

        // appPromise();
        // renderPeople();
    });
};
