import {
    countryCode
} from './country_list';

import {
    readMore
} from './city_description'

import {
    createEl,
    append
}
from './index'

const search = document.querySelector('.fa-search')
let flag = false;

function showCities(e) {
    e.preventDefault()
    const url = `https://api.openaq.org/v1/latest?limit=10&country=${countryCode}&parameter=pm25&order_by=measurements[0].value&sort=desc`;
    let cityCont = document.getElementById('cities_container');

    if (flag) {
        const cityDivs = document.querySelectorAll('.city_div');
        cityDivs.forEach(city => cityCont.removeChild(city))
        flag = !flag;
    }

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            cityCont = data.results;
            return cityCont.map(function (city) {
                //create elements in app
                const div = createEl('div');
                const number = createEl('div');
                const numberSpan = createEl('span');
                const cityItem = createEl('div');
                const citySpan = createEl('span');
                const p = createEl('p');
                appendElApp(div, number, numberSpan, cityItem, citySpan, p);
                classElApp(div, number, cityItem);
                //inner HTML
                const cityValue = city.measurements[0].value;
                numberSpan.innerHTML = Math.round(cityValue);
                const cityCity = city.city;
                citySpan.innerHTML = cityCity.replace('CCAA', '').replace('Com. ', '').replace('Warszawa', 'Warsaw');
                p.innerHTML = `read more +`;
                readMore()
            })
        })
    flag = true;
}

//append elements
const appendElApp = (div, number, numberSpan, cityItem, citySpan, p) => {
    const container = document.getElementById('cities_container')
    append(number, numberSpan);
    append(div, number);
    append(div, cityItem);
    append(cityItem, citySpan);
    append(cityItem, p);
    append(container, div);
}

//add class in app
const classElApp = (div, number, cityItem) => {
    div.classList.add('city_div');
    number.classList.add('number');
    cityItem.classList.add('city_item');
}

search.addEventListener('click', showCities)