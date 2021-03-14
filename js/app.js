'use strict';

// ---------- We defined the products name as imgs named & ext. senice we have different ext.

let productsName = [
    'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chairt',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark',
    'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
let ext = [
    'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg',
    'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg',
    'jpg', 'jpg', 'jpg', 'gif', 'jpg', 'jpg',];

// ---------- Now building the constractor

function product(name, ext) {
    this.name = name;
    this.votes = 0;
    this.views = 0;
    this.path = `./img/${name}.${ext}`;
    product.array.push(this);
}
// ---------- This one for orginzing some how!

product.array = [];

// ---------- For loop to creat istant objects

for (let i = 0; i < productsName.length; i++) {
    new product(productsName[i], ext[i]);
}

// ---------- Building the Render

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Index = i in the array --- path = for the src --- alt & title for naming only!
// & we put -1 from the array.length to make it = to actual length!

function render() {

    let firstIndex = randomNumber(0, product.array.length - 1);
    let firstRandomProduct = product.array[firstIndex];
    firstIndex.src = firstRandomProduct.path;
    firstIndex.alt = firstRandomProduct.name;
    firstIndex.title = firstRandomProduct.name;

    let secondIndex = randomNumber(0, product.array.length - 1);
    let secondRandomProduct = product.array[secondIndex];
    secondIndex.src = secondRandomProduct.path;
    secondIndex.alt = secondRandomProduct.name;
    secondIndex.title = secondRandomProduct.name;

    let thirdIndex = randomNumber(0, product.array.length - 1);
    let thirdRandomProduct = product.array[thirdIndex];
    thirdIndex.src = thirdRandomProduct.path;
    thirdIndex.alt = thirdRandomProduct.name;
    thirdIndex.title = thirdRandomProduct.name;
}

// ---------- Getting elements from html for the render!

let productsSection = document.getElementById('products');
let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let thirdtImg = document.getElementById('thirdtImg');

productsSection.addEventListener('click', clickHandler);

function clickHandler(event) {
    if (event.target.id === 'firstImg' || event.target.id === 'secondImg' || event.target.id === 'thirdtImg') {
        for (let i = 0; i < product.array.length; i++) {
            if (product.array[i].name === event.target.title) {
                product.array[i].votes++;
            }
            if (product.array[i].name === event.target.src) {
                product.array[i].views++;
            }
        }
        render();
    }
}



render();