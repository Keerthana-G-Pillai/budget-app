import React, { useState } from 'react';
import {
  Box, Grid, Paper, Typography, Stack, TextField, MenuItem,
  Button, Alert, LinearProgress, IconButton, Chip, Divider,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, categories, categoryColors, categoryIcons } from '../../utils/helpers';

function BudgetSetForm() {
  const { setBudget } = useBudget();
  const [category, setCategory] = useState('Food');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!limit || Number(limit) <= 0) return setError('Please enter a limit greater than $0.');
    setBudget(category, Number(limit));
    setSuccess(`Budget for ${category} set to ${formatCurrency(Number(limit))}.`);
    setLimit('');
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
      <Typography variant="subtitle1" fontWeight={700} mb={0.5}>Set a Budget Limit</Typography>
      <Typography variant="body2" color="text.secondary" mb={2.5}>
        Assign a monthly spending cap to any category.
      </Typography>

      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        {error   && <Alert severity="error"   sx={{ borderRadius: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ borderRadius: 2 }}>{success}</Alert>}

        <TextField
          select
          label="Category"
          value={category}
          onChange={(e) => { setCategory(e.target.value); setSuccess(''); }}
          fullWidth
          size="small"
        >
          {categories.map((c) => (
            <MenuItem key={c} value={c}>
              {categoryIcons[c]} &nbsp; {c}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Monthly Limit ($)"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          inputProps={{ min: 0, step: '0.01' }}
          fullWidth
          size="small"
          placeholder="e.g. 500"
        />

        <Button type="submit" variant="contained" size="medium"
          sx={{ borderRadius: 2, bgcolor: '#4f46e5', '&:hover': { bgcolor: '#4338ca' } }}
        >
          Save Budget
        </Button>
      </Stack>
    </Paper>
  );
}

function BudgetCard({ budget, spent }) {
  const { deleteBudget } = useBudget();
  const pct  = Math.min((spent / budget.limit) * 100, 100);
  const over = spent > budget.limit;
  const remaining = budget.limit - spent;
  const color = categoryColors[budget.category] || '#94a3b8';
  const icon  = categoryIcons[budget.category] || '📌';

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
        <Stack direction="row" alignItems="center" gap={1.2}>
          <Box
            sx={{
              width: 36, height: 36, borderRadius: 2,
              bgcolor: `${color}18`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, flexShrink: 0,
            }}
          >
            {icon}
          </Box>
          <Box>
            <Typography variant="body2" fontWeight={700}>{budget.category}</Typography>
            <Typography variant="caption" color="text.secondary">
              {formatCurrency(spent)} spent of {formatCurrency(budget.limit)}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" alignItems="center" gap={0.5}>
          {over ? (
            <Chip
              icon={<WarningRoundedIcon sx={{ fontSize: 14 }} />}
              label={`+${formatCurrency(spent - budget.limit)} over`}
              size="small"
              sx={{ bgcolor: '#fee2e2', color: '#dc2626', fontWeight: 600, '& .MuiChip-icon': { color: '#dc2626' } }}
            />
          ) : (
            <Chip
              icon={<CheckCircleRoundedIcon sx={{ fontSize: 14 }} />}
              label={`${formatCurrency(remaining)} left`}
              size="small"
              sx={{ bgcolor: '#f0fdf4', color: '#16a34a', fontWeight: 600, '& .MuiChip-icon': { color: '#16a34a' } }}
            />
          )}
          <IconButton
            size="small"
            onClick={() => deleteBudget(budget.category)}
            sx={{
              color: '#94a3b8', borderRadius: 1.5,
              '&:hover': { color: '#dc2626', bgcolor: '#fee2e2' },
            }}
          >
            <DeleteRoundedIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={pct}
        sx={{
          height: 8, borderRadius: 4,
          bgcolor: '#f1f5f9',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            bgcolor: over ? '#dc2626' : color,
          },
        }}
      />
    </Box>
  );
}

export default function BudgetsPage() {
  const { budgets, transactions } = useBudget();

  const spentByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  return (
    <Box>
      {/* Header */}
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700} color="text.primary">Budgets</Typography>
        <Typography variant="body2" color="text.secondary">
          {budgets.length === 0
            ? 'No budgets set yet — add one to start tracking limits.'
            : `Tracking ${budgets.length} categor${budgets.length === 1 ? 'y' : 'ies'}`}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Left: form */}
        <Grid item xs={12} md={4}>
          <BudgetSetForm />
        </Grid>

        {/* Right: budget cards */}
        <Grid item xs={12} md={8}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0' }}>
            <Typography variant="subtitle1" fontWeight={700} mb={2}>Budget Progress</Typography>

            {budgets.length === 0 ? (
              <Stack alignItems="center" justifyContent="center" spacing={1.5} py={6}>
                <Typography fontSize={36}>🎯</Typography>
                <Typography variant="body1" fontWeight={600} color="text.primary">No budgets yet</Typography>
                <Typography variant="body2" color="text.secondary" textAlign="center">
                  Set your first budget limit using the form.<br />
                  Current spending: <strong>{formatCurrency(0)}</strong>
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={2.5} divider={<Divider />}>
                {budgets.map((b) => (
                  <BudgetCard
                    key={b.category}
                    budget={b}
                    spent={spentByCategory[b.category] || 0}
                  />
                ))}
              </Stack>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
