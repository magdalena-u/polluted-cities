import {
    createEl,
    append,
}
from './index'

//add function to read more
export function readMore() {
    const read = document.querySelectorAll('p');
    read.forEach(function (item) {
        item.addEventListener('click', showDescription);
    })
}

function showDescription() {
    const parent = this.parentNode;
    parent.querySelector('p').innerHTML = '';
    const searchTerm = parent.querySelector('span').innerHTML;
    const wiki = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=extracts&exintro=&explaintext=&formatversion=2&titles=${searchTerm}`;

    fetch(wiki)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            //create elements in app
            const description = createEl('div');
            const less = createEl('p');
            appendElApp(parent, description, less);
            classElApp(description, less);
            funcOfLess(less);
            //information about the city
            if (data.query.pages[0].invalid || data.query.pages[0].missing || data.query.pages[0].extract == "") {
                description.innerHTML = "No information about the city";
            } else description.innerHTML = data.query.pages[0].extract;
        })
}

//append elements
const appendElApp = (parent, description, less) => {
    append(parent, description);
    append(parent, less);
}

//add class
const classElApp = (description, less) => {
    description.classList.add('city_text');
    less.classList.add('less');
}

//add function and text to less
const funcOfLess = (less) => {
    less.innerHTML = 'read less -';
    less.addEventListener('click', readLess);
}

function readLess() {
    const parent = this.parentNode;
    const description = parent.querySelector('.city_text');
    const less = parent.querySelector('.less');
    const more = parent.querySelector('p');
    more.innerHTML = `read more +`;
    removeEl(description, less);
}

//remove elements
const removeEl = (description, less) => {
    description.remove();
    less.remove();
}