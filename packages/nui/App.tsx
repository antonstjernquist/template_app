import React from 'react';
import './index.css';
import { i18n } from 'i18next';

interface AppProps {
  theme: unknown;
  i18n: i18n;
  settings: any;
}

export function App(props: AppProps) {
  return (
    <div className="flex-1 text-white p-4 bg-gray-800">
      <div className="flex flex-col">
        <span className="text-2xl">Template app</span>
        <span className="text-sm">Do whatever</span>
      </div>
    </div>
  );
}

export default function WithProviders(props: AppProps) {
  return <App {...props} />;
}
