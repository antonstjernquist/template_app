import { App } from './packages/nui/App';
import { AppIcon } from './icon';
import { routes } from './packages/nui/routes';

interface Settings {
  language: 'en';
}

export const path = '/send_app';
export default (settings: Settings) => ({
  id: 'SEND_APP',
  path,
  routes,
  nameLocale: 'Send App',
  color: '#f4f4f4',
  backgroundColor: '#222',
  icon: AppIcon,
  app: App,
});
