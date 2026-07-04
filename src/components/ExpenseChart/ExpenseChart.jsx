import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { categoryColors, formatCurrency } from '../../utils/helpers';

const ExpenseChart = ({ transactions }) => {
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, height: 380 }}>
      <Typography variant="h6" fontWeight={600} mb={1}>Spending by Category</Typography>
      {data.length === 0 ? (
        <Box display="flex" alignItems="center" justifyContent="center" height="80%">
          <Typography color="text.secondary">No expenses yet — add one to see the breakdown.</Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {data.map((entry) => (
                <Cell key={entry.name} fill={categoryColors[entry.name] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default ExpenseChart;
