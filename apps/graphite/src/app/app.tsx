import * as React from 'react';
import '@salt-ds/theme/index.css';
const AnalyticsApi = React.lazy(() => import('analyticsApi/Module'));

export function App() {
  return (
    <React.Suspense fallback={null}>
      <AnalyticsApi />
    </React.Suspense>
  );
}

export default App;
