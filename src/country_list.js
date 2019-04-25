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
            const lowCountry = countryAll[i].name.toLowerCase();
            const lowValue = currentValue.toLowerCase();
            if (lowCountry.indexOf(lowValue) != -1) {
                countryList.push(countryAll[i].name);
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

//choose the coutry from list
const chooseCountry = () => {
    const items = document.querySelectorAll('.country_item');
    items.forEach(item => item.addEventListener('click', function () {
        document.getElementById('country').value = item.innerHTML;
        let countryValue = item.innerHTML;
        checkCode(countryValue)
        cleanList();
        populateStorage();
    }))
}

//check code of country
const checkCode = (countryValue) => {
    for (let i = 0; i < countryAll.length; i++) {
        if (countryValue === countryAll[i].name) {
            countryCode = countryAll[i].code;
        }
    }
}

input.addEventListener('keyup', getValue)