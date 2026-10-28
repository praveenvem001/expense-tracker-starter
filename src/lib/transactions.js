// Total expense amount per category as [category, total] pairs, largest first
export const spendingByCategory = (transactions) => {
  const totals = {};
  for (const t of transactions) {
    if (t.type === "expense") {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    }
  }
  return Object.entries(totals).sort((a, b) => b[1] - a[1]);
};
