
import { transactions, addTransaction, updateTransaction, deleteTransaction, getStats } from './state.js';
import { initSettings } from './settings.js';
import { loadTransactions, saveTransactions } from './storage.js'; // <-- fixed


const form = document.getElementById('transaction-form');
const tbody = document.getElementById('records-body');
const totalIncomeEl = document.getElementById('total-income');
const totalExpenseEl = document.getElementById('total-expense');
const balanceEl = document.getElementById('balance');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');


if (transactions.length === 0) { 
    fetch('seed.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(txn => {
               
                if (txn.type === 'expense') {
                    txn.amount = -Math.abs(txn.amount);
                } else {
                    txn.amount = Math.abs(txn.amount);
                }
                addTransaction(txn); 
            });
            renderTransactions(transactions); 
        })
        .catch(err => console.error('Error loading seed.json:', err));
} else {
    renderTransactions(transactions);
}



function renderTransactions(list) {
    tbody.innerHTML = '';
    list.forEach(txn => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${txn.date}</td>
            <td>${txn.description}</td>
            <td>${txn.category}</td>
            <td>${txn.amount.toFixed(2)}</td>
            <td>
                <button class="edit-btn" data-id="${txn.id}">Edit</button>
                <button class="delete-btn" data-id="${txn.id}">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
    updateStats();
}

function updateStats() {
    const stats = getStats();
    totalIncomeEl.textContent = `$${stats.totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `$${stats.totalExpense.toFixed(2)}`;
    balanceEl.textContent = `$${stats.balance.toFixed(2)}`;
}


function generateId() {
    return 'txn_' + Math.random().toString(36).substr(2, 9);
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const description = form.description.value.trim();
    const amountInput = parseFloat(form.amount.value);
    const type = form.type.value;
    const amount = type === 'expense' ? -Math.abs(amountInput) : Math.abs(amountInput);
    const date = form.date.value;
    const category = form.category.value;

    if (!description || isNaN(amount) || !date || !category || !type) return alert('Please fill all fields');

    const newTxn = {
        id: generateId(),
        description,
        amount,
        date,
        category,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    addTransaction(newTxn);
    renderTransactions(transactions);
    form.reset();
});


tbody.addEventListener('click', e => {
    const id = e.target.dataset.id;
    if (e.target.classList.contains('delete-btn')) {
        if (confirm('Delete this transaction?')) {
            deleteTransaction(id);
            renderTransactions(transactions);
        }
    } else if (e.target.classList.contains('edit-btn')) {
        const txn = transactions.find(t => t.id === id);
        if (!txn) return;
        form.description.value = txn.description;
        form.amount.value = Math.abs(txn.amount);
        form.type.value = txn.amount < 0 ? 'expense' : 'income';
        form.date.value = txn.date;
        form.category.value = txn.category;

     
        deleteTransaction(id);
    }
});


searchBtn.addEventListener('click', () => {
    const pattern = searchInput.value;
    try {
        const regex = new RegExp(pattern, 'i');
        const filtered = transactions.filter(t => regex.test(t.description) || regex.test(t.category));
        renderTransactions(filtered);
    } catch {
        alert('Invalid regex pattern');
    }
});


renderTransactions(transactions);
initSettings();

