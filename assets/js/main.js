const balance = document.getElementById('balance');
const moneyPlus = document.getElementById('money-plus');
const moneyMinus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const dummyTransactions = [
    {id: 1, text: 'Bought Book', amount: -20},
    {id: 2, text: 'Salary', amount: 400},
    {id: 3, text: 'Bought Flower', amount: -40},
    {id: 4, text: 'Bank Transfer', amount: 120},
];

let transactions = dummyTransactions;

// Add transactions
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
      alert('Please add transaction name & amount');  
    } else{
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        transactions.push(transaction);

        addTransactionDom(transaction);
        updateBalance();

        text.value = '';
        amount.value = '';
    }
}
//Generate Random id
function generateId() {
    return Math.floor(Math.random() * 100000000);
}
// Add transactions to DOM listening
function addTransactionDom(transaction){
    //get sign for the class name
    const sign = transaction.amount < 0 ? '-' : '+';

    const item = document.createElement('li');

    //add class based on the amount
    item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

    item.innerHTML = `
        ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span><button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}
// Update the balance, income and expense
function updateBalance(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

    const expense = (amounts
    .filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    balance.innerHTML = `$${total}`;
    moneyPlus.innerHTML = `$${income}`;
    moneyMinus.innerHTML = `$${expense}`;
}

//Remove Transaction by ID
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    init();
}


//Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDom);
    updateBalance();
}

init();

form.addEventListener('submit', addTransaction);