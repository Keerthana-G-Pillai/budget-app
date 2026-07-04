import React from 'react';
import {
  AppBar, Toolbar, Typography, IconButton, Box,
  BottomNavigation, BottomNavigationAction, Paper,
} from '@mui/material';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export default function MobileTopBar({ page, setPage, onAddTransaction }) {
  return (
    <>
      {/* Top app bar */}
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          borderBottom: '1px solid #e2e8f0',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 30, height: 30, borderRadius: 1.5,
                bgcolor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <AccountBalanceWalletIcon sx={{ color: '#fff', fontSize: 17 }} />
            </Box>
            <Typography fontWeight={700} fontSize={16} letterSpacing={-0.2}>
              Budget Tracker
            </Typography>
          </Box>
          <IconButton
            onClick={onAddTransaction}
            sx={{
              bgcolor: '#4f46e5', color: '#fff', borderRadius: 2,
              '&:hover': { bgcolor: '#4338ca' },
            }}
          >
            <AddRoundedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Bottom navigation */}
      <Paper
        elevation={0}
        sx={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
          borderTop: '1px solid #e2e8f0',
        }}
      >
        <BottomNavigation
          value={page}
          onChange={(e, val) => setPage(val)}
          sx={{ bgcolor: '#ffffff' }}
        >
          <BottomNavigationAction
            label="Overview"
            value="overview"
            icon={<DashboardRoundedIcon />}
            sx={{ '&.Mui-selected': { color: '#4f46e5' } }}
          />
          <BottomNavigationAction
            label="Transactions"
            value="transactions"
            icon={<ReceiptLongRoundedIcon />}
            sx={{ '&.Mui-selected': { color: '#4f46e5' } }}
          />
          <BottomNavigationAction
            label="Budgets"
            value="budgets"
            icon={<AccountBalanceWalletRoundedIcon />}
            sx={{ '&.Mui-selected': { color: '#4f46e5' } }}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
