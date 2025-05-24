import { AppProvider } from './AppProvider';
import { AppRouter } from './Router';

const App = () => {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export { App };
