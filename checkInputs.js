export function checkInputs(inputs, button) {
    
    for (let i = 0; i < inputs.length; i++) {
        const e = inputs[i];
        if (e === "") {
            button.setAttribute('disabled', "");
            return;
        } 
    }
    button.disabled = false;
    
}