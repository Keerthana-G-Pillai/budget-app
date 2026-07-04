import React from 'react';
import {
  Grid, Paper, Typography, Stack, Box, Chip, Divider,
} from '@mui/material';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import AccountBalanceRoundedIcon from '@mui/icons-material/AccountBalanceRounded';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, categoryColors, categoryIcons } from '../../utils/helpers';

// ── Summary card ──────────────────────────────────────────
function SummaryCard({ title, value, icon, color, sub }) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        borderRadius: 3,
        border: '1px solid #e2e8f0',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* colored top stripe */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, bgcolor: color, borderRadius: '12px 12px 0 0' }} />
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight={500} mb={0.5}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            {formatCurrency(value)}
          </Typography>
          {sub && (
            <Typography variant="caption" color="text.secondary" mt={0.5} display="block">
              {sub}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: 44, height: 44, borderRadius: 2.5,
            bgcolor: `${color}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color,
          }}
        >
          {icon}
        </Box>
      </Stack>
    </Paper>
  );
}

// ── Recent activity row ───────────────────────────────────
function ActivityRow({ transaction }) {
  const isIncome = transaction.type === 'income';
  const icon = categoryIcons[transaction.category] || '📌';
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 1.2 }}
    >
      <Stack direction="row" alignItems="center" gap={1.5}>
        <Box
          sx={{
            width: 38, height: 38, borderRadius: 2,
            bgcolor: isIncome ? '#dcfce7' : `${categoryColors[transaction.category] || '#94a3b8'}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, flexShrink: 0,
          }}
        >
          {icon}
        </Box>
        <Box>
          <Typography variant="body2" fontWeight={600} color="text.primary" noWrap sx={{ maxWidth: 160 }}>
            {transaction.description}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {transaction.category} · {transaction.date}
          </Typography>
        </Box>
      </Stack>
      <Typography
        variant="body2"
        fontWeight={700}
        color={isIncome ? '#16a34a' : '#dc2626'}
        sx={{ flexShrink: 0, ml: 1 }}
      >
        {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
      </Typography>
    </Stack>
  );
}

// ── Pie chart panel ───────────────────────────────────────
function SpendingChart({ transactions }) {
  const expensesByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});
  const data = Object.entries(expensesByCategory).map(([name, value]) => ({ name, value }));

  return (
    <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
      <Typography variant="subtitle1" fontWeight={700} mb={2}>Spending by Category</Typography>
      {data.length === 0 ? (
        <Stack alignItems="center" justifyContent="center" height={200} spacing={1}>
          <Typography fontSize={32}>📊</Typography>
          <Typography variant="body2" color="text.secondary" textAlign="center">
            No expenses recorded yet.<br />Add a transaction to see your breakdown.
          </Typography>
        </Stack>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={95}
              paddingAngle={3}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={categoryColors[entry.name] || '#94a3b8'} />
              ))}
            </Pie>
            <Tooltip formatter={(v) => formatCurrency(v)} />
            <Legend iconType="circle" iconSize={10} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function OverviewPage({ onAddTransaction }) {
  const { transactions } = useBudget();

  const income  = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + Number(t.amount), 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expense;
  const recent  = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

  return (
    <Box>
      {/* Page header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Overview</Typography>
          <Typography variant="body2" color="text.secondary">Your financial snapshot</Typography>
        </Box>
      </Stack>

      {/* Summary cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            title="Total Income"
            value={income}
            color="#16a34a"
            icon={<TrendingUpRoundedIcon />}
            sub={transactions.filter((t) => t.type === 'income').length + ' entries'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            title="Total Expenses"
            value={expense}
            color="#dc2626"
            icon={<TrendingDownRoundedIcon />}
            sub={transactions.filter((t) => t.type === 'expense').length + ' entries'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <SummaryCard
            title="Balance"
            value={balance}
            color={balance >= 0 ? '#4f46e5' : '#dc2626'}
            icon={<AccountBalanceRoundedIcon />}
            sub={balance >= 0 ? 'You\'re on track' : 'Overspending'}
          />
        </Grid>
      </Grid>

      {/* Chart + Recent activity */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <SpendingChart transactions={transactions} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e2e8f0', height: '100%' }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1.5}>
              <Typography variant="subtitle1" fontWeight={700}>Recent Activity</Typography>
              {recent.length > 0 && (
                <Chip label={`${recent.length} shown`} size="small" sx={{ bgcolor: '#eef2ff', color: '#4f46e5', fontWeight: 600 }} />
              )}
            </Stack>

            {recent.length === 0 ? (
              <Stack alignItems="center" justifyContent="center" spacing={1.5} sx={{ py: 5 }}>
                <Typography fontSize={36}>💸</Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  No transactions yet.<br />
                  <Box component="span" color="#4f46e5" sx={{ cursor: 'pointer', fontWeight: 600 }} onClick={onAddTransaction}>
                    Add your first one →
                  </Box>
                </Typography>
              </Stack>
            ) : (
              <Stack divider={<Divider />}>
                {recent.map((t) => (
                  <ActivityRow key={t.id} transaction={t} />
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
