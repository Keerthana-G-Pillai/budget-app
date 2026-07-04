import React from 'react';
import {
  Paper, Typography, Box, LinearProgress, IconButton, Stack,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, categoryColors } from '../../utils/helpers';

const BudgetList = () => {
  const { budgets, transactions, deleteBudget } = useBudget();

  const spentByCategory = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount);
      return acc;
    }, {});

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>Budget Progress</Typography>

      {budgets.length === 0 ? (
        <Typography color="text.secondary">No budgets set yet. Use the form to set a monthly limit per category.</Typography>
      ) : (
        <Stack spacing={2.5}>
          {budgets.map((b) => {
            const spent = spentByCategory[b.category] || 0;
            const pct = Math.min((spent / b.limit) * 100, 100);
            const over = spent > b.limit;

            return (
              <Box key={b.category}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={0.5}>
                  <Typography fontWeight={600}>{b.category}</Typography>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Typography variant="body2" color={over ? 'error' : 'text.secondary'}>
                      {formatCurrency(spent)} / {formatCurrency(b.limit)}
                    </Typography>
                    <IconButton size="small" onClick={() => deleteBudget(b.category)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={pct}
                  color={over ? 'error' : 'primary'}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    bgcolor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': { bgcolor: over ? '#ef4444' : categoryColors[b.category] },
                  }}
                />
                {over && (
                  <Typography variant="caption" color="error">
                    Over budget by {formatCurrency(spent - b.limit)}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Stack>
      )}
    </Paper>
  );
};

export default BudgetList;
