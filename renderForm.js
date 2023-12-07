export function renderForm(message, isLoading) {
    const addForm = document.querySelector('.add-form');
    const loadingComm = document.querySelector('.loading-comments');
    if (isLoading === true) {
        loadingComm.innerHTML = message;
        loadingComm.style.display = 'flex';
        addForm.style.display = 'none';
    } else {
        loadingComm.style.display = 'none';
        addForm.style.display = 'flex';
    }
}