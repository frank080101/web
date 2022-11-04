import { createContext } from 'react';

export const store: any = {
  versions: [],
  metrics: [],
  cases: [],
  calculate: [],
  loading: false,
};

export const reducer = (state: any, action: { type: string; value: any }) => {
  switch (action.type) {
    case 'reset':
      return store;
    case 'versions':
      return { ...state, versions: action.value };
    case 'metrics':
      return { ...state, metrics: action.value };
    case 'cases':
      return { ...state, cases: action.value };
    case 'calculate':
      return { ...state, calculate: action.value };
    case 'loading':
      return { ...state, loading: action.value };
    default:
      return state;
  }
};

export const ChartContext = createContext(store);
