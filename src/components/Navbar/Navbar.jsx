import React from 'react';
import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const Navbar = ({ tab, setTab }) => (
  <AppBar position="sticky" sx={{ bgcolor: '#1e293b' }}>
    <Toolbar sx={{ flexWrap: 'wrap' }}>
      <AccountBalanceWalletIcon sx={{ mr: 1 }} />
      <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
        Budget Tracker
      </Typography>
      <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          textColor="inherit"
          indicatorColor="secondary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Dashboard" value="dashboard" />
          <Tab label="Transactions" value="transactions" />
          <Tab label="Budgets" value="budgets" />
        </Tabs>
      </Box>
    </Toolbar>
  </AppBar>
);

export default Navbar;
