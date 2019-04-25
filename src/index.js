import {
    getValue
} from './country_list';

import {
    showCities
} from './polluted_cities';

//function for create elements
export function createEl(el) {
    return document.createElement(el);
}

//function for append elements
export function append(parent, child) {
    return parent.appendChild(child);
}