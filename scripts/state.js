
import { loadTransactions, saveTransactions } from './storage.js';

export let transactions = loadTransactions();


export function addTransaction(txn) {
    transactions.push(txn);
    saveTransactions(transactions);
}


export function updateTransaction(id, newData) {
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        transactions[index] = { ...transactions[index], ...newData, updatedAt: new Date().toISOString() };
        saveTransactions(transactions);
    }
}


export function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions(transactions);
}


export function getStats() {
    const totalIncome = transactions.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const totalExpense = transactions.filter(t => t.amount < 0).reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const balance = totalIncome - totalExpense;
    return { totalIncome, totalExpense, balance };
}
