export function getTodos(){
    return fetch("https://wedev-api.sky.pro/api/v1/viktor-pirogov/comments", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        });
};

export function postTodo(textElement,nameElement){
 return   fetch("https://wedev-api.sky.pro/api/v1/viktor-pirogov/comments", {
      method: "POST",
      body: JSON.stringify({
        text: textElement.value,  
        name: nameElement.value,
        forceError: true,
      }),
    });
};