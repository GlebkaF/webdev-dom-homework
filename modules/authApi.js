const url = "https://wedev-api.sky.pro/api/user/login";
const urlUser = 'https://wedev-api.sky.pro/api/user';

export const login = (user, password) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      "login": user,
      "password": password,
      forceError: true,
    })
  }).then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер упал');
    }
    if (response.status === 401) {
      throw new Error('Сервер упал');
    }
    if (response.status === 400) {
      throw new Error('Bad Request');
    }
    return response.json();
  });
}

export const register = (user, name, password) => {
  return fetch(urlUser, {
    method: 'POST',
    body: JSON.stringify({
      "login": user,
      "name": name,
      "password": password,
      forceError: true,
    })
  }).then((response) => {
    if (response.status === 500) {
      throw new Error('Сервер упал');
    }
    if (response.status === 401) {
      throw new Error('Сервер упал');
    }
    if (response.status === 400) {
      throw new Error('Bad Request');
    }
    return response.json();
  });
}
