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

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/api.js */ \"./modules/api.js\");\n/* harmony import */ var _modules_render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/render.js */ \"./modules/render.js\");\n\r\n\r\n\r\n\r\n    const buttonElement = document.getElementById('add-button');\r\n    const addingAComment = document.getElementById('adding');\r\n    const commentsLoader = document.getElementById('loader');\r\n    const nameElement = document.getElementById('name');\r\n    const commentsElement = document.getElementById('comments');\r\n    const linkButtonElement = document.getElementById('link-button');\r\n    const commentEntrance = document.getElementById('entrance');\r\n    let auth = document.getElementById('auth');\r\n    let registrationElement = document.getElementById('form-registration');\r\n    let registrationButton = document.getElementById('registration-button');\r\n    let entranceElement = document.getElementById('form-entrance');\r\n    let button = document.getElementById('button');\r\n    let exitButton = document.getElementById('exit-button');\r\n    let buttonButton = document.getElementById('button-button');\r\n\r\n\r\n\r\n    \r\n\r\n    let commentList = []\r\n   \r\n    addingAComment.classList.add(\"_hidden\");\r\n\r\n\r\n    console.log(commentsLoader);\r\n    commentsLoader.classList.add(\"_hidden\");\r\n   \r\n    buttonElement.addEventListener(\"click\", () => {\r\n    \r\n      if (commentsElement.value === \"\"){\r\n        alert(\"Пожалуйста введите коментарий!\");\r\n        return;\r\n      };\r\n      addingAComment.classList.add(\"_hidden\");\r\n      commentsLoader.classList.remove(\"_hidden\");\r\n      (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.postComment)();\r\n    });\r\n\r\nlinkButtonElement.addEventListener(\"click\", () =>{\r\n  (0,_modules_render_js__WEBPACK_IMPORTED_MODULE_1__.renderAddingList)();\r\n  registrationElement = document.getElementById('form-registration');\r\n  button = document.getElementById('button');\r\n  exitButton = document.getElementById('exit-button');\r\n  buttonButton = document.getElementById('button-button');\r\n  buttonButton.addEventListener(\"click\", (user) => {\r\n    const loginValue = document.getElementById('login').value;\r\n    const passwordValue = document.getElementById('password').value;\r\n    (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.postLogIn)(loginValue, passwordValue).then((user) => {\r\n      (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.setToken)(`Bearer ${user.user.token}`);\r\n      auth = document.getElementById('auth');\r\n      auth.classList.add(\"_hidden\");\r\n      (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)();\r\n      addingAComment.classList.remove(\"_hidden\");\r\n      (0,_modules_render_js__WEBPACK_IMPORTED_MODULE_1__.renderName)();\r\n    });\r\n  })\r\n\r\n  registrationButton = document.getElementById('registration-button')\r\n  registrationButton.addEventListener(\"click\", () => {\r\n    registrationElement.classList.remove(\"_hidden\");\r\n    entranceElement = document.getElementById('form-entrance');\r\n    entranceElement.classList.add(\"_hidden\");\r\n    buttonButton = document.getElementById('button-button');\r\n    buttonButton.classList.add(\"_hidden\");\r\n    button = document.getElementById('button');\r\n    button.classList.remove(\"_hidden\");\r\n    exitButton = document.getElementById('exit-button');\r\n    exitButton.classList.remove(\"_hidden\");\r\n    registrationButton = document.getElementById('registration-button');\r\n    registrationButton.classList.add(\"_hidden\");\r\n    exitButton = document.getElementById('exit-button');\r\n\r\n    button.addEventListener(\"click\", () => {\r\n      (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.postRegistration)();\r\n      (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)();\r\n      addingAComment.classList.remove(\"_hidden\");\r\n      (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.postComment)();\r\n    });\r\n\r\n    exitButton.addEventListener(\"click\", () => {\r\n      (0,_modules_render_js__WEBPACK_IMPORTED_MODULE_1__.renderAddingList)();\r\n      registrationElement = document.getElementById('form-registration');\r\n      button = document.getElementById('button');\r\n      exitButton = document.getElementById('exit-button');\r\n      registrationButton = document.getElementById('registration-button');\r\n      commentEntrance.classList.add(\"_hidden\");\r\n      registrationElement.classList.add(\"_hidden\");\r\n      button.classList.add(\"_hidden\");\r\n      exitButton.classList.add(\"_hidden\");\r\n    })\r\n  })\r\n  commentEntrance.classList.add(\"_hidden\");\r\n  registrationElement.classList.add(\"_hidden\");\r\n  button.classList.add(\"_hidden\");\r\n  exitButton.classList.add(\"_hidden\");\r\n });\r\n \r\n  (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.getUsers)();\r\n  (0,_modules_api_js__WEBPACK_IMPORTED_MODULE_0__.getComments)();\r\n\r\n  \r\n\r\n    \r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./index.js?");

/***/ }),

/***/ "./modules/api.js":
/*!************************!*\
  !*** ./modules/api.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getComments: () => (/* binding */ getComments),\n/* harmony export */   getToken: () => (/* binding */ getToken),\n/* harmony export */   getUsers: () => (/* binding */ getUsers),\n/* harmony export */   postComment: () => (/* binding */ postComment),\n/* harmony export */   postLogIn: () => (/* binding */ postLogIn),\n/* harmony export */   postRegistration: () => (/* binding */ postRegistration),\n/* harmony export */   setToken: () => (/* binding */ setToken)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/helper.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/render.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/lib/formatDate/formatDate.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n  \r\n\r\n\r\n\r\n  \r\n  \r\n    const addingAComment = document.getElementById('adding');\r\n    const commentsLoader = document.getElementById('loader');\r\n    const nameElement = document.getElementById('name');\r\n    const commentsElement = document.getElementById('comments');\r\n    let token = ''  \r\n\r\n    const getToken = () => token;\r\n    const setToken = (newToken) => {\r\n      token = newToken\r\n      };\r\n\r\n    \r\nconst getComments = () => {\r\n    const fetchPromise = fetch(\" https://wedev-api.sky.pro/api/v2/valeriy-poletaev/comments\",\r\n      {\r\n        method: \"GET\"\r\n      });\r\n\r\n      fetchPromise.then((response) => {\r\n        const jsonPromise = response.json();\r\n\r\n      jsonPromise.then((responseData) => {\r\n         const commentList = responseData.comments.map((comment) => {\r\n          let activeClass = \"\"\r\n          if(comments.isLiked === true){\r\n            activeClass = \"-active-like\"\r\n          };\r\n          return{\r\n            name: comment.author.name,\r\n               date: Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/lib/formatDate/formatDate.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(comment.date),\r\n               text: comment.text,\r\n               likes: comment.likes,\r\n               activeLike: comment.isLiked,\r\n              activeClass: activeClass, \r\n              isEdit: false,\r\n              id: comment.id,\r\n              author: {\r\n                id: comment.author.id,\r\n                login: comment.author.login,\r\n                name: comment.author.name \r\n              }             \r\n          }\r\n        });\r\n        Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/render.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(commentList); \r\n        });\r\n      });\r\n      };\r\n    \r\n\r\n    const postComment = (data) => {\r\n      const fetchPromise = fetch(\" https://wedev-api.sky.pro/api/v2/valeriy-poletaev/comments\",\r\n        {\r\n          method: \"POST\",\r\n          headers:{Authorization: token},\r\n          body: JSON.stringify({\r\n          text: commentsElement.value.replaceAll('<', '&lt').replaceAll('>', '&gt'),\r\n          })\r\n      });\r\n        fetchPromise.then((response) => {\r\n          console.log(response);\r\n          commentsLoader.classList.add(\"_hidden\");\r\n          addingAComment.classList.remove(\"_hidden\");\r\n          if (response.status === 400) {\r\n            alert(\"Комментарий не должны быть меньше трех симвалов\");\r\n            Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/helper.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()\r\n            }\r\n          else if (response.status === 500){\r\n            alert(\"Сервер сломался, Попробуй позже\");\r\n          }\r\n          else{\r\n            commentsElement.value = \"\";\r\n            nameElement.value = \"\";  \r\n            getComments();\r\n          }\r\n        });\r\n      };\r\n\r\n\r\n      const getUsers = () => {\r\n        return fetch(\"https://wedev-api.sky.pro/api/user\",\r\n          {\r\n            method: \"GET\"\r\n          }).then((response) => {\r\n            const jsonPromise = response.json();\r\n            return jsonPromise;\r\n          });\r\n        };\r\n          \r\n\r\n          const postRegistration = (data) => {\r\n            return fetch(\"https://wedev-api.sky.pro/api/user\",\r\n              {\r\n                method: \"POST\",\r\n                body: JSON.stringify({\r\n                login: login.value,\r\n                name: registrationName.value,\r\n                password: password.value\r\n              })\r\n            }).then((response) => {\r\n              if (response.status === 400 ) {\r\n                alert(\"Такой пользователь уже существует\")\r\n              };\r\n              const jsonPromise = response.json();\r\n              console.log(jsonPromise);\r\n              return jsonPromise;\r\n              });\r\n          };\r\n\r\n          const postLogIn = (login, password) => {\r\n            return fetch(\" https://wedev-api.sky.pro/api/user/login\",\r\n              {\r\n                method: \"POST\",\r\n                body: JSON.stringify({\r\n                login: login,\r\n                password: password\r\n              })\r\n            }).then((response) => {\r\n              if (response.status === 400 ) {\r\n                alert(\"Неверный логин или пароль\")\r\n              };\r\n              getUsers();\r\n              const jsonPromise = response.json();\r\n              console.log(jsonPromise);\r\n              return jsonPromise;\r\n              });\r\n            };\r\n          \r\n          \r\n\r\n          \r\n    \r\n        \r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/api.js?");

/***/ }),

/***/ "./modules/render.js":
/*!***************************!*\
  !*** ./modules/render.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   renderAddingList: () => (/* binding */ renderAddingList),\n/* harmony export */   renderCommentList: () => (/* binding */ renderCommentList),\n/* harmony export */   renderName: () => (/* binding */ renderName)\n/* harmony export */ });\nObject(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/helper.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }());\n\r\n\r\n\r\n  const listElement = document.getElementById('list'); \r\n  // const addingAComment = document.getElementById('adding');\r\n\r\n  \r\n\r\nconst renderCommentList = (commentList) => {\r\n    const commentHtml = commentList.map((comment, index) => {\r\n    return `<li class=\"comment data-comment-content=\"${index}\">\r\n              <div class=\"comment-header\">\r\n                <div>${comment.name}</div>\r\n                <div>${comment.date}</div>\r\n              </div>\r\n              <div class=\"comment-body\">\r\n                <div class=\"comment-text\">\r\n                  ${comment.text}\r\n                </div>\r\n              </div>\r\n              <div class=\"comment-footer\">\r\n                <div class=\"likes\">\r\n                  <span class=\"likes-counter\">${comment.likes}</span>\r\n                  <button class=\"like-button ${comment.activeClass}\" data-button-like=\"${index}\"></button>\r\n                </div>\r\n              </div>\r\n            </li>`\r\n      }).join('');\r\n      listElement.innerHTML = commentHtml;\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/helper.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())(commentList);\r\n      Object(function webpackMissingModule() { var e = new Error(\"Cannot find module './modules/helper.js'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();\r\n    };\r\n\r\n    const renderAddingList = () => {\r\n      const authHtml = `\r\n      <div class=\"auth-form\" id=\"auth\">\r\n      <div id=\"form-registration\">\r\n      <h1>Форма регистрации</h1>\r\n      <input\r\n        type=\"text\"\r\n        class=\"add-form-text\"\r\n        id=\"registrationName\"\r\n        placeholder=\"Вверите ваше имя\"\r\n      />\r\n      </div>\r\n      <div id=\"form-entrance\">\r\n      <h1>Форма входа</h1></div>\r\n      <input\r\n        type=\"text\"\r\n        class=\"add-form-text\"\r\n        id=\"login\"\r\n        placeholder=\"Вверите ваш логин\"\r\n      />\r\n      <input\r\n      type=\"password\"\r\n      class=\"add-form-text\"\r\n      id=\"password\"\r\n      placeholder=\"Вверите ваш пароль\"\r\n      />\r\n        <button class=\"auth-form-button\" id=\"button-button\">Войти</button>\r\n        <button class=\"auth-form-button\" id=\"button\">Зарегистрироваться</button>\r\n        <button class=\"registration-form-button\" id=\"registration-button\" href=\"shape\">Зарегистрироваться</button>\r\n        <button class=\"registration-form-button\" id=\"exit-button\" href=\"shape\">Войти</button> \r\n      </div> `;\r\n        listElement.innerHTML = authHtml;\r\n        };\r\n\r\n        const renderName = () => {\r\n            document.getElementById('name').value = \"Пользователь\";\r\n        }\r\n\r\n        \r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://webdev-dom-homework/./modules/render.js?");

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
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;