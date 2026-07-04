import React, { useState } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar/Navbar';
import SummaryCards from './components/SummaryCards/SummaryCards';
import ExpenseChart from './components/ExpenseChart/ExpenseChart';
import TransactionForm from './components/TransactionForm/TransactionForm';
import TransactionList from './components/TransactionList/TransactionList';
import BudgetForm from './components/BudgetForm/BudgetForm';
import BudgetList from './components/BudgetList/BudgetList';
import { BudgetProvider, useBudget } from './context/BudgetContext';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#3b82f6' },
    background: { default: '#f1f5f9' },
  },
  shape: { borderRadius: 12 },
});

const Dashboard = () => {
  const { transactions } = useBudget();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <SummaryCards transactions={transactions} />
      </Grid>
      <Grid item xs={12} md={6}>
        <ExpenseChart transactions={transactions} />
      </Grid>
      <Grid item xs={12} md={6}>
        <BudgetList />
      </Grid>
    </Grid>
  );
};

const Transactions = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <TransactionForm />
    </Grid>
    <Grid item xs={12} md={8}>
      <TransactionList />
    </Grid>
  </Grid>
);

const Budgets = () => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={4}>
      <BudgetForm />
    </Grid>
    <Grid item xs={12} md={8}>
      <BudgetList />
    </Grid>
  </Grid>
);

const App = () => {
  const [tab, setTab] = useState('dashboard');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BudgetProvider>
        <Navbar tab={tab} setTab={setTab} />
        <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
          <Container maxWidth="lg">
            {tab === 'dashboard' && <Dashboard />}
            {tab === 'transactions' && <Transactions />}
            {tab === 'budgets' && <Budgets />}
          </Container>
        </Box>
      </BudgetProvider>
    </ThemeProvider>
  );
};

export default App;
