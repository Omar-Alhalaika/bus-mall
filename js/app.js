'use strict';

// ---------- We defined the products name as imgs named & ext. senice we have different ext.

let productsName = [
    'bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair',
    'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark',
    'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
let ext = [
    'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg',
    'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg', 'jpg',
    'png', 'jpg', 'jpg', 'gif', 'jpg', 'jpg',];

// ---------- Now building the constractor

function product(name, ext) {
    this.name = name;
    this.votes = 0;
    this.views = 0;
    this.path = `./img/${name}.${ext}`;
    // ---------- property to keeps track of all the products that are currently being considered.
    product.array.push(this);
}
product.array = [];
console.log(product.array)

// ---------- Save and update local storge
function updateLocalStorge() {
    let stringedArray = JSON.stringify(product.array);
    localStorage.setItem('votesAndViwes', stringedArray);
    // console.log(stringedArray)

}

// ---------- Parse local storge
function parseLocalStorge() {
    let getData = localStorage.getItem('votesAndViwes');
    let parseData = JSON.parse(getData);
    console.log(parseData);
    if (parseData == null) {
        console.log(parseData);
        parseData = product.array;


    }
    for (let i = 0; i < parseData.length; i++) {
        product.array[i].votes = parseData[i].votes;
        product.array[i].views = parseData[i].views;
    }
    render();
    chartFun();

}

// ---------- For loop to creat instant objects

for (let i = 0; i < productsName.length; i++) {
    new product(productsName[i], ext[i]);
}

// ---------- Getting elements from html for the render!

let productsSection = document.getElementById('products');
let firstImg = document.getElementById('firstImg');
let secondImg = document.getElementById('secondImg');
let thirdtImg = document.getElementById('thirdtImg');

// ---------- Building the Render

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Index = i of the array --- path = for the src --- alt & title for naming only!
// & we put -1 from the array.length to make it = to actual length!

let showenProducts = [];
function render() {
    updateLocalStorge();

    // ---------- we're using DO WHILE to run the stetments then check the condition & if it's false it'll do the stetments again
    // ---------- and notice that we declare let as an empty vars to use it inside the Do While!
    let firstIndex;
    let secondIndex;
    let thirdIndex;
    do {
        firstIndex = randomNumber(0, product.array.length - 1);
        secondIndex = randomNumber(0, product.array.length - 1);
        thirdIndex = randomNumber(0, product.array.length - 1);

    } while (firstIndex == secondIndex || firstIndex == thirdIndex || secondIndex == thirdIndex ||
    showenProducts.includes(firstIndex) || showenProducts.includes(secondIndex) || showenProducts.includes(thirdIndex));
    // ---------- look for this consle to check this step    
    // console.log(firstIndex, secondIndex, thirdIndex)

    let firstRandomProduct = product.array[firstIndex];
    firstImg.src = firstRandomProduct.path;
    firstImg.alt = firstRandomProduct.name;
    firstImg.title = firstRandomProduct.name;
    firstRandomProduct.views++;
    // ---------- and notice that we only change an exact parameter of the array not pushing to the array!
    showenProducts[0] = firstIndex;
    // ---------- look for this consle to check this step  
    // console.log(showenProducts[0]);

    let secondRandomProduct = product.array[secondIndex];
    secondImg.src = secondRandomProduct.path;
    secondImg.alt = secondRandomProduct.name;
    secondImg.title = secondRandomProduct.name;
    secondRandomProduct.views++;
    showenProducts[1] = secondIndex;

    let thirdRandomProduct = product.array[thirdIndex];
    thirdtImg.src = thirdRandomProduct.path;
    thirdtImg.alt = thirdRandomProduct.name;
    thirdtImg.title = thirdRandomProduct.name;
    thirdRandomProduct.views++;
    showenProducts[2] = thirdIndex;

}

// ---------- Add the event listener

productsSection.addEventListener('click', clickHandler);

let trials = 25;

function clickHandler(event) {
    trials -= 1;
    if (event.target.id === 'firstImg' || event.target.id === 'secondImg' || event.target.id === 'thirdtImg') {
        for (let i = 0; i < product.array.length; i++) {
            if (product.array[i].name === event.target.title) {
                product.array[i].votes++;
            }
        }
        // call render fun. to update previous rounds
        render();
    }
    if (trials === 0) {
        productsSection.removeEventListener('click', clickHandler);
        alert('Thank you for sharing your opinion see the results below')
        chartFun();
    }
}

// ---------- Building the chart
function chartFun() {

    let context = document.getElementById('productsChart');
    let votesArray = [];
    let viewsArray = [];
    for (let i = 0; i < product.array.length; i++) {
        votesArray.push(product.array[i].votes);
        viewsArray.push(product.array[i].views);
    }

    let chartObject = {

        type: 'bar',
        data: {
            labels: productsName,
            datasets: [{
                label: 'Views',
                data: viewsArray,
                backgroundColor: 'blue',
                borderColor: 'white',
                hoverBackgroundColor: 'white',
                // hoverBorderWidth:2,
                // borderWidth: 1
            },
            {
                label: 'Votes',
                data: votesArray,
                backgroundColor: 'yellow',
                borderColor: 'black',
                hoverBackgroundColor: 'black',
                // hoverBorderWidth:5,
                // borderWidth: 1
            }
            ]
        },
        options: {
            legend: {
                labels: {
                    fontColor: "black",
                    fontSize: 18
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 12,
                        stepSize: 1,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "black",
                        fontSize: 14,
                        stepSize: 1,
                        beginAtZero: true
                    }
                }]
            },
            xAxis: {
                scale: {
                    range: { min: 0, max: 100, padding: 0 }
                }
            }
        },
    };
    let theChart = new Chart(context, chartObject, { scaleFontColor: "black" });
}

// render();
parseLocalStorge();

