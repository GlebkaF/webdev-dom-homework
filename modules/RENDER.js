export const renderPeople = (ARRAY) => {
    const likeButtons = document.querySelectorAll(".like-button");
    const comentText = document.querySelectorAll(".comment-text");
    const textArea = document.getElementById("add-form-text");
    const delColBut = document.querySelectorAll(".del-form-button");
    const listComments = document.querySelector(".comments");

    const addDate = (value) => {
        let nowDate = new Date(value);
        let time = {
            hour: "numeric",
            minute: "numeric",
        };
        let date = {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        };

        return (
            nowDate.toLocaleDateString("ru", date) +
            " " +
            nowDate.toLocaleTimeString("ru", time)
        );
    };

    const getLike = (elementPeople) => {
        return elementPeople ? "like-button -active-like" : "like-button";
    };

    let render = ARRAY.map((el, i) => {
        return `<li class="comment">
  <div class="comment-header">
    <div>${el.author.name}</div>
    <div>${addDate(el.date)}</div>
  </div>
  <div class="comment-body">
    <div class="comment-text"  data-index="${i}">
      ${el.text}
    </div>
  </div>
  <div class="comment-footer">
  <button class="del-form-button" data-index="${i}">Удалить</button>
    <div class="likes">
      <div>
        <span class="likes-counter">${el.likes}</span>
        <button class="${getLike(el.isLiked)}" ></button></div>
    </div>
  </div>
</li>`;
    }).join("");

    listComments.innerHTML = render;

    likeButtons.forEach((likeButtonEl, index) => {
        likeButtonEl.addEventListener("click", () => {
            let likeEl = ARRAY[index];
            // console.log(likeEl);
            if (likeEl.isLiked === false) {
                likeEl.isLiked = true;
                likeEl.likes++;
                renderPeople(ARRAY);
            } else {
                likeEl.isLiked = false;
                likeEl.likes--;
                renderPeople(ARRAY);
            }
        });
    });

    comentText.forEach((textElement, index) => {
        textElement.addEventListener("click", (event) => {
            event.stopPropagation();
            let textValue = textElement.textContent;
            return (textArea.value = `>${textValue} ${ARRAY[index].name}  Ответ - `);
        });
    });

    delColBut.forEach((delButton, id) => {
        delButton.addEventListener("click", (event) => {
            event.stopPropagation();

            renderPeople(ARRAY);
        });
    });
};
