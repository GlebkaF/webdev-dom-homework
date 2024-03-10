export const userInput1 = ({ nameEl, textEl, formEl, buttonEl }) => {
  nameEl.addEventListener("input", evnt);
  textEl.addEventListener("input", evnt);
  function evnt(event) {
    if (event.target.value !== "") buttonEl.disabled = false;
  }

  formEl.addEventListener("keyup", (e) => {
    if (!e.shiftKey && e.code === "Enter") {
      buttonEl.click();
    }
  });
};

export const userInput2 = ({nameEl, textEl}) => {
 
  nameEl.value = nameEl.value.trim();
  textEl.value = textEl.value.trim();

  nameEl.classList.remove("add-form_error");
  textEl.classList.remove("add-form_error");

  if (nameEl.value === "" && textEl.value === "") {
    nameEl.classList.add("add-form_error");
    textEl.classList.add("add-form_error");
    return;
  } else if (nameEl.value === "") {
    nameEl.classList.add("add-form_error");
    return;
  } else if (textEl.value === "") {
    textEl.classList.add("add-form_error");
    return;
  }
};
