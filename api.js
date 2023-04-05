
export const host = "https://webdev-hw-api.vercel.app/api/v2/Kerimov-Evgeny/comments"

export let token ="Bearer asb4c4boc86gasb4c4boc86g37w3cc3bo3b83k37k3bk3cg3c03ck"

//Ренедер юзеров с сервера
export function getCommentList() {
   return fetch(host,  {
        method: "GET",
        headers: {
            Authorization: token,
        },
      })
        .then((response) => {
            // console.log(response)
           if (response.status === 500) {
            throw new Error("Сервер сломался, попробуй позже")
        };
        if (response.status === 401) {
            throw new Error("Нет авторизации")
        };
            return response.json()
        });
        
}

