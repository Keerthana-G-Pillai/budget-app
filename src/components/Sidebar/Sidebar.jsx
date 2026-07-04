import React from 'react';
import {
  Box, Typography, List, ListItemButton, ListItemIcon,
  ListItemText, Button, Divider,
} from '@mui/material';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded';
import AccountBalanceWalletRoundedIcon from '@mui/icons-material/AccountBalanceWalletRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const navItems = [
  { label: 'Overview',     value: 'overview',      icon: <DashboardRoundedIcon /> },
  { label: 'Transactions', value: 'transactions',   icon: <ReceiptLongRoundedIcon /> },
  { label: 'Budgets',      value: 'budgets',        icon: <AccountBalanceWalletRoundedIcon /> },
];

export default function Sidebar({ page, setPage, onAddTransaction, width }) {
  return (
    <Box
      sx={{
        width,
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        bgcolor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 100,
      }}
    >
      {/* Logo / brand */}
      <Box sx={{ px: 3, py: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 36, height: 36, borderRadius: 2,
            bgcolor: '#4f46e5', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <AccountBalanceWalletRoundedIcon sx={{ color: '#fff', fontSize: 20 }} />
        </Box>
        <Typography fontWeight={700} fontSize={17} color="text.primary" letterSpacing={-0.3}>
          Budget Tracker
        </Typography>
      </Box>

      <Divider sx={{ mx: 2 }} />

      {/* Add transaction CTA */}
      <Box sx={{ px: 2, pt: 2.5, pb: 1 }}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddRoundedIcon />}
          onClick={onAddTransaction}
          sx={{
            borderRadius: 2.5,
            py: 1.2,
            bgcolor: '#4f46e5',
            boxShadow: '0 4px 14px rgba(79,70,229,0.35)',
            '&:hover': { bgcolor: '#4338ca', boxShadow: '0 4px 18px rgba(79,70,229,0.45)' },
          }}
        >
          Add Transaction
        </Button>
      </Box>

      {/* Nav links */}
      <List sx={{ px: 1.5, pt: 1, flex: 1 }}>
        {navItems.map(({ label, value, icon }) => {
          const active = page === value;
          return (
            <ListItemButton
              key={value}
              onClick={() => setPage(value)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                px: 2,
                py: 1.1,
                bgcolor: active ? '#eef2ff' : 'transparent',
                color: active ? '#4f46e5' : '#64748b',
                '&:hover': { bgcolor: active ? '#eef2ff' : '#f8fafc' },
                transition: 'background 0.15s',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: active ? '#4f46e5' : '#94a3b8',
                }}
              >
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                }}
              />
              {active && (
                <Box
                  sx={{
                    width: 4, height: 20, borderRadius: 2,
                    bgcolor: '#4f46e5', ml: 1,
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      {/* Footer */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="caption" color="text.secondary">
          Data stored locally in your browser.
        </Typography>
      </Box>
    </Box>
  );
}
