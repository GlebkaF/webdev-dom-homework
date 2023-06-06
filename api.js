const host = "https://wedev-api.sky.pro/api/v2/olesia-koneva/comments";
const loginHost = "https://wedev-api.sky.pro/api/user/login";

export function loadComments() {
  return fetch(`${host}`, {
    method: "GET"
  })
  .then((response) => {
    return response.json();
  })
}

export function postComment(text, token) {
  return fetch(host, {
    method: "POST",
    body: JSON.stringify({
      text,
    }),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 500) {
      postComment(text, token);
    }
    else if (response.status !== 201) {
      throw new Error("Имя и комментарий должны быть не короче 3 символов");
    }
  })
}

export function fetchLogin(login, password) {
  return fetch(loginHost, {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 500) {
      fetchLogin(login, password);
    }
    else if (response.status !==201) {
      throw new Error("Неверный логин или пароль");
    }

    return response.json();
  });
}

export function toggleLike(commentID, token) {
  return fetch(`${host}/${commentID}/toggle-like`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 500) {
      toggleLike(commentID, token);
    }
    else if (response.status !== 200) {
      throw new Error("Произошла ошибка во время обновления лайка");
    }
  })
}

export function deleteComment(commentID, token) {
  return fetch(`${host}/${commentID}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.status === 500) {
      deleteComment(commentID, token);
    }
    else if (response.status !== 200) {
      throw new Error("Произошла ошибка во время удаления комментария");
    }
  })
}