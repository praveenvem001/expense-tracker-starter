import { useState } from 'react'
import Summary from './components/Summary'
import CategoryChart from './components/CategoryChart'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { CATEGORIES } from './lib/format'
import './App.css'

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, description: "Salary", amount: 5000, type: "income", category: "salary", date: "2025-01-01" },
    { id: 2, description: "Rent", amount: 1200, type: "expense", category: "housing", date: "2025-01-02" },
    { id: 3, description: "Groceries", amount: 150, type: "expense", category: "food", date: "2025-01-03" },
    { id: 4, description: "Freelance Work", amount: 800, type: "income", category: "salary", date: "2025-01-05" },
    { id: 5, description: "Electric Bill", amount: 95, type: "expense", category: "utilities", date: "2025-01-06" },
    { id: 6, description: "Dinner Out", amount: 65, type: "expense", category: "food", date: "2025-01-07" },
    { id: 7, description: "Gas", amount: 45, type: "expense", category: "transport", date: "2025-01-08" },
    { id: 8, description: "Netflix", amount: 15, type: "expense", category: "entertainment", date: "2025-01-10" },
  ]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Finance Tracker</h1>
      </header>

      <Summary transactions={transactions} />

      <div className="workspace">
        <TransactionList transactions={transactions} categories={CATEGORIES} onDelete={deleteTransaction} />

        <aside className="sidebar">
          <TransactionForm categories={CATEGORIES} onAdd={addTransaction} />
          <CategoryChart transactions={transactions} />
        </aside>
      </div>
    </div>
  );
}

export default App
