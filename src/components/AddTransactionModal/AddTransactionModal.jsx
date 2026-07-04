import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Button, Stack, ToggleButton,
  ToggleButtonGroup, Alert, IconButton, Typography,
} from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useBudget } from '../../context/BudgetContext';
import { categories } from '../../utils/helpers';

const defaultState = () => ({
  type: 'expense',
  description: '',
  amount: '',
  category: 'Food',
  date: new Date().toISOString().slice(0, 10),
  error: '',
});

export default function AddTransactionModal({ open, onClose }) {
  const { addTransaction } = useBudget();
  const [form, setForm] = useState(defaultState());

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = () => {
    if (!form.description.trim()) {
      return setForm((f) => ({ ...f, error: 'Please enter a description.' }));
    }
    if (!form.amount || Number(form.amount) <= 0) {
      return setForm((f) => ({ ...f, error: 'Please enter an amount greater than 0.' }));
    }
    addTransaction({
      type: form.type,
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.type === 'income' ? 'Income' : form.category,
      date: form.date,
    });
    handleClose();
  };

  const handleClose = () => {
    setForm(defaultState());
    onClose();
  };

  const isIncome = form.type === 'income';

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ pb: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography fontWeight={700} fontSize={18}>Add Transaction</Typography>
        <IconButton size="small" onClick={handleClose}>
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={2.5}>
          {/* Type toggle */}
          <ToggleButtonGroup
            value={form.type}
            exclusive
            onChange={(e, val) => val && setForm((f) => ({ ...f, type: val, error: '' }))}
            fullWidth
            size="small"
          >
            <ToggleButton
              value="expense"
              sx={{
                borderRadius: '8px !important',
                fontWeight: 600,
                '&.Mui-selected': { bgcolor: '#fee2e2', color: '#dc2626', borderColor: '#fca5a5' },
              }}
            >
              Expense
            </ToggleButton>
            <ToggleButton
              value="income"
              sx={{
                borderRadius: '8px !important',
                fontWeight: 600,
                '&.Mui-selected': { bgcolor: '#dcfce7', color: '#16a34a', borderColor: '#86efac' },
              }}
            >
              Income
            </ToggleButton>
          </ToggleButtonGroup>

          {form.error && <Alert severity="error" sx={{ borderRadius: 2 }}>{form.error}</Alert>}

          <TextField
            label="Description"
            value={form.description}
            onChange={set('description')}
            placeholder={isIncome ? 'e.g. Salary, Freelance' : 'e.g. Groceries, Netflix'}
            fullWidth
            size="small"
            autoFocus
          />

          <TextField
            label="Amount ($)"
            type="number"
            value={form.amount}
            onChange={set('amount')}
            inputProps={{ min: 0, step: '0.01' }}
            fullWidth
            size="small"
          />

          {!isIncome && (
            <TextField
              select
              label="Category"
              value={form.category}
              onChange={set('category')}
              fullWidth
              size="small"
            >
              {categories.map((c) => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
              ))}
            </TextField>
          )}

          <TextField
            label="Date"
            type="date"
            value={form.date}
            onChange={set('date')}
            InputLabelProps={{ shrink: true }}
            fullWidth
            size="small"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3, pt: 1 }}>
        <Button onClick={handleClose} variant="outlined" sx={{ borderRadius: 2, flex: 1 }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{
            borderRadius: 2,
            flex: 1,
            bgcolor: isIncome ? '#16a34a' : '#4f46e5',
            '&:hover': { bgcolor: isIncome ? '#15803d' : '#4338ca' },
          }}
        >
          Add {isIncome ? 'Income' : 'Expense'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
