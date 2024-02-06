import { i18n } from 'i18next';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import { History } from './views/History';
import { Home } from './views/Home';
import { Send } from './views/Send';
import { QueryClient, QueryClientProvider } from 'react-query';

interface AppProps {
  theme: unknown;
  i18n: i18n;
  settings: any;
}

const queryClient = new QueryClient();

export function App({ settings, theme, i18n }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full bg-slate-800 text-gray-200 p-6 flex flex-col">
        <HashRouter basename="/send_app">
          <Switch>
            <Route path="/history" component={History} />
            <Route path="/send" component={Send} />
            <Route path="/" component={Home} />
          </Switch>
        </HashRouter>
      </div>
    </QueryClientProvider>
  );
}

export default function WithProviders(props: AppProps) {
  return <App {...props} />;
}
