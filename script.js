"use strict";
let modalShow = document.getElementsByClassName('modal-show');
let modalClose = document.getElementsByClassName('modal-close');
let modal = document.getElementsByClassName('modal');
let contents = document.getElementsByClassName('l-contents');
let traning = document.getElementsByClassName('c-traning');
let minute = document.getElementsByClassName('c-minute');
let value = document.getElementsByClassName('c-value');
let OK = document.getElementsByClassName('c-okBtn')[0];
let gobtn = document.getElementsByClassName('c-goBtn')[0];
let index = "" + 1;
let valueArray = [];



const getIndex = () => {
  const ls = localStorage.getItem('index');
  index = ls;
}

getIndex();
let data = "";
let time = "";
let number = "";
let date = "";
let monthly = "";
let calorie = [0, 0, 0, 0];

const first = () => {

  const today = new Date();
  today.setDate(today.getDate());
  const yyyy = today.getFullYear();
  const mm = ("0"+(today.getMonth()+1)).slice(-2);
  const dd = ("0"+today.getDate()).slice(-2);
  
  let thisMonth = (yyyy+"-"+("0"+mm).slice(-2));
  document.getElementById("c-month").value=yyyy+'-'+mm;

  valueArray = [];
  
  for(let i = 1; i <= index; i++){
    let wordArray = JSON.parse(localStorage.getItem(i));
    wordArray = wordArray[5];
    let word = wordArray.slice( 0, -3 );
    if(word === thisMonth) {
      const jsonobj = JSON.parse(localStorage.getItem(i));
      valueArray.push(jsonobj);
    }
  }
  
  let senakaValue = 0;
  let hukkinValue = 0;
  let ashiValue = 0;
  let yusansoValue = 0;

  valueArray.forEach(function(item,index) {
    senakaValue = senakaValue + Number(valueArray[index][0]);
    hukkinValue = hukkinValue + Number(valueArray[index][1]);
    ashiValue = ashiValue + Number(valueArray[index][2]);
    yusansoValue = yusansoValue + Number(valueArray[index][3]);
  });

  value[0].innerHTML = senakaValue;
  value[1].innerHTML = hukkinValue;
  value[2].innerHTML = ashiValue;
  value[3].innerHTML = yusansoValue;
}

first();

const fadeIn = function(){
  const begin = new Date() - 0;
  const time = 200;
  const id = setInterval(function() {
    let current = new Date() - begin;
    if (current > time) {
      clearInterval(id);
      current = time;
    }
    modal[0].style.display = 'block';
    modal[0].style.opacity = (current/time);
  }, 10);
}

const disappear = () => {
  contents[0].style.display = "none";
}

const fadeOut = function() {
  modal[0].style.display = "none";
}

const appear = () => {
  contents[0].style.display = "block";
}

modalShow[0].onclick = function() {
  fadeIn(0.7);
  disappear();
}

modalClose[0].onclick = function() {
  fadeOut();
  appear();
}

const answer = localStorage.getItem('')

value = [].slice.call(value);
traning = [].slice.call(traning);

const num = () => {
  traning.forEach(function(item,index) {
    item.onclick = () => {
      data = item.dataset.ctrl;
      number = index;
    }
  });
}
num();

const calculate = () => {
  time = document.getElementById("c-minute").value ;
  const total = data * time;
  value.forEach(function (item, number2) {
    if (number === number2) {
      value[number2].innerHTML = total; 
    }
  });
}

const replace = () => {
  value.forEach(function () {
    calorie = [value[0].innerHTML, value[1].innerHTML, value[2].innerHTML, value[3].innerHTML];
  });
}

const save = () => {
  calorie.push(index, date);
  localStorage.setItem(index, JSON.stringify(calorie));
  localStorage.setItem('index', index);
}

const reset = () => {
  value.forEach(function (item) {
    item.innerHTML = 0;
  });
  calorie = [0, 0, 0, 0];
}

const change = () => {

  valueArray = [];

  monthly = document.getElementById("c-month").value ;
  
  for(let i = 1; i <= index; i++){
    let wordArray = JSON.parse(localStorage.getItem(i));
    wordArray = wordArray[5];
    let word = wordArray.slice( 0, -3 );
    if(word === monthly) {
      
      const jsonobj = JSON.parse(localStorage.getItem(i));
      valueArray.push(jsonobj);
    }
  }

  let senakaValue = 0;
  let hukkinValue = 0;
  let ashiValue = 0;
  let yusansoValue = 0;

  valueArray.forEach(function(item,index) {
    senakaValue = senakaValue + Number(valueArray[index][0]);
    hukkinValue = hukkinValue + Number(valueArray[index][1]);
    ashiValue = ashiValue + Number(valueArray[index][2]);
    yusansoValue = yusansoValue + Number(valueArray[index][3]);
  });

  value[0].innerHTML = senakaValue;
  value[1].innerHTML = hukkinValue;
  value[2].innerHTML = ashiValue;
  value[3].innerHTML = yusansoValue;

  
  console.log(valueArray);
}

gobtn.onclick = () => {
  change();
}

OK.onclick = () => {
  date = document.getElementById('l-calender').value;
  index ++;
  reset();
  calculate();
  replace();
  save();
  first();
}
