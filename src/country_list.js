import {
    populateStorage
} from "./storage_data";

import {
    showCities
} from './polluted_cities';

import {
    createEl,
    append,
}
from './index'

const input = document.getElementById('country');
const countryAll = [{
        name: 'Poland',
        code: 'PL'
    },
    {
        name: 'Germany',
        code: 'DE'
    },
    {
        name: 'France',
        code: 'FR'
    }, {
        name: 'Spain',
        code: 'ES'
    }
];

let countryList = [];
export let countryCode;
const countryResult = document.querySelector('.country_list');


// check the value of input
export const getValue = () => {
    cleanList();
    let currentValue = document.getElementById('country').value;
    if (currentValue.length > 0) {
        input.addEventListener('keydown', pressEnter);
        checkList(currentValue);
    }
}

// clean the list of countries
const cleanList = () => {
    countryResult.innerHTML = "";
    countryList = [];
}


const pressEnter = (e) => {
    if (e.keyCode == 13) {
        e.preventDefault();
        const countryValue = document.getElementById('country').value;
        checkCode(countryValue);
        showCities();
        cleanList();
        populateStorage();
    }
}

//check the list
const checkList = (currentValue) => {
    for (let i = 0; i < countryAll.length; i++) {
        const lowCountry = countryAll[i].name.toLowerCase();
        const lowValue = currentValue.toLowerCase();
        if (lowCountry.indexOf(lowValue) != -1) {
            countryList.push(countryAll[i].name);
        }
    }
    showList()
}

//show list of countries
const showList = () => {
    for (let i = 0; i < countryList.length; i++) {
        countryResult.innerHTML += `<li class="country_item">${countryList[i]}</li>`;
    }
    chooseCountry()
}

//choose the coutry from list
const chooseCountry = () => {
    const items = document.querySelectorAll('.country_item');
    items.forEach(item => item.addEventListener('click', function () {
        document.getElementById('country').value = item.innerHTML;
        let countryValue = item.innerHTML;
        checkCode(countryValue);
        showCities();
        cleanList();
        populateStorage();
    }))
}

//check code of country
const checkCode = (countryValue) => {
    for (let i = 0; i < countryAll.length; i++) {
        if (countryValue === countryAll[i].name) {
            return countryCode = countryAll[i].code;
        } else {
            countryCode = '';
        }
    }
    // notSupport()
}

input.addEventListener('keyup', getValue);
input.addEventListener('click', getValue);