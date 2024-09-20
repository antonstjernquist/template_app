import { i18n } from 'i18next';
import React, { useEffect } from 'react';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

interface AppProps {
  theme: unknown;
  i18n: i18n;
  settings: any;
}

const queryClient = new QueryClient();

export function App({ settings, theme, i18n }: AppProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === '/apps/send_app') {
      navigate('./home', { replace: true });
    }
  }, [pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-full bg-slate-800 text-gray-200 p-6 flex flex-col">
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
