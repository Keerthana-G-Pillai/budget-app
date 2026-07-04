import React, { useState } from 'react';
import { Paper, Typography, TextField, MenuItem, Button, Stack, Alert } from '@mui/material';
import { useBudget } from '../../context/BudgetContext';
import { categories } from '../../utils/helpers';

const BudgetForm = () => {
  const { setBudget } = useBudget();
  const [category, setCategory] = useState('Food');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!limit || Number(limit) <= 0) return setError('Please enter a limit greater than 0.');

    setBudget(category, Number(limit));
    setSuccess(`Budget for ${category} set to ${limit}.`);
    setLimit('');
  };

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>Set a Budget Limit</Typography>

      <Stack component="form" spacing={2} onSubmit={handleSubmit}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

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

        <TextField
          label="Monthly Limit"
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          inputProps={{ min: 0, step: '0.01' }}
          fullWidth
        />

        <Button type="submit" variant="contained" size="large">Save Budget</Button>
      </Stack>
    </Paper>
  );
};

export default BudgetForm;
