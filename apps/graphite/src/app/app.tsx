import * as React from 'react';
import '@salt-ds/theme/index.css';
import { Link, Route, Routes } from 'react-router-dom';
const AnalyticsApi = React.lazy(() => import('analyticsApi/Module'));
// const ReferenceData = React.lazy(() => import('referenceData/Module'));

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
