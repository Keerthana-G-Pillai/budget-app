import React from 'react';
import {
  Paper, Typography, Table, TableHead, TableBody, TableRow, TableCell,
  TableContainer, IconButton, Chip, Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, categoryColors } from '../../utils/helpers';

const TransactionList = () => {
  const { transactions, deleteTransaction } = useBudget();

  const sorted = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>Transaction History</Typography>

      {sorted.length === 0 ? (
        <Typography color="text.secondary">No transactions yet. Add your first one using the form.</Typography>
      ) : (
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Category</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sorted.map((t) => (
                <TableRow key={t.id} hover>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.description}</TableCell>
                  <TableCell>
                    <Chip
                      label={t.category}
                      size="small"
                      sx={{ bgcolor: categoryColors[t.category] || '#94a3b8', color: '#fff' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box component="span" sx={{ color: t.type === 'income' ? '#22c55e' : '#ef4444', fontWeight: 600 }}>
                      {t.type === 'income' ? '+' : '-'}{formatCurrency(t.amount)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => deleteTransaction(t.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  );
};

export default TransactionList;
