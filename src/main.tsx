import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ThemeContextProvider} from './contexts/theme';
import { PlayerContextProvider } from './contexts/player';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const client = new QueryClient()
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
      <ThemeContextProvider>
        <PlayerContextProvider>
          <QueryClientProvider client={client} >
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </PlayerContextProvider>
      </ThemeContextProvider>
  </StrictMode>
);
