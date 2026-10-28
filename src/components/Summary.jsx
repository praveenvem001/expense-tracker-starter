import { categoryColor, categoryLabel, formatMoney } from '../lib/format';
import { spendingByCategory } from '../lib/transactions';

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  // Spending per category, largest first, for the flow strip
  const spending = spendingByCategory(transactions);

  let headline;
  if (totalIncome === 0 && totalExpenses === 0) {
    headline = "Nothing tracked yet. Add your first transaction to see where your money goes.";
  } else if (balance >= 0) {
    headline = `You've kept ${formatMoney(balance)} of the ${formatMoney(totalIncome)} that came in.`;
  } else {
    headline = `You've spent ${formatMoney(-balance)} more than came in.`;
  }

  // The strip spans whichever is larger, so overspending fills it entirely
  const scale = Math.max(totalIncome, totalExpenses) || 1;
  const segments = [
    ...spending.map(([category, value]) => ({
      key: category,
      label: categoryLabel(category),
      value,
      color: categoryColor(category),
    })),
    ...(balance > 0 ? [{ key: "left-over", label: "Left over", value: balance, color: null }] : []),
  ];

  return (
    <section className="overview" aria-label="Overview">
      <p className="overview-headline">{headline}</p>

      {segments.length > 0 && (
        <div
          className="flow"
          role="img"
          aria-label={segments.map(s => `${s.label} ${formatMoney(s.value)}`).join(", ")}
        >
          {segments.map(s => (
            <span
              key={s.key}
              className={s.color ? "flow-segment" : "flow-segment flow-segment--rest"}
              style={{ flexGrow: s.value / scale, background: s.color ?? undefined }}
              title={`${s.label}: ${formatMoney(s.value)}`}
            />
          ))}
        </div>
      )}

      <dl className="totals">
        <div>
          <dt>Came in</dt>
          <dd className="income-amount">{formatMoney(totalIncome)}</dd>
        </div>
        <div>
          <dt>Went out</dt>
          <dd className="expense-amount">{formatMoney(totalExpenses)}</dd>
        </div>
        <div>
          <dt>Balance</dt>
          <dd className="balance-amount">{formatMoney(balance)}</dd>
        </div>
      </dl>
    </section>
  );
}

export default Summary;
