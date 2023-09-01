export function checkNameInput(nameInput, commitInput, btn) {
  if (nameInput.value.length < 1 || commitInput.value.length < 1) {
    btn.classList.add("empty");
    btn.disabled = true;
  } else {
    btn.classList.remove("empty");
    btn.disabled = false;
  }
  if (
    nameInput.value.length >= 3 &&
    nameInput.style.backgroundColor === `rgba(255, 186, 186, 0.5)`
  ) {
    nameInput.style.backgroundColor = `#FFFFFF`;
  }
}

export function checkTextInput(nameInput, commitInput, btn) {
  if (nameInput.value.length < 1 || commitInput.value.length < 1) {
    btn.classList.add("empty");
    btn.disabled = true;
  } else {
    btn.classList.remove("empty");
    btn.disabled = false;
  }
  if (
    commitInput.value.length >= 3 &&
    commitInput.style.backgroundColor === `rgba(255, 186, 186, 0.5)`
  ) {
    commitInput.style.backgroundColor = `#FFFFFF`;
  }
}