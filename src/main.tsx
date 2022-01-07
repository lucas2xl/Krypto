import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { App } from './App';
import { TransactionsProvider } from './context/TransactionsContext';

ReactDOM.render(
  <TransactionsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </TransactionsProvider>,
  document.getElementById('root'),
);
