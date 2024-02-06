import { getResourceName, isEnvBrowser } from './misc';
import defaultConfig from '../../../config.json';

export const getConfig = async <T>(): Promise<T> => {
  if (isEnvBrowser()) {
    return defaultConfig as T;
  }

  const resourceName = getResourceName();
  const config: T = await fetch(`https://cfx-nui-${resourceName}/config.json`).then((res) =>
    res.json(),
  );

  return config;
};

