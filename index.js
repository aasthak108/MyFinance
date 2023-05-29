// Track transactions
let transactions = [];

// DOM elements
const transactionForm = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const transactionTypeInput = document.getElementById('transaction-type');
const transactionList = document.getElementById('list');
const balanceAmount = document.getElementById('balance-amount');

// Event listener for form submission
transactionForm.addEventListener('submit', addTransaction);

// Function to generate a unique ID for each transaction
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Function to add a transaction
function addTransaction(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = +amountInput.value;
    const transactionType = transactionTypeInput.value;

    const transaction = {
        id: generateID(),
        description,
        amount,
        transactionType
    };

    transactions.push(transaction);
    updateTransactions();
    updateBalance();
    clearInputs();
    displayReport(); // Update the report after adding a transaction
}

// Function to edit a transaction
function editTransaction(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (!transaction) return;

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    transactionTypeInput.value = transaction.transactionType;
    updateTransactions();
    updateBalance();
    displayReport(); // Update the report after editing a transaction
}

// Function to delete a transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateTransactions();
    updateBalance();
    displayReport(); // Update the report after deleting a transaction
}

// Function to update the transaction list
function updateTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.classList.add('transaction-item');

        const descriptionElement = document.createElement('span');
        descriptionElement.textContent = transaction.description;

        const amountElement = document.createElement('span');
        amountElement.textContent = formatCurrency(transaction.amount);

        const buttonsContainer = document.createElement('div');

        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => editTransaction(transaction.id));

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTransaction(transaction.id));

        buttonsContainer.appendChild(editButton);
        buttonsContainer.appendChild(deleteButton);

        listItem.appendChild(descriptionElement);
        listItem.appendChild(amountElement);
        listItem.appendChild(buttonsContainer);

        transactionList.appendChild(listItem);
    });
}

// Function to update the balance
function updateBalance() {
    const balance = transactions.reduce((total, transaction) => {
        return transaction.transactionType === 'income'
            ? total + transaction.amount
            : total - transaction.amount;
    }, 0);

    balanceAmount.textContent = formatCurrency(balance);
}

// Function to format currency with two decimal places
function formatCurrency(amount) {
    return `$ ${amount.toFixed(2)}`;
}

// Function to clear the input fields
function clearInputs() {
    descriptionInput.value = '';
    amountInput.value = '';
}

// Function to generate the report
// Function to generate the report
function generateReport() {
    const income = transactions
        .filter(transaction => transaction.transactionType === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.transactionType === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = income - expenses;

    const reportContent = `
        <div>
            <p>
                <strong>Income:</strong>
                ${formatCurrency(income)}
            </p>
            <p>
                <strong>Expenses:</strong>
                ${formatCurrency(expenses)}
            </p>
            <p>
                <strong>Balance:</strong>
                ${formatCurrency(balance)}
            </p>
        </div>
    `;

    return reportContent;
}

// Function to display the report
function displayReport() {
    const reportContent = generateReport();
    const reportContainer = document.getElementById('report-content');
    reportContainer.innerHTML = reportContent;
}
displayReport();
// Chart button event listener
// Chart button event listener
const chartButton = document.getElementById('chart-button');

chartButton.addEventListener('click', function() {
    // Get the total income and total expense values from your transactions data
    const income = transactions
        .filter(transaction => transaction.transactionType === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.transactionType === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    // Get the canvas element
    const chartCanvas = document.getElementById('chart-canvas');

    // Create a new Chart instance
    const myChart = new Chart(chartCanvas, {
        type: 'bar',
        data: {
            labels: ['Income', 'Expenses'],
            datasets: [{
                label: 'Transaction Summary',
                data: [income, expenses],
                backgroundColor: ['#36a2eb', '#ff6384'],
                borderColor: ['#36a2eb', '#ff6384'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
});
