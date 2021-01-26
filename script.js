//ref to element in HTML

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

/* Example

const dataTransaction = [
    { id: 1, text: "Grocery", amount: -100 },
    { id: 2, text: "Rent", amount: -200 },
    { id: 3, text: "Salary", amount: +1500 }


]
*/

let transactions = [];

function init() {
    list.innerHTML = '';
    transactions.forEach(addDataToList); /*Loop data from dataTransaction*/
    CalculateMoney();

}

function addDataToList(transactions) {
    const symbol = transactions.amount < 0 ? '-' : '+';
    const status = transactions.amount < 0 ? 'minus' : 'plus';
    const item = document.createElement('li');
    result = formatNumber(Math.abs(transactions.amount));
    item.classList.add(status);
    item.innerHTML = 'as Bill <span>- A$400</span><button class="delete-btn">x</button>';
    item.innerHTML = `${transactions.text}<span>${result}</span><button class="delete-btn" onclick="removeData(${transactions.id})">x</button>`;
    list.appendChild(item);
}

//add comma for amount eg. 20,000//
function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function autoID() {
    return Math.floor(Math.random() * 1000000); //~number
}

function CalculateMoney() {
    const amounts = transactions.map(transactions => transactions.amount);
    //total balance//
    const total = amounts.reduce((result, item) => (result += item), 0).toFixed(2);
    //calculate income//
    const income = amounts.filter(item => item > 0).reduce((result, item) => (result += item), 0).toFixed(2);
    //calculate expense//
    const expense = (amounts.filter(item => item < 0).reduce((result, item) => (result += item), 0) * -1).toFixed(2);


    //show result//
    balance.innerText = `A$ ` + formatNumber(total);
    money_plus.innerText = `A$` + formatNumber(income);
    money_minus.innerText = `A$` + formatNumber(expense);
}

function removeData(id) {
    transactions = transactions.filter(transactions => transactions.id !== id)
    init();

}

function addTransaction(e) {
    e.preventDefault();
    if (text.value.trim() === '' || amount.value.trim() === '') {
        alert("Please complete detail"); //chack correct info//
    } else { //save into array transactions//
        const data = {
            id: autoID(),
            text: text.value,
            amount: +amount.value
        }
        transactions.push(data);
        addDataToList(data);
        CalculateMoney();
        text.value = '';
        amount.value = '';

    }
}

form.addEventListener('submit', addTransaction);


init();