let dishes = ['Pizza Salami', 'Pizza Schinken', 'Hamburger', 'Cheeseburger', 'Beilagensalat', 'Pommes Frites'];
let prices = [8.90, 9.90, 5.50, 6.50, 3.20, 2.50];

function renderDishes() {
    let content = document.getElementById('content')
    content.innerHTML = '';

    for (let i = 0; i < dishes.length; i++) {
        let dish = dishes[i];
        content.innerHTML += `
        <div class="dish1">
        <h3>dishes[${i}]</h3>
        <span>mit Rosmarinsalz, ohne Dip nach Wahl</span>
        <span>Wahl aus: Wahl aus: mit Burger-Sauce, mit Heinz Tomaten Ketchup, mit Knoblauch-Mayonnaise,
            mit Mississippi-BBQ-Sauce (scharf), mit Posh Gherkin Relish und mehr.</span>
        <p>4,55 €</p>
        `;
    }
}

function addToBasket(dish, price) {
    dishes.push(dish)
    prices.push(price)
}

function updateBasket() {
    let sum = 0;

    for (let i = 0; i < prices.length; i++) {
        sum += prices[i];

    }

    let finalSum = sum + 2.95;

    document.getElementById('basket').innerHTML = sum;
}