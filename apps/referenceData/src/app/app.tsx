import { withSaltDS } from '@react-monorepo/shared';

export function App() {
  return <>{withSaltDS(<h1>Reference Data Page</h1>)}</>;
}

export default App;
