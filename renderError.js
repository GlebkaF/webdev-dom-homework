export function renderError (message, isError) {
    const errorMass = document.querySelector('.error-comments');
    if (isError === true) {
        errorMass.innerHTML = message;
        errorMass.style.display = 'block';
    } else {
        errorMass.style.display = 'none';
        errorMass.innerHTML = message;
    }
}