import "../style/style.css";
import "../index.html";

import { sendRequest, getDataStarWars } from "./getStarWarsData";

const dataContainer = document.querySelector('tbody');
const pagination = document.querySelector('.pagination');

window.onload = function() {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function() {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 5000);
}

let notesOnPage = 3;
let countOfItems = Math.ceil(6);

let showPage = (function() {
    let active;

    return function(item) {
        if (active) {
            active.classList.remove('active');
        }
        active = item;

        // console.log(item);

        item.classList.add('active');

        let pageNum = +item.innerHTML;
        console.log(pageNum);
        getDataStarWars(dataContainer, pageNum);
    };
}());

let items = [];
for (let i = 1; i <= countOfItems; i++) {
    let li = document.createElement('li');
    li.innerHTML = i;
    pagination.appendChild(li);
    items.push(li);
}

showPage(items[0]);

for (let item of items) {
    item.addEventListener('click', function() {
        dataContainer.innerText = '';
        showPage(this);
    });
}