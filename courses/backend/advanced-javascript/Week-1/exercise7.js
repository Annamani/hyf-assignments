// Exercise 7: Count by Type (Optional)
import {teas as data } from "../data/teas.js";
const countByType = data.reduce((counts, tea) => {
  counts[tea.type] = (counts[tea.type] || 0) + 1;
  return counts;
}, {});

console.log(countByType); // Expected: { green: 6, black: 6, herbal: 4, oolong: 2, white: 2 }