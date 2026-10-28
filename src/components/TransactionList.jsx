import { useState } from 'react'
import { categoryColor, categoryLabel, formatDate, formatMoney } from '../lib/format';

function TransactionList({ transactions, categories, onDelete }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  const handleDelete = (t) => {
    if (window.confirm(`Delete "${t.description}"?`)) {
      onDelete(t.id);
    }
  };

  let filteredTransactions = transactions;
  if (filterType !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.type === filterType);
  }
  if (filterCategory !== "all") {
    filteredTransactions = filteredTransactions.filter(t => t.category === filterCategory);
  }

  return (
    <section className="panel transactions">
      <div className="transactions-header">
        <h2>Transactions</h2>
        <div className="filters">
          <label>
            <span className="visually-hidden">Filter by type</span>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
              <option value="all">All types</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </label>
          <label>
            <span className="visually-hidden">Filter by category</span>
            <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
              <option value="all">All categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{categoryLabel(cat)}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <p className="empty">
          {transactions.length === 0
            ? "No transactions yet. Add one to get started."
            : "No transactions match these filters."}
        </p>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col" className="num">Amount</th>
                <th scope="col"><span className="visually-hidden">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map(t => (
                <tr key={t.id}>
                  <td className="date">{formatDate(t.date)}</td>
                  <td>{t.description}</td>
                  <td>
                    <span className="category">
                      <span className="category-dot" style={{ background: categoryColor(t.category) }} />
                      {categoryLabel(t.category)}
                    </span>
                  </td>
                  <td className={`num ${t.type === "income" ? "income-amount" : "expense-amount"}`}>
                    {t.type === "income" ? "+" : "−"}{formatMoney(t.amount)}
                  </td>
                  <td className="actions">
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(t)}
                      aria-label={`Delete ${t.description}`}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default TransactionList;
