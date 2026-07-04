# Budget Tracker

A responsive budget management app built with **React.js** and **Material UI**. Track income and expenses, set category budget limits, and see your spending breakdown at a glance.

## Features
- **Dashboard**: total income, total expenses, balance, spending-by-category pie chart, budget progress bars
- **Transactions**: form to add income/expenses (description, amount, category, date), sortable history table with delete
- **Budgets**: set a monthly spending limit per category, visual progress bar with over-budget warning
- Fully responsive (mobile, tablet, desktop) via MUI's Grid/breakpoints
- Data persists in the browser via `localStorage` — no backend needed

## Tech stack
React, Material UI (MUI), Recharts (charts), uuid

## Setup
```bash
npm install
npm start
```
App runs at http://localhost:3000

## Build for production
```bash
npm run build
```

## Deploy
Push to GitHub, then deploy free on Vercel or Netlify (no environment variables needed — everything runs client-side).

## Folder structure
```
src/
  components/
    Navbar/
    SummaryCards/
    ExpenseChart/
    TransactionForm/
    TransactionList/
    BudgetForm/
    BudgetList/
  context/
    BudgetContext.js   # global state + localStorage persistence
  utils/
    helpers.js          # formatting, categories, colors
  App.js
  index.js
```
