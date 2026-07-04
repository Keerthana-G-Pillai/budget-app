export const formatCurrency = (value) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0);

export const categories = [
  'Food', 'Transport', 'Housing', 'Utilities', 'Entertainment',
  'Health', 'Shopping', 'Education', 'Savings', 'Other',
];

export const categoryColors = {
  Food: '#f97316',
  Transport: '#3b82f6',
  Housing: '#8b5cf6',
  Utilities: '#06b6d4',
  Entertainment: '#ec4899',
  Health: '#22c55e',
  Shopping: '#eab308',
  Education: '#14b8a6',
  Savings: '#6366f1',
  Other: '#94a3b8',
};
