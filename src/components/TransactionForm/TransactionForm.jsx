import React, { useState } from 'react';
import {
  Paper, Typography, TextField, MenuItem, Button, Stack, ToggleButton, ToggleButtonGroup, Alert,
} from '@mui/material';
import { useBudget } from '../../context/BudgetContext';
import { categories } from '../../utils/helpers';

const TransactionForm = () => {
  const { addTransaction } = useBudget();
  const [type, setType] = useState('expense');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!description.trim()) return setError('Please enter a description.');
    if (!amount || Number(amount) <= 0) return setError('Please enter an amount greater than 0.');

    addTransaction({
      type,
      description: description.trim(),
      amount: Number(amount),
      category: type === 'income' ? 'Income' : category,
      date,
    });

    setDescription('');
    setAmount('');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>Add Transaction</Typography>

      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        <ToggleButtonGroup
          value={type}
          exclusive
          onChange={(e, val) => val && setType(val)}
          fullWidth
        >
          <ToggleButton value="expense" color="error">Expense</ToggleButton>
          <ToggleButton value="income" color="success">Income</ToggleButton>
        </ToggleButtonGroup>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          inputProps={{ min: 0, step: '0.01' }}
          fullWidth
        />

        {type === 'expense' && (
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
          >
            {categories.map((c) => (
              <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />

        <Button type="submit" variant="contained" size="large">
          Add {type === 'income' ? 'Income' : 'Expense'}
        </Button>
      </Stack>
    </Paper>
  );
};

export default TransactionForm;
