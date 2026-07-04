import React, { useState } from 'react';
import {
  Box, Paper, Typography, Stack, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, IconButton, Chip, TextField,
  MenuItem, InputAdornment,
} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useBudget } from '../../context/BudgetContext';
import { formatCurrency, categoryColors, categoryIcons, categories } from '../../utils/helpers';

const ALL = 'All';
const filterTypes = [ALL, 'Income', 'Expense'];

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useBudget();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState(ALL);
  const [catFilter, setCatFilter] = useState(ALL);

  const filtered = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((t) => {
      const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
      const matchType   = typeFilter === ALL || t.type === typeFilter.toLowerCase();
      const matchCat    = catFilter === ALL || t.category === catFilter;
      return matchSearch && matchType && matchCat;
    });

  return (
    <Box>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700} color="text.primary">Transactions</Typography>
          <Typography variant="body2" color="text.secondary">
            {transactions.length} total · {transactions.filter((t) => t.type === 'income').length} income · {transactions.filter((t) => t.type === 'expense').length} expenses
          </Typography>
        </Box>
      </Stack>

      {/* Filters */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} mb={2}>
        <TextField
          placeholder="Search transactions…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          sx={{ flex: 2, bgcolor: '#fff', borderRadius: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" sx={{ color: '#94a3b8' }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          size="small"
          sx={{ flex: 1, bgcolor: '#fff', borderRadius: 2 }}
          label="Type"
        >
          {filterTypes.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
        </TextField>
        <TextField
          select
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
          size="small"
          sx={{ flex: 1, bgcolor: '#fff', borderRadius: 2 }}
          label="Category"
        >
          {[ALL, ...categories].map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
        </TextField>
      </Stack>

      {/* Table */}
      <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        {filtered.length === 0 ? (
          <Stack alignItems="center" justifyContent="center" spacing={1.5} py={8}>
            <Typography fontSize={38}>🔍</Typography>
            <Typography variant="body1" fontWeight={600} color="text.primary">
              {transactions.length === 0 ? 'No transactions yet' : 'No results found'}
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              {transactions.length === 0
                ? 'Use the "Add Transaction" button to log your first entry.'
                : 'Try adjusting your search or filters.'}
            </Typography>
            {transactions.length === 0 && (
              <Typography variant="body2" color="text.secondary">
                Balance: <strong>{formatCurrency(0)}</strong>
              </Typography>
            )}
          </Stack>
        ) : (
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: '#f8fafc' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Description
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Date
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: '#64748b', fontSize: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    Amount
                  </TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.map((t) => {
                  const isIncome = t.type === 'income';
                  const icon = categoryIcons[t.category] || '📌';
                  const color = categoryColors[t.category] || '#94a3b8';
                  return (
                    <TableRow
                      key={t.id}
                      hover
                      sx={{ '&:last-child td': { border: 0 } }}
                    >
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1.5}>
                          <Box
                            sx={{
                              width: 36, height: 36, borderRadius: 2,
                              bgcolor: isIncome ? '#dcfce7' : `${color}18`,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 16, flexShrink: 0,
                            }}
                          >
                            {icon}
                          </Box>
                          <Typography variant="body2" fontWeight={600}>{t.description}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={t.category}
                          size="small"
                          sx={{
                            bgcolor: isIncome ? '#dcfce7' : `${color}20`,
                            color: isIncome ? '#16a34a' : color,
                            fontWeight: 600,
                            fontSize: 12,
                            border: 'none',
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">{t.date}</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography
                          variant="body2"
                          fontWeight={700}
                          color={isIncome ? '#16a34a' : '#dc2626'}
                        >
                          {isIncome ? '+' : '-'}{formatCurrency(t.amount)}
                        </Typography>
                      </TableCell>
                      <TableCell align="right" sx={{ width: 48 }}>
                        <IconButton
                          size="small"
                          onClick={() => deleteTransaction(t.id)}
                          sx={{
                            color: '#94a3b8',
                            '&:hover': { color: '#dc2626', bgcolor: '#fee2e2' },
                            borderRadius: 1.5,
                          }}
                        >
                          <DeleteRoundedIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}
