import { useMemo } from 'react';
import { buildGroceryList } from './generatePlan.js';

export default function GroceryList({ plan, people = 1 }) {
  const groceries = useMemo(
    () => (plan && plan.length ? buildGroceryList(plan, people) : []),
    [plan, people]
  );

  if (groceries.length === 0) return null;

  return (
    <section className="grocery-section">
      <h2>Grocery List</h2>
      <ul className="grocery-list">
        {groceries.map((g) => (
          <li key={`${g.name}-${g.unit}`} className="grocery-item">
            <span className="grocery-name">{g.name}</span>
            <span className="grocery-qty">
              {g.unit === 'whole' ? g.qty : `${g.qty} ${g.unit}`}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}