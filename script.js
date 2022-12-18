let dishes = ['Pizza Salami', 'Pizza Schinken', 'Hamburger', 'Cheeseburger', 'Beilagensalat', 'Pommes Frites'];
let details = ['mit Tomatensauce und Mozzarella', 'mit Tomatensauce und Champignons', 'mit sauren Gurken, Ketchup und Senf', ' mit Gouda und Emmentaler', 'mit Tomaten, Paprika und Oliven', 'mit Meersalz und einer Prise Liebe']
let prices = [8.90, 9.90, 5.50, 6.50, 3.20, 2.50];
let amounts = [1, 1, 1, 1, 1, 1];

let basketDishes = [];
let basketPrices = [];
let basketAmounts = [];

let deliveryPrice = 2.99.toFixed(2).replace('.', ',');

function renderDishes() {
    let content = document.getElementById('content')
    content.innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {
        const dish = dishes[i]; // Variablen werden nicht genutzt, vergleiche Notizen Webapp! 
        const price = prices[i];
        const detail = details[i]; // 
        const amount = amounts[i]; // dish, price und amount mÃ¼ssen als Parameter mitgegeben werden
        content.innerHTML += generateRenderDishesHTML(dish, detail, price, i);
    }
    renderBasket();
}

function generateRenderDishesHTML(dish, detail, price, i) {
    return `
    <div class="dish">
    <img src="img/plus_01.png" onclick="addToBasket(${i})">
    <h3>${dish}</h3> 
    <p>${detail}</p><br>
    <span>${price.toFixed(2).replace('.', ',')} €</span>
    </div>
    `;
}

function renderBasket() {

    if (basketDishes.length >= 1) {
        renderFullBasket();
    } else {
        renderEmptyBasket();
    }
}

function renderEmptyBasket() {
    let emptyBasket = document.getElementById('basket');
    emptyBasket.innerHTML = '';
    emptyBasket.innerHTML = `
        <img class="shopping-bag" src="img/shopping-bag-2-48.png" alt="Logo">
        <h2>Fülle deinen Warenkorb</h2>
        <p>Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.<p>`;
}

function renderFullBasket() {
    let fullBasket = document.getElementById('basket');
    fullBasket.innerHTML = '';

    for (let i = 0; i < basketDishes.length; i++) {
        let basketAmount = basketAmounts[i];
        let basketPrice = basketPrices[i];
        let basketDish = basketDishes[i];

        fullBasket.innerHTML += basketHTML(basketAmount, basketPrice, basketDish, i);
    }
    updateBasket();
}

function basketHTML(basketAmount, basketPrice, basketDish, i) {
    return `
    <div class="basket-top">
        <div class="top-left">
            <div class="amount"><h4>${basketAmount}</h4></div>
            <div class="product"><h4>${basketDish}</h4></div>
        </div>
        <div class="top-right">
            <div class="price">
                <p>${basketPrice.toFixed(2).replace('.', ',')} €</p>
            </div>
        </div>
    </div>
    <div class="basket-bottom">
        <p>Anmerkung hinzufügen</p>
        <div class="basket-buttons">
            <button class="minus id="minus" onclick=decreaseAmount(${i})>-</button>
            <button class="plus" id="plus" onclick=increaseAmount(${i})>+</button>
        </div>
    </div>
    `;
}

function addToBasket(i) {
    let index = basketDishes.indexOf(basketDishes[i]);

    if (index == -1) {
        basketDishes.push(dishes[i]);
        basketPrices.push(prices[i]);
        basketAmounts.push(Number(1));
    } else {
        basketAmounts[index]++;
    }
    renderBasket();
    updateBasket();
}

function updateBasket(finalSum) {
    let basketSum = document.getElementById('sum');
    let sum = 0;

    for (let i = 0; i < basketPrices.length; i++) {
        let price = basketPrices[i];
        let amount = basketAmounts[i];

        sum += (price * amount);
    }

    finalSum = sum + 2.99;
    basketSum.innerHTML = checkCalc(sum, finalSum);
}

function checkCalc(sum, finalSum) {
    return `
    <div class="basketSum" id="basketSum">
        <div class="basket-left">
        <span>
            Zwischensumme:  <br>
            Lieferkosten:   <br>
            <b>Gesamtkosten:</b>   <br> 
        </span>
        </div>  
        <div class="basket-right">
            <span>${sum.toFixed(2).replace('.', ',')} €<br>
            ${deliveryPrice} €<br>
            <b>${finalSum.toFixed(2).replace('.', ',')} €</b> <br> 
            </span>
        </div>  
    </div>
    
    <div>
        <button onclick="order()" class="order-button">Bezahlen</button> 
    </div>`
}

function increaseAmount(i) { // forgot i
    if (basketAmounts[i] >= 1) {
        basketAmounts[i]++;
    }
    renderBasket();
}

function decreaseAmount(i) { // forgot i
    if (basketAmounts[i] > 1) {
        basketAmounts[i]--;
    } else {
        basketDishes.splice(i, 1);
        basketPrices.splice(i, 1);
        basketAmounts.splice(i, 1);
    }
    renderBasket();
}

function order() {
    alert("Vielen Dank für Ihre Bestellung. Sie werden nun zu PayPal weitergeleitet.");
}