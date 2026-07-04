import React from 'react';
import { Grid, Paper, Typography, Stack } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { formatCurrency } from '../../utils/helpers';

const Card = ({ title, value, icon, color }) => (
  <Paper elevation={2} sx={{ p: 3, borderRadius: 3, borderLeft: `5px solid ${color}`, height: '100%' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <div>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h5" fontWeight={700}>{formatCurrency(value)}</Typography>
      </div>
      <div style={{ color }}>{icon}</div>
    </Stack>
  </Paper>
);

const SummaryCards = ({ transactions }) => {
  const income = transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + Number(t.amount), 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + Number(t.amount), 0);
  const balance = income - expense;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Card title="Total Income" value={income} icon={<TrendingUpIcon fontSize="large" />} color="#22c55e" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card title="Total Expenses" value={expense} icon={<TrendingDownIcon fontSize="large" />} color="#ef4444" />
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card title="Balance" value={balance} icon={<AccountBalanceIcon fontSize="large" />} color={balance >= 0 ? '#3b82f6' : '#ef4444'} />
      </Grid>
    </Grid>
  );
};

export default SummaryCards;
