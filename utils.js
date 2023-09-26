export function sanitizeInput(input) {
    const name = sanitizeInput(nameInput.value.trim());
    const comment = sanitizeInput(commentInput.value.trim());
    return input.trim();
  }