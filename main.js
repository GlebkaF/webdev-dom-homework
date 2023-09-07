import { getDateInventor } from "./modules/dateFunction.js";
import {
  fetchForRegPost,
  fetchForAuthPost,
  methodApiGet,
  methodApiPost,
} from "./modules/fetchApiCode.js";
import { getToken, token } from "./modules/variables.js";
import { initializator } from "./modules/initialization.js";

let comments = [];
let lastCommentId;

const preLoaderText = document.getElementById("pre-loader");
preLoaderText.textContent = "Загрузка комментариев ...";

export const getFetchApi = () => {
  const preLoaderText = document.getElementById("pre-loader");
  const listCom = document.getElementById("list-com");
  const commitInput = document.getElementById("commit-input");
  if (preLoaderText !== null) {
    methodApiGet()
      .then((response) => {
        const apiComments = response.comments.map((comment) => {
          return {
            token: token,
            id: comment.id,
            author: { name: comment.author.name },
            date: getDateInventor(comment.date),
            isLiked: comment.isLiked,
            likes: comment.likes,
            text: comment.text,
          };
        });
        lastCommentId = apiComments[apiComments.length - 1].id;
        comments = apiComments;
        initializator(listCom, comments, commitInput);
      })
      .then(() => {
        preLoaderText.textContent = "";
        preLoaderText.classList.remove("margin");
      });
  }
};

getFetchApi();

const container = document.getElementById("container");
const letLogin = document.getElementById("preview-login");

const logining = () => {
  letLogin.addEventListener("click", () => {
    container.innerHTML = `<div class="auth-form">
    <h1>вход</h1>
    <input type="text" class="auth-input" id="authLog" placeholder="Введите логин">
    <input type="text" class="auth-input" id="authPswrd" placeholder="Введите пароль">
    <button class="auth-button" id="toAuth">войти</button>
    <a class="registr-text" id="regText">зарегистрироваться</a>
  </div>`;
    let userName;

    const authorization = () => {
      const authButton = document.getElementById("toAuth");
      const authLogin = document.getElementById("authLog");
      const authPassword = document.getElementById("authPswrd");
      authButton.addEventListener("click", () => {
        fetchForAuthPost({
          login: authLogin.value,
          password: authPassword.value,
        })
          .then((response) => {
            if (response.status == 400) {
              throw new Error(
                "Неверное имя пользователя или пароль, попробуйте ещё раз!"
              );
            }
            return response.json();
          })
          .catch((error) => {
            if (String(error) === "Error: Неверное имя пользователя или пароль, попробуйте ещё раз!") {
              alert(error);
            } else {
              console.log(String(error));
              alert("кажется нет соединения с интернетом");
            }
          })
          .then((response) => {
            return response;
          })
          .then((response) => {
            getToken(response.user.token);
            userName = response.user.name;
            return response;
          })
          .then(() => {
            container.innerHTML = `      <ul id="list-com" class="comments"></ul>
          <div id="pre-loader" class=""></div>
          <div class="add-form" id="scroll">
            <input
              id="name-input"
              type="text"
              class="add-form-name"
              placeholder="Введите ваше имя" readonly="readonly"/>
            <textarea
              id="commit-input"
              type="textarea"
              class="add-form-text"
              placeholder="Введите ваш коментарий"
              rows="6"></textarea>
            <div class="button-container">
              <div class="rem-form-row">
                <button id="delete-button" class="rem-form-button">
                  Удалить последний комментарий
                </button>
              </div>
              <div class="add-form-row">
                <button id="write-button" class="add-form-button">Написать</button>
              </div>
            </div>
          </div>`;
          })
          .then(() => {
            preLoaderText.textContent = "Загрузка комментариев ...";
            getFetchApi();
          })
          .then(() => {
            const listCom = document.getElementById("list-com");
            const writeButton = document.getElementById("write-button");
            const nameInput = document.getElementById("name-input");
            const commitInput = document.getElementById("commit-input");
            nameInput.value = `${userName}`;
            nameInput.style.backgroundColor = `#7cfc98`;
            commitInput
              .addEventListener("input", () => {
                let textCommit = commitInput.value;
                return textCommit;
              })
            writeButton.addEventListener("click", () => {
              methodApiPost(commitInput, token)
                .then((response) => {
                  if (response.status == 400) {
                    commitInput.style.backgroundColor = `rgba(255, 186, 186, 0.5)`;
                    commitInput.addEventListener("input", () => {
                      if (commitInput.value.length > 2) {
                        commitInput.style.backgroundColor = `#ffffff`;
                      } else {
                        commitInput.style.backgroundColor = `rgba(255, 186, 186, 0.5)`;
                      }
                    })
                    throw new Error(
                      "В комментарии меньше 3х символов, допишите комментарий, чтобы отправить его..."
                    );
                  }
                  return response.json();
                })
                .then((response) => {
                  return response;
                })
                .then(() => {
                  getFetchApi();
                  initializator(listCom, comments, commitInput);
                  commitInput.value = "";
                })
                .catch((error) => {
                  if (String(error) === "Error: В комментарии меньше 3х символов, допишите комментарий, чтобы отправить его...") {
                    alert(error);
                  } else {
                    alert("Кажется нет интернета, проверьте соединение!");
                  }
                });
            });
            const deleteButton = document.getElementById("delete-button");
            deleteButton.addEventListener("click", () => {
              fetch(
                `https://wedev-api.sky.pro/api/v2/levchenko3/comments/${lastCommentId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
                .then((response) => {
                  console.log(response.status);
                  getFetchApi();
                  initializator(listCom, comments, commitInput);
                })
                .catch(() => {
                  alert("Кажется нет интернета, проверьте соединение!");
                });
            });
          });
      });
    };
    authorization();

    const resetFunction = () => {
      const clickToReg = document.getElementById("regText");
      clickToReg.addEventListener("click", () => {
        container.innerHTML = `<div class="reg-form">
        <h1>регистрация</h1>
        <input type="text" class="reg-input" id="regName" placeholder="Введите имя" />
        <input type="text" class="reg-input" id="regLogin" placeholder="Введите логин" />
        <input type="text" class="reg-input" id="regPassword" placeholder="Введите пароль" />
        <button class="reg-button" id="toReg">зарегистрироваться</button>
        <a class="auth-text" id="authText">войти</a>
      </div>`;
        const clickToAuth = document.getElementById("authText");
        const regInputName = document.getElementById("regName");
        const regInputLogin = document.getElementById("regLogin");
        const regInputPassword = document.getElementById("regPassword");
        const regButton = document.getElementById("toReg");

        regButton.disabled = true;

        regInputName.addEventListener("input", () => {
          if (
            regInputPassword.value.length <= 0 ||
            regInputLogin.value.length <= 2 ||
            regInputName.value.length <= 2
          ) {
            regButton.disabled = true;
          } else {
            regButton.disabled = false;
          }
        });

        regInputLogin.addEventListener("input", () => {
          if (
            regInputPassword.value.length <= 0 ||
            regInputLogin.value.length <= 2 ||
            regInputName.value.length <= 2
          ) {
            regButton.disabled = true;
          } else {
            regButton.disabled = false;
          }
        });

        regInputPassword.addEventListener("input", () => {
          if (
            regInputPassword.value.length <= 0 ||
            regInputLogin.value.length <= 2 ||
            regInputName.value.length <= 2
          ) {
            regButton.disabled = true;
          } else {
            regButton.disabled = false;
          }
        });


        regButton.addEventListener("click", () => {
          fetchForRegPost({
            login: regInputLogin.value,
            name: regInputName.value,
            password: regInputPassword.value,
          })
            .then((response) => {
              if (response.status == 400) {
                throw new Error(
                  "Пользователь с таким логином уже существует, выберите другой логин"
                );
              }
              return response.json();
            })
            .then((response) => {
              console.log(response);
              container.innerHTML = `<div class="auth-form">
              <h1>вход</h1>
              <input type="text" class="auth-input" id="authLog" placeholder="Введите логин">
              <input type="text" class="auth-input" id="authPswrd" placeholder="Введите пароль">
              <button class="auth-button" id="toAuth">войти</button>
            </div>`;
            })
            .then(() => {
              authorization();
              getFetchApi();
            })
            .catch((error) => {
              alert(error);
            });
        });

        clickToAuth.addEventListener("click", () => {
          container.innerHTML = `<div class="auth-form">
          <h1>вход</h1>
          <input type="text" class="auth-input" id="authLog" placeholder="Введите логин">
          <input type="text" class="auth-input" id="authPswrd" placeholder="Введите пароль">
          <button class="auth-button" id="toAuth">войти</button>
          <a class="registr-text" id="regText">зарегистрироваться</a>
        </div>`;
          authorization();
          resetFunction();
        });
      });
    };
    resetFunction();
  });
};

logining();
