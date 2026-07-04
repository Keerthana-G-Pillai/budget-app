import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { v4 as uuid } from 'uuid';

const BudgetContext = createContext();

const loadState = () => {
  try {
    const saved = localStorage.getItem('budget-tracker-state');
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Failed to load saved state', e);
  }
  return { transactions: [], budgets: [] };
};

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return { ...state, transactions: [action.payload, ...state.transactions] };
    case 'DELETE_TRANSACTION':
      return { ...state, transactions: state.transactions.filter((t) => t.id !== action.payload) };
    case 'ADD_BUDGET': {
      const existing = state.budgets.find((b) => b.category === action.payload.category);
      if (existing) {
        return {
          ...state,
          budgets: state.budgets.map((b) =>
            b.category === action.payload.category ? { ...b, limit: action.payload.limit } : b),
        };
      }
      return { ...state, budgets: [...state.budgets, action.payload] };
    }
    case 'DELETE_BUDGET':
      return { ...state, budgets: state.budgets.filter((b) => b.category !== action.payload) };
    default:
      return state;
  }
}

export const BudgetProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, undefined, loadState);

  useEffect(() => {
    localStorage.setItem('budget-tracker-state', JSON.stringify(state));
  }, [state]);

  const addTransaction = (transaction) => {
    dispatch({ type: 'ADD_TRANSACTION', payload: { ...transaction, id: uuid() } });
  };

  const deleteTransaction = (id) => dispatch({ type: 'DELETE_TRANSACTION', payload: id });

  const setBudget = (category, limit) => dispatch({ type: 'ADD_BUDGET', payload: { category, limit } });

  const deleteBudget = (category) => dispatch({ type: 'DELETE_BUDGET', payload: category });

  return (
    <BudgetContext.Provider
      value={{
        transactions: state.transactions,
        budgets: state.budgets,
        addTransaction,
        deleteTransaction,
        setBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
