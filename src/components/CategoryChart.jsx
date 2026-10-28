import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ["#4f8cff", "#00c49f", "#ffbb28", "#ff8042", "#a259ff", "#ff6b9d", "#2dd4bf"];

function CategoryChart({ transactions }) {
  // Aggregate expense amounts by category
  const byCategory = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const data = Object.entries(byCategory).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="chart">
        <h2>Spending by Category</h2>
        <p className="chart-empty">No expenses to chart yet.</p>
      </div>
    );
  }

  return (
    <div className="chart">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => `$${value}`} cursor={{ fill: "rgba(0,0,0,0.05)" }} />
          <Bar dataKey="value" name="Spending">
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;
