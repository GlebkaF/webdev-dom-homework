/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./api.js":
/*!****************!*\
  !*** ./api.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   getToken: () => (/* binding */ getToken),\n/* harmony export */   getUserAuth: () => (/* binding */ getUserAuth),\n/* harmony export */   postComment: () => (/* binding */ postComment),\n/* harmony export */   token: () => (/* binding */ token),\n/* harmony export */   userAuth: () => (/* binding */ userAuth),\n/* harmony export */   userName: () => (/* binding */ userName)\n/* harmony export */ });\nconst baseUrl = \"https://wedev-api.sky.pro/api/v2/pavel-fedotov/\";\nconst userUrl = \"https://wedev-api.sky.pro/api/user/login\";\n\nlet token;\nlet userAuth = false;\nlet userName;\n\nconst getToken = (newToken, name) => {\n  token = \"Bearer \" + newToken;\n  userName = name;\n}\n\nconst getUserAuth = (newUserAuth) => {\n  userAuth = newUserAuth;\n}\n\nconsole.log(userName);\n\n\n\nfunction getComments() {\n    return fetch(`${baseUrl}comments`, {\n        method: \"GET\",\n        headers: {\n          Authorization: token,\n        },\n        })\n        .then((result) => {\n          if (result.status === 500) {\n            throw new Error(\"Cервер не отвечает\");\n          } else {\n            return result.json();\n          }\n        })\n}\n\nfunction postComment( {text, name, date, likes, isLiked, forceError} ) {\n\n    return fetch(`${baseUrl}comments`, {\n        method: \"POST\",\n        body: JSON.stringify({\n          text: text,\n          name: name,\n          date: date,\n          likes: likes,\n          isLiked: isLiked,\n          forceError: forceError\n        }),\n        headers: {\n          Authorization: token,\n        },\n      })\n      .then((resultComments) => {\n        if (resultComments.status == 201) {\n          return resultComments.json();\n        } else if (resultComments.status === 400) {\n          throw new Error(\"Имя или комментраий короткие\");\n        } else if (resultComments.status === 500) {\n          throw new Error(\"Сервер не отвечает\");\n        }\n      })\n}\n\nfunction auth( {login, password} ) {\n\n  return fetch(`${userUrl}`, {\n      method: \"POST\",\n      body: JSON.stringify({\n        login,\n        password,\n      }),\n    })\n    .then((resultUser) => {\n      if (resultUser.status == 201) {\n        getUserAuth(true);\n        return resultUser.json();\n      } else if (resultUser.status === 400) {\n        throw new Error(\"Неверные имя или пароль\");\n      } else if (resultUser.status === 500) {\n        throw new Error(\"Сервер не отвечает\");\n      }\n    })\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./api.js?");

/***/ }),

/***/ "./getDate.js":
/*!********************!*\
  !*** ./getDate.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getCurrentDate: () => (/* binding */ getCurrentDate)\n/* harmony export */ });\nfunction getCurrentDate(date) {\n\n    let year = date.getFullYear().toString().slice(-2); // Получаем последние две цифры года\n    let month = (date.getMonth() + 1 < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1); // Получаем месяц с ведущим нулем, если нужно\n    let day = (date.getDate() < 10) ? '0' + date.getDate() : date.getDate(); // Получаем день с ведущим нулем, если нужно\n    let hours = (date.getHours() < 10) ? '0' + date.getHours() : date.getHours(); // Получаем часы с ведущим нулем, если нужно\n    let minutes = (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes(); // Получаем минуты с ведущим нулем, если нужно\n\n    let formattedDate = day + '.' + month + '.' + year; // Склеиваем день, месяц и год в нужном формате\n    let formattedTime = hours + ':' + minutes; // Склеиваем часы и минуты в нужном формате\n\n    let currentDate = formattedDate + ' ' + formattedTime;\n    return currentDate;\n\n    //console.log(formattedDate + ' в ' + formattedTime); // Выводим отформатированную дату и время\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./getDate.js?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   mapData: () => (/* binding */ mapData)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _getDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDate.js */ \"./getDate.js\");\n/* harmony import */ var _renderComments_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./renderComments.js */ \"./renderComments.js\");\n\n\n\n\n\n  // Получаем все необходимые элементы\n\n  const loaderPage = document.querySelector(\".page-loader\");\n  let comments = [];\n\n  const mapData = () => {\n    return (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)().then((resultData) => {\n      loaderPage.style.display = \"block\";\n      const resultComments = resultData.comments.map((comment) => {\n        let currentDate = (0,_getDate_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentDate)(new Date(comment.date));\n        return {\n          author: comment.author.name,\n          date: currentDate,\n          text: comment.text,\n          likeCount: comment.likes,\n          myLike: comment.isLiked\n        };\n      });\n      comments = resultComments;\n      (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)( {comments} );\n    })\n    .then((resultData) => {\n      loaderPage.style.display = \"none\";\n      \n    })\n    .catch((error) => {\n      alert(\"Упс, сервер упал\");\n      loaderPage.style.display = \"none\";\n    });\n  }\n  mapData();    \n\n  //Функция рендера комментариев\n  (0,_renderComments_js__WEBPACK_IMPORTED_MODULE_2__.renderComments)( {comments} );\n\n  \n\n \n\n//# sourceURL=webpack://webdev-dom-homework/./main.js?");

/***/ }),

/***/ "./renderComments.js":
/*!***************************!*\
  !*** ./renderComments.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderComments: () => (/* binding */ renderComments)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n/* harmony import */ var _getDate_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDate.js */ \"./getDate.js\");\n/* harmony import */ var _main_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main.js */ \"./main.js\");\n/* harmony import */ var _renderLogin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./renderLogin.js */ \"./renderLogin.js\");\n\n\n\n\n\nconst renderComments = ( {comments} ) => {\n\n  let isLoaded;\n\n  const CommentsHtml = comments.map((comment, index) => {\n  let isLike;\n  let inputTextHtml;\n  let textButtonEditSave;\n  let classButtonEditSave;\n  //isLoadedPage = true;\n  comment.myLike ? isLike = \"-active-like\" : false\n\n  comment.isEdit ? textButtonEditSave = \"Сохранить\" : textButtonEditSave = \"Редактировать\"\n  comment.isEdit ? classButtonEditSave = \"comment-text-save\" : classButtonEditSave = \"comment-text-edit\"\n  comment.isEdit ? inputTextHtml = `<textarea id=\"form-text\" type=\"textarea\" class=\"add-form-text\" placeholder=\"Введите ваш коментарй\" rows=\"4\">${comment.text}</textarea>` : inputTextHtml = `<div data-index=\"${index}\" class=\"comment-text\">${comment.text}</div>`;\n\n\n    return `<li class=\"comment\">\n            <div class=\"comment-header\">\n              <div>${comment.author}</div>\n              <div>${comment.date}</div>\n            </div>\n            <div class=\"comment-body\">\n              ${inputTextHtml}\n            </div>\n            <button data-edit=\"${index}\" class=\"${classButtonEditSave}\">${textButtonEditSave}</button>\n            <div class=\"comment-footer\">\n              <div class=\"likes\">\n                <span class=\"likes-counter\">${comment.likeCount}</span>\n                <button class=\"like-button ${isLike}\" id=\"like-button\" data-islike=\"${index}\"></button>\n              </div>\n            </div>\n          </li>`;\n\n\n\n}).join(\"\");\n\nconst container = document.getElementById('app');\nconst authComment = document.getElementById(\"auth-comment\");\nlet blockAuthDisplay;\nlet blockAddCommentDisplay;\n\n\nconsole.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.userAuth);\nconst appHtml = `\n<div class=\"container\">\n      <ul class=\"comments\" id=\"comment-list\">\n        ${CommentsHtml}\n      </ul>\n      <span class=\"comment-loader\">Пожайлуйста подождите, комментарий добавляется</span>\n</div>\n`;\n\ncontainer.innerHTML = appHtml;\n\n\nif (_api_js__WEBPACK_IMPORTED_MODULE_0__.userAuth) {\n  blockAuthDisplay = \"none\";\n  blockAddCommentDisplay = \"block\";\n\n} else {\n  blockAuthDisplay = \"block\";\n  blockAddCommentDisplay = \"none\";\n}\n\nconst blcAuthComment = `\n<div id=\"block-auth\" class=\"mrgn-tp-20 mrgn-btm-20\" style=\"display: ${blockAuthDisplay}\">\n      <span>Добавлять комментарии могут только авторизованные пользователи</span>\n      <br>\n      <button class=\"add-form-button\" id=\"to-auth-button\">Авторизоваться</button>\n    </div>\n    <div class=\"add-form mrgn-tp-20 mrgn-btm-20\" id=\"forma\" style=\"display: ${blockAddCommentDisplay}\">\n      <input\n        type=\"text\"\n        id=\"form-name\"\n        class=\"add-form-name\"\n        placeholder=\"Введите ваше имя\"\n        value=\"${_api_js__WEBPACK_IMPORTED_MODULE_0__.userName}\"\n        readonly\n      />\n      <textarea\n        id=\"form-text\"\n        type=\"textarea\"\n        class=\"add-form-text\"\n        placeholder=\"Введите ваш коментарий\"\n        rows=\"4\"\n      ></textarea>\n      <div class=\"add-form-row\">\n        <button class=\"add-form-button\" id=\"add-form-button\">Написать</button>\n      </div>\n      <div class=\"add-form-row\">\n        <!--<button class=\"delete-form-button\" id=\"delete-form-button\">Удалить последний коммент</button>-->\n      </div>\n    </div>\n`\n\nauthComment.innerHTML = blcAuthComment;\n\n\n\n// Запрет на действие по умолчанию для textArea - gthеход на новую строку. Иначе функция addComment будет выполняться, \n  // если заполнено поле с именеи и в поле комментария есть переход на новую строку\n\n  const textArea = document.getElementById('form-text').addEventListener('keydown', (event) => {\n    if (event.key === 'Enter') {\n      event.preventDefault(); \n    }\n  })\n\n  const commentList = document.getElementById('comment-list');\n  const buttonAddComment = document.getElementById('add-form-button');\n  const inputName = document.getElementById('form-name');\n  const inputText = document.getElementById('form-text');\n  const loaderAddComment = document.querySelector(\".comment-loader\");\n  const loaderPage = document.querySelector(\".page-loader\");\n\n  const formaComment = document.getElementById('forma');\n\n  // Функция ответа на комментарий\n\n  function initAnswerComment2() {\n    const commentTexts = document.querySelectorAll(\".comment-text\");\n\n    commentTexts.forEach((commentText, index) => {\n      commentText.addEventListener(\"click\", () => {\n        inputText.value = '> ' + comments[index].text + '\\n' + comments[index].author + ', ';\n      })\n    })\n  }\n\n  // Функция разблокировки кнопки \"Написать\", если поле с именем не пустое\n\n  inputName.addEventListener('input', () => {\n    buttonAddComment.disabled = false;\n  })\n\n  // Функция разблокировки кнопки \"Написать\", если поле с текстом комментария не пустое\n\n  inputText.addEventListener('input', () => {\n    buttonAddComment.disabled = false;\n  })\n\n  // Функция добавления лайка\n\n  const ititAddLikeListener = () => {\n    const likeButtons = document.querySelectorAll(\".like-button\");\n\n    for (const likeButton of likeButtons) {\n      likeButton.addEventListener('click', () => {\n        let index = likeButton.dataset.islike;\n\n        if (comments[index].myLike) {\n          comments[index].myLike = false;\n          comments[index].likeCount--;\n        } else {\n          comments[index].myLike = true;\n          comments[index].likeCount++;\n        }\n\n        renderComments( {comments} );\n        loaderPage.style.display = \"none\";\n      })\n    }\n  }\n\n  // Функция изменения комментария - вызов по кнопке \"Редактировать\"\n\n  const initEditCommentListener = () => {\n    const editButtons = document.querySelectorAll(\".comment-text-edit\");\n\n    for (const editButton of editButtons) {\n      editButton.addEventListener('click', () => {\n        let index = editButton.dataset.edit;\n\n        comments[index].isEdit = true;\n        renderComments( {comments} );\n      })\n    }\n  }\n\n  // Функция сохранения изменений в комментарии - вызов по кнопке \"Сохранить\"\n\n  const initSaveEditCommentListener = () => {\n    const saveButtons = document.querySelectorAll(\".comment-text-save\");\n\n    for (const saveButton of saveButtons) {\n      saveButton.addEventListener('click', () => {\n        let index = saveButton.dataset.edit;\n        const inputText = document.getElementById('form-text');\n\n        comments[index].text = inputText.value;\n        comments[index].isEdit = false;\n\n        renderComments( {comments} );\n      })\n    }\n  }\n\ninitAnswerComment2()\nititAddLikeListener()\ninitEditCommentListener()\ninitSaveEditCommentListener()\n\nconst postTask = () => {\n  let currentDate = (0,_getDate_js__WEBPACK_IMPORTED_MODULE_1__.getCurrentDate)(new Date());\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.postComment)( {\n          text: inputText.value,\n          name: inputName.value,\n          date: currentDate,\n          likes: 0,\n          isLiked: false,\n          forceError: true\n      } ).then((resultCommentsData) => {\n      return (0,_main_js__WEBPACK_IMPORTED_MODULE_2__.mapData)();\n      })\n      .then((resultData) => {\n        buttonAddComment.disabled = false;\n        loaderAddComment.style.display = \"none\";\n        inputName.value = '';\n        inputText.value = '';\n      })\n      .catch((error) => {\n        console.warn(error);\n        loaderAddComment.style.display = \"none\";\n        if (error.message === \"Имя или комментраий короткие\") {\n          alert(\"Имя и комментарий должны быть не короче 3х символов\");\n          inputName.classList.add('error-form');\n          inputText.classList.add('error-form');\n        } else if (error.message === \"Сервер не отвечает\") {\n          //alert (\"Сервер сломался, попробуй позже\");\n          //buttonAddComment.disabled = false;\n          postTask();\n        } else {\n          alert(\"Кажется, у вас сломался интернет, попробуйте позже\");\n          buttonAddComment.disabled = false;\n        }\n      });\n    }\n\n// Функция отправки комментария\n\nfunction addComment(event) {\n\n  if (event.type === 'click' || (event.type === 'keyup' && event.key === 'Enter'))  {\n\n    if (inputName.value === '' && inputText.value !== '') {\n      inputName.classList.add('error-form');\n      inputText.classList.remove('error-form');\n      buttonAddComment.disabled = true;\n      return;} \n\n    else if (inputText.value === '' && inputName.value !== '') {\n      inputText.classList.add('error-form');\n      inputName.classList.remove('error-form');\n      buttonAddComment.disabled = true;\n      return;} \n\n    else if (inputName.value === '' && inputText.value === '') {\n      inputName.classList.add('error-form');\n      inputText.classList.add('error-form');\n      buttonAddComment.disabled = true;\n      return;\n    }\n\n    loaderAddComment.style.display = \"block\";\n    inputName.classList.remove('error-form');\n    inputText.classList.remove('error-form');\n    buttonAddComment.disabled = true;\n\n    postTask();\n  }\n}\n\nconst toPageAuth = document.querySelector(\".add-form-button\");\n\ntoPageAuth.addEventListener(\"click\", () => {\n  (0,_renderLogin_js__WEBPACK_IMPORTED_MODULE_3__.renderLogin)( {mapData: _main_js__WEBPACK_IMPORTED_MODULE_2__.mapData} )\n})\n\nbuttonAddComment.addEventListener('click', addComment);\nformaComment.addEventListener('keyup', addComment);\n\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./renderComments.js?");

/***/ }),

/***/ "./renderLogin.js":
/*!************************!*\
  !*** ./renderLogin.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderLogin: () => (/* binding */ renderLogin)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./api.js\");\n\n\n\nconst renderLogin = ( {mapData} ) => {\n    const container = document.getElementById('app');\n    const authComment = document.getElementById(\"auth-comment\");\n    const loginHtml = `\n    <div class=\"container\">\n      <div class=\"login-form mrgn-btm-20\" id=\"forma\">\n        <input\n          type=\"text\"\n          id=\"form-login\"\n          class=\"add-form-name mrgn-btm-20\"\n          placeholder=\"Введите логин\"\n        />\n        <input\n          type=\"password\"\n          id=\"form-password\"\n          class=\"add-form-name\"\n          placeholder=\"Введите пароль\"\n        />\n        <div class=\"add-form-row\">\n          <button class=\"add-form-button width-100\" id=\"login-form-button\">Войти</button>\n        </div>\n        <div class=\"add-form-row\">\n          <!--<button class=\"delete-form-button\" id=\"delete-form-button\">Удалить последний коммент</button>-->\n        </div>\n      </div>\n      <!--<a href=\"\" style=\"color: white;\">Зарегистрироваться</a>-->\n    </div>\n    `;\n\n    container.innerHTML = loginHtml;\n    authComment.innerHTML = '';\n\n    const buttonElement = document.getElementById('login-form-button');\n    const loginInput = document.getElementById('form-login');\n    const passInput = document.getElementById('form-password');\n\n    buttonElement.addEventListener('click', () => {\n      (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.auth)({\n            login: loginInput.value,\n            password: passInput.value\n        }).then((responseData) => {\n            console.log(responseData);\n            (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.getToken)(responseData.user.token, responseData.user.name);\n            //setUserName(responseData.user.name);\n            console.log(_api_js__WEBPACK_IMPORTED_MODULE_0__.token);\n            //console.log(userName);\n        }).then(() => {\n            mapData();\n        }).catch((error) => {\n          if (error.message === \"Неверные имя или пароль\") {\n            alert(\"Такого пользователя не существет :(\")\n          }\n        }); \n    })\n}\n\n//# sourceURL=webpack://webdev-dom-homework/./renderLogin.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./main.js");
/******/ 	
/******/ })()
;