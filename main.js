import { getDateInventor } from "./modules/dateFunction.js";
import { methodApiGet, methodApiPost } from "./modules/fetchApiCode.js";
import { initializator } from "./modules/initialization.js";
import { checkNameInput, checkTextInput } from "./modules/inputAddFormCheck.js";
import { pushCommit } from "./modules/pushFunction.js";
import {
  writeButton,
  deleteButton,
  listCom,
  nameInput,
  commitInput,
  preLoaderText,
} from "./modules/variables.js";

const btn = document.querySelector("#write-button");

let comments = [];

let countTriesConnect = 0;

preLoaderText.textContent = "Загрузка комментариев ...";

const getFetchApi = () => {
  methodApiGet()
    .then((response) => {
      const apiComments = response.comments.map((comment) => {
        return {
          author: { name: comment.author.name },
          date: getDateInventor(comment.date),
          likes: comment.likes,
          isLiked: false,
          text: comment.text,
        };
      });
      comments = apiComments;
      initializator(listCom, comments, commitInput);
    })
    .then(() => {
      preLoaderText.textContent = "";
      preLoaderText.classList.remove("margin");
    });
};

const postFetchApi = () => {
  methodApiPost(nameInput, commitInput)
    .then((response) => {
      preLoaderText.textContent = "";
      preLoaderText.classList.remove("margin");
      btn.classList.remove("empty");
      btn.disabled = false;
      if (response.status === 400) {
        if (nameInput.value.length < 3 || commitInput.value.length < 3) {
          nameInput.value.length < 3
            ? (nameInput.style.backgroundColor = `rgba(255, 186, 186, 0.5)`)
            : (nameInput.style.backgroundColor = `#FFFFFF`);
          commitInput.value.length < 3
            ? (commitInput.style.backgroundColor = `rgba(255, 186, 186, 0.5)`)
            : (commitInput.style.backgroundColor = `#FFFFFF`);
          preLoaderText.textContent = "";
          preLoaderText.classList.remove("margin");
          throw new Error("Длина имени или комментария меньше 3-х символов");
        }
      } else if (response.status === 500) {
        throw new Error("Сервер не отвечает, повторите попытку позже");
      }
    })
    .then(() => {
      return getFetchApi();
    })
    .then(() => {
      nameInput.value = "";
      commitInput.value = "";
      preLoaderText.textContent = "";
      preLoaderText.classList.remove("margin");
      btn.classList.add("empty");
      btn.disabled = true;
    })
    .catch((error) => {
      if (error == "TypeError: Failed to fetch") {
        alert(
          "Кажется потеряно соединение с интернетом, проверьте подключение к сети"
        );
      } else if (
        error == "Error: Сервер не отвечает, повторите попытку позже"
      ) {
        if (countTriesConnect <= 2) {
          countTriesConnect++;
          postFetchApi();
        } else {
          countTriesConnect = 0;
          alert(error);
        }
      } else {
        alert(error);
      }
      btn.classList.remove("empty");
      btn.disabled = false;
      preLoaderText.textContent = "";
      preLoaderText.classList.remove("margin");
    });
};

getFetchApi();

btn.classList.add("empty");
btn.disabled = true;

nameInput.addEventListener("input", () => {
  checkNameInput(nameInput, commitInput, btn);
});

commitInput.addEventListener("input", () => {
  checkTextInput(nameInput, commitInput, btn);
});

writeButton.addEventListener("click", () => {
  pushCommit(preLoaderText, btn);
  postFetchApi();
  initializator(listCom, comments, commitInput);
});

document.addEventListener("keyup", (key) => {
  if (key.code === "Enter") {
    pushCommit(preLoaderText, btn);
    postFetchApi();
    initializator(listCom, comments, commitInput);
  }
});

deleteButton.addEventListener("click", () => {
  comments.pop();
  initializator(listCom, comments, commitInput);
});
