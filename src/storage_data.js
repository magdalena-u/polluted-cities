const input = document.getElementById('country');

if (input.value === "") {
    input.value = localStorage.getItem('inputValue')
}

export const populateStorage = () => {
    localStorage.setItem('inputValue', document.getElementById('country').value)
}