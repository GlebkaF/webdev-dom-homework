export function pushCommit(preLoaderText, btn) {
  preLoaderText.textContent = "Загружаем ваш комментарий ...";
  preLoaderText.classList.add("margin");
  btn.classList.add("empty");
  btn.disabled = true;
}