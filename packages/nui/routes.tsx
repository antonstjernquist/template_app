import { Home } from './views/Home';
import { History } from './views/History';
import { Send } from './views/Send';
import { App } from './App';

export const routes = [
  {
    path: '',
    Component: App,
    children: [
      {
        path: 'home',
        Component: Home,
      },
      {
        path: 'history',
        Component: History,
      },
      {
        path: 'send',
        Component: Send,
      },
    ],
  },
];
