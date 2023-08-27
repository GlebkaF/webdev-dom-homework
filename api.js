export function getTodos() {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/:yulenka/comments',
        {
          method:'GET'
        })
      .then((response) => {
      return response.json();
    })
}

export function postTodo( {name, text, forceError}) {
    return fetch(
        'https://wedev-api.sky.pro/api/v1/:yulenka/comments',
        {
          method:'POST',
          body: JSON.stringify({
            name: name, 
            text: text,
            forceError: forceError,
          }),
        })
          .then((response) => {
            if (response.status === 500) {
              throw new Error('Сервер сломался');
              // return Promise.reject('Сервер сломался');
             }  if (response.status === 400) {
              throw new Error('Плохой запрос');
              // return Promise.reject('Плохой запрос');
             } 
             else {
              return response.json();
            }
          })
}