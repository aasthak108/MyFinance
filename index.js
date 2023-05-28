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
// Function to edit a transaction
function editTransaction(id) {
    const transaction = transactions.find(transaction => transaction.id === id);
    if (!transaction) return;

    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    transactionTypeInput.value = transaction.transactionType;

    // Remove the transaction from the list temporarily
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Update the transaction list and balance
    updateTransactions();
    updateBalance();
    displayReport(); // Update the report after editing a transaction
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

// Initializing the transaction list and balance
updateTransactions();
updateBalance();
function handleResize() {
    const screenWidth = window.innerWidth;
  
    if (screenWidth >= 600) {
        document.body.style.backgroundColor = 'yellow';
        }
    else {
        document.body.style.backgroundColor = 'purple';
    }
    }
    window.addEventListener('resize', handleResize);

// Calling the handleResize function initially
handleResize();
   //
   //
   // Function to generate the report
// Function to generate the report
function generateReport() {
    const income = transactions
        .filter(transaction => transaction.transactionType === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.transactionType === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

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
                ${formatCurrency(income - expenses)}
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

// Call the displayReport function to initially display the report
displayReport();
