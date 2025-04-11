import * as React from 'react';
import '@salt-ds/theme/index.css';
import { Route, Routes } from 'react-router-dom';
const AnalyticsApi = React.lazy(() => import('analyticsApi/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<AnalyticsApi />} />
      </Routes>
    </React.Suspense>
  );
}

export default App;
