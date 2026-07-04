# 💰 Budget Tracker

A personal finance app to track income, expenses, and monthly budgets — built with React and Material UI.

---

## ✨ Features

- **Dashboard** — At-a-glance view of total income, expenses, and current balance with a pie chart showing spending by category
- **Transactions** — Add income or expense entries with a description, amount, category, and date. Delete any entry at any time
- **Budgets** — Set monthly spending limits per category and track progress with color-coded progress bars. Get alerted when you go over budget
- **Persistent storage** — All data is saved in your browser's localStorage so nothing is lost on refresh

---

## 🖥️ App Overview

### Dashboard
Shows three summary cards (Income / Expenses / Balance), a spending breakdown pie chart, and current budget progress all in one place.

### Transactions Tab
- Toggle between **Expense** and **Income**
- Fill in description, amount, category (for expenses), and date
- View full transaction history sorted by date with colour-coded amounts
- Delete individual transactions with the trash icon

### Budgets Tab
- Pick a category and set a monthly spending limit
- Live progress bars show how much of each budget has been used
- Red bar + warning when you exceed a budget limit

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm

### Installation

```bash
# Clone the repo
git clone https://github.com/Keerthana-G-Pillai/budget-app.git
cd budget-app

# Install dependencies
npm install

# Start the development server
npm start
```

The app opens at [http://localhost:3000](http://localhost:3000).

### Build for Production

```bash
npm run build
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| Material UI 5 | Component library & styling |
| Recharts | Pie chart visualisation |
| uuid | Unique transaction IDs |
| localStorage | Client-side data persistence |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/          # Top navigation bar with tab switching
│   ├── SummaryCards/    # Income / Expense / Balance cards
│   ├── ExpenseChart/    # Pie chart of spending by category
│   ├── TransactionForm/ # Form to add income or expense
│   ├── TransactionList/ # Table of all transactions
│   ├── BudgetForm/      # Form to set a category budget limit
│   └── BudgetList/      # Progress bars for each budget
├── context/
│   └── BudgetContext.js # Global state (useReducer + localStorage)
└── utils/
    └── helpers.js       # Currency formatter, categories, colours
```

---

## 📋 Categories

Food · Transport · Housing · Utilities · Entertainment · Health · Shopping · Education · Savings · Other

---

## 📝 License

MIT
