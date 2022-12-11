let dishes = ['Pizza Salami', 'Pizza Schinken', 'Hamburger', 'Cheeseburger', 'Beilagensalat', 'Pommes Frites'];
let details = ['mit Tomatensauce und Mozzarella', 'mit Tomatensauce und Champignons', 'mit sauren Gurken, Ketchup und Senf', ' mit Gouda und Emmentaler', 'mit Tomaten, Paprika und Oliven', 'mit Meersalz und einer Prise Liebe']
let prices = [8.90, 9.90, 5.50, 6.50, 3.20, 2.50];
let amounts = [1, 1, 1, 1, 1, 1];

let basketDishes = [];
let basketPrices = [];
let basketAmounts = [];


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
    <span>${price} €</span>
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
        <h2>Warenkorb</h2>
        <img class="shopping-bag" src="img/shopping-bag-2-48.png" alt="Logo">
        <h2>Lege etwas in den Warenkorb</h2>
        <p>Dein Warenkorb ist leer<p>`;
}


function renderFullBasket(sum, finalSum) {
    let fullBasket = document.getElementById('inner-basket');
    fullBasket.innerHTML = '';

    for (let i = 0; i < basketDishes.length; i++) {
        const basketAmount = basketAmounts[i];
        const basketPrice = basketPrices[i];
        const basketDish = basketDishes[i];

        // forgot to put the plus before =
        fullBasket.innerHTML += `
        <h2>Warenkorb</h2>
        <div class="inner-basket">
            <div class="amount">${basketAmount}</div>
            <div class="product">
                <h3>${basketDish}</h3>
                <p>Anmerkung hinzufügen</p>
            </div>
            <div class="price">
                <h2>${basketPrice} €</h2>
                <img src="" alt=""> <img src="" alt="">
            </div>
        </div>
        <div class="outer-basket">
            <div class="sum" id="basket-sum">
                <div class="sum-left">
                    <p>Zwischensumme</p>
                    <p>Lieferkosten</p>
                    <p>Gesamt</p>
                </div>
                <div class="sum-right">
                    <p>${sum} €</p>
                    <p>2.95 €</p>
                    <p>${finalSum} €</p>
                </div>
            </div>
            <div>
                <button>Bezahlen (SUMME)</button>
            </div>
        </div>
        `;
    }
    updateBasket();
}


function addToBasket(i) {
    let index = basketDishes.indexOf(basketDishes[i]);

    if (index == -1) {
        basketDishes.push(dishes[i]) //pushed into the wrong arrays
        basketPrices.push(prices[i])
        basketAmounts.push(Number(1));
    } else {
        basketAmounts[index]++;
    }
}


function updateBasket() {
    let sum = 0;
    let delivery = 2.95;
    let finalSum = 0;

    for (let i = 0; i < prices.length; i++) {
        finalSum += prices[i];
        if (finalSum < 15) {
            delivery = 2.50
        } else {
            delivery = 0;
        }

    }

    finalSum = sum + delivery;
    document.getElementById('basket-sum').innerHTML = sumHTML();
}


function sumHTML(sum, delivery, finalSum) {
    return `
    <table class="tableSum">
        <tr>
          <td>Zwischensumme</td>
          <td>${sum.toFixed(2).replace('.', ',')} â‚¬</td>
        </tr>
        <tr>
          <td>Lieferkosten</td>
          <td>${delivery.toFixed(2).replace('.', ',')} â‚¬</td>
        </tr>
        <tr>
          <td>Gesamtsumme</td>
          <td>${finalSum.toFixed(2).replace('.', ',')} â‚¬</td>
        </tr>
      </table> <br>
      <button class="buttonPay">Bezahlen (${finalSum.toFixed(2).replace('.', ',')} â‚¬)</button>
    `;
}