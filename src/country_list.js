import {
    populateStorage
} from "./storage_data";

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
    cleanList()
    let currentValue = document.getElementById('country').value;

    if (currentValue.length > 0) {
        for (let i = 0; i < countryAll.length; i++) {
            if (countryAll[i].name.toLowerCase().indexOf(currentValue.toLowerCase()) != -1) {
                countryList.push(countryAll[i].name);
                countryCode = countryAll[i].code;
            }
        }
        showList()
    }
}

// clean the list of countries
const cleanList = () => {
    countryResult.innerHTML = "";
    countryList = [];
}


//show list of countries
const showList = () => {
    for (let i = 0; i < countryList.length; i++) {
        countryResult.innerHTML += `<li class="country_item">${countryList[i]}</li>`
    }
    chooseCountry()
}

//choose the coutry from automated list
const chooseCountry = () => {
    const items = document.querySelectorAll('.country_item');
    items.forEach(item => item.addEventListener('click', function () {
        document.getElementById('country').value = item.innerHTML;
        cleanList();
        populateStorage();
    }))
}

input.addEventListener('keyup', getValue)