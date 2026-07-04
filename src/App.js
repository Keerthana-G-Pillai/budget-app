import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BudgetProvider } from './context/BudgetContext';
import Sidebar from './components/Sidebar/Sidebar';
import MobileTopBar from './components/MobileTopBar/MobileTopBar';
import AddTransactionModal from './components/AddTransactionModal/AddTransactionModal';
import OverviewPage from './components/OverviewPage/OverviewPage';
import TransactionsPage from './components/TransactionsPage/TransactionsPage';
import BudgetsPage from './components/BudgetsPage/BudgetsPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#4f46e5' },       // indigo
    success: { main: '#16a34a' },
    error:   { main: '#dc2626' },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    text: {
      primary: '#0f172a',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
      },
    },
  },
});

const SIDEBAR_WIDTH = 240;

export default function App() {
  const [page, setPage] = useState('overview');
  const [modalOpen, setModalOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BudgetProvider>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>

          {/* ── Persistent left sidebar (desktop) ── */}
          {!isMobile && (
            <Sidebar
              page={page}
              setPage={setPage}
              onAddTransaction={() => setModalOpen(true)}
              width={SIDEBAR_WIDTH}
            />
          )}

          {/* ── Main content area ── */}
          <Box
            component="main"
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              minWidth: 0,
              ml: isMobile ? 0 : `${SIDEBAR_WIDTH}px`,
            }}
          >
            {/* Mobile top bar */}
            {isMobile && (
              <MobileTopBar
                page={page}
                setPage={setPage}
                onAddTransaction={() => setModalOpen(true)}
              />
            )}

            {/* Page content */}
            <Box sx={{ p: { xs: 2, sm: 3 }, flex: 1 }}>
              {page === 'overview'      && <OverviewPage onAddTransaction={() => setModalOpen(true)} />}
              {page === 'transactions'  && <TransactionsPage />}
              {page === 'budgets'       && <BudgetsPage />}
            </Box>
          </Box>

          {/* ── Global Add Transaction modal ── */}
          <AddTransactionModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Box>
      </BudgetProvider>
    </ThemeProvider>
  );
}
