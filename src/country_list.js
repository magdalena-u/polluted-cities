import { populateStorage } from "./storage_data";

import { showCities } from "./polluted_cities";

import { createEl, append } from "./index";

const input = document.getElementById("country");
const countryAll = [
  {
    name: "Poland",
    code: "PL"
  },
  {
    name: "Germany",
    code: "DE"
  },
  {
    name: "France",
    code: "FR"
  },
  {
    name: "Spain",
    code: "ES"
  }
];

let countryList = [];
export let countryCode;
const countryResult = document.querySelector(".country_list");
let flagSupport = false;
let currentNumber = -1;

// check the value of input
export const getValue = () => {
  cleanList();
  let currentValue = document.getElementById("country").value;
  if (currentValue.length > 0) {
    input.addEventListener("keydown", pressEnter);
    checkList(currentValue);
  }
};

// clean the list of countries
const cleanList = () => {
  countryResult.innerHTML = "";
  countryList = [];
};

//listener for enter
const pressEnter = e => {
  if (e.keyCode == 13) {
    e.preventDefault();
    const hover = document.querySelector(".hover");
    if (hover != null) {
      autoKey(hover);
    } else autoEnter();
  }
};

//check the list
const checkList = currentValue => {
  for (let i = 0; i < countryAll.length; i++) {
    const lowCountry = countryAll[i].name.toLowerCase();
    const lowValue = currentValue.toLowerCase();
    if (lowCountry.indexOf(lowValue) != -1) {
      countryList.push(countryAll[i].name);
    }
  }
  showList();
};

//show list of countries
const showList = () => {
  for (let i = 0; i < countryList.length; i++) {
    countryResult.innerHTML += `<li class="country_item">${
      countryList[i]
    }</li>`;
    input.addEventListener("keyup", chooseByKey);
  }
  chooseCountry();
};

//choose the coutry from list by click
const chooseCountry = () => {
  const items = document.querySelectorAll(".country_item");
  items.forEach(item =>
    item.addEventListener("click", function() {
      document.getElementById("country").value = item.innerHTML;
      let countryValue = item.innerHTML;
      trigger(countryValue);
    })
  );
};

//choose the coutry from list by key down
const chooseByKey = e => {
  const item = document.querySelectorAll(".country_item");
  if (e.keyCode === 40) {
    currentNumber++;
    if (currentNumber === item.length) {
      currentNumber = 0;
    }
    item[currentNumber].classList.add("hover");
  }
  if (e.keyCode === 38) {
    currentNumber--;
    if (currentNumber < 0) {
      currentNumber = item.length - 1;
    }
    item[currentNumber].classList.add("hover");
  }
};

//remove choose the country by key down
const removeChooseByKey = () => {
  const hover = document.querySelector(".hover");
  if (hover != null) {
    hover.classList.remove("hover");
  }
  return (currentNumber = -1);
};

//autocomplete input by key down
const autoKey = hover => {
  const currentValue = document.getElementById("country");
  const countryValue = hover.innerHTML;
  currentValue.value = countryValue;
  trigger(countryValue);
  input.blur();
  currentNumber = -1;
};

//autocomplete input by enter
const autoEnter = () => {
  const currentValue = document.getElementById("country").value;
  if (currentValue == "") {
    support();
  } else {
    const countryValue = currentValue[0].toUpperCase() + currentValue.slice(1);
    trigger(countryValue);
    input.blur();
  }
};

//check code of country
const checkCode = countryValue => {
  for (let i = 0; i < countryAll.length; i++) {
    if (countryValue === countryAll[i].name) {
      removeElSupport();
      return (countryCode = countryAll[i].code);
    } else {
      countryCode = "";
    }
  }
  support();
};

const trigger = countryValue => {
  checkCode(countryValue);
  showCities();
  cleanList();
  populateStorage();
};

//not suport
//not support - create elements
const support = () => {
  createElApp();
  removeElSupport();
  flagSupport = true;
};

const createElApp = () => {
  const div = createEl("div");
  const p1 = createEl("p");
  const p2 = createEl("p");
  appendElAp(div, p1, p2);
};
//not support - append elements
const appendElAp = (div, p1, p2) => {
  const container = document.getElementById("cities_container");
  append(div, p1);
  append(div, p2);
  append(container, div);
  innerApp(p1, p2);
  classElApp(div);
};

//not support - add class in app
const classElApp = div => {
  div.classList.add("not_support");
};

//not support - inner HTML
const innerApp = (p1, p2) => {
  p1.innerHTML = "Sorry, we do not support this data.";
  p2.innerHTML = "Choose one of available country.";
};

//not support - remove element
export const removeElSupport = () => {
  if (flagSupport) {
    const supportInfo = document.querySelector(".not_support");
    supportInfo.remove();
    flagSupport = false;
  }
};

input.addEventListener("keyup", getValue);
input.addEventListener("click", getValue);
countryResult.addEventListener("mouseover", removeChooseByKey);
