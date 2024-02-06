import App from './packages/nui/App';
import { AppIcon } from './icon';

interface Settings {
  language: 'en';
}

export const path = '/send_app';
export default (settings: Settings) => ({
  id: 'SEND_APP',
  path,
  nameLocale: 'Send App',
  color: '#f4f4f4',
  backgroundColor: '#222',
  icon: AppIcon,
  app: App,
});
