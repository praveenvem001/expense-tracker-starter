import { useState } from 'react'
import { categoryLabel, todayISO } from '../lib/format';

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = description.trim();
    const value = Number(amount);
    if (!text || !Number.isFinite(value) || value <= 0) return;

    onAdd({
      id: crypto.randomUUID(),
      description: text,
      amount: value,
      type,
      category,
      date: todayISO(),
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction">
      <h2>Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <fieldset className="type-toggle">
          <legend className="visually-hidden">Type</legend>
          {["expense", "income"].map(option => (
            <label key={option} className={type === option ? `is-selected is-${option}` : undefined}>
              <input
                type="radio"
                name="type"
                value={option}
                checked={type === option}
                onChange={(e) => setType(e.target.value)}
              />
              {option === "expense" ? "Expense" : "Income"}
            </label>
          ))}
        </fieldset>

        <label className="field">
          <span>Description</span>
          <input
            type="text"
            placeholder="e.g. Coffee with Sam"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Amount</span>
            <input
              type="number"
              inputMode="decimal"
              min="0.01"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </label>
          <label className="field">
            <span>Category</span>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map(cat => (
                <option key={cat} value={cat}>{categoryLabel(cat)}</option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="primary-btn">Add {type}</button>
      </form>
    </section>
  );
}

export default TransactionForm;
