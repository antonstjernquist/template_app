import { name } from '../../../package.json';

export const NUI_CALLBACK_REGISTER_NAME = 'nui-callback-event';
export const isDevelopment = process.env.NODE_ENV === 'development';

export const isEnvBrowser = (): boolean => !(window as any).invokeNative;
export const getResourceName = (): string => {
  /** Name from package.json */
  return name;
};

const getBaseUrl = () => {
  const shouldUseLocalhost = isDevelopment || isEnvBrowser();
  return shouldUseLocalhost ? `http://localhost:3000` : `https://${getResourceName()}`;
};

export const getEventRequestUrl = (event: string) => {
  const shouldUseLocalhost = isDevelopment || isEnvBrowser();
  return `${getBaseUrl()}${shouldUseLocalhost ? event : `/${NUI_CALLBACK_REGISTER_NAME}`}`;
};
