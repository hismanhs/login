import '@salt-ds/theme/index.css';
import AppRoutes from './routes';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { withSaltDS } from '@react-monorepo/shared';

export function App() {
  return withSaltDS(
    <React.StrictMode>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </React.StrictMode>
  );
}

export default App;
