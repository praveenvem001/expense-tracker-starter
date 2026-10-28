import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from 'recharts';
import { categoryColor, categoryLabel, formatMoney } from '../lib/format';
import { spendingByCategory } from '../lib/transactions';

function CategoryChart({ transactions }) {
  const data = spendingByCategory(transactions).map(([name, value]) => ({ name, value }));

  return (
    <section className="panel chart">
      <h2>Where it went</h2>
      {data.length === 0 ? (
        <p className="empty">Spending by category shows up here once you add an expense.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * 36 + 8}>
          <BarChart data={data} layout="vertical" margin={{ top: 4, right: 64, left: 0, bottom: 4 }}>
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="name"
              width={96}
              axisLine={false}
              tickLine={false}
              tickFormatter={categoryLabel}
              tick={{ fill: "var(--ink-muted)", fontSize: 13 }}
            />
            <Tooltip
              formatter={(value) => [formatMoney(value), "Spent"]}
              labelFormatter={categoryLabel}
              cursor={{ fill: "var(--fog)" }}
              contentStyle={{ borderRadius: 8, border: "1px solid var(--line)", fontSize: 13 }}
            />
            <Bar dataKey="value" barSize={14} radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {data.map(entry => (
                <Cell key={entry.name} fill={categoryColor(entry.name)} />
              ))}
              <LabelList
                dataKey="value"
                position="right"
                formatter={formatMoney}
                style={{ fill: "var(--ink)", fontSize: 13, fontVariantNumeric: "tabular-nums" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </section>
  );
}

export default CategoryChart;
