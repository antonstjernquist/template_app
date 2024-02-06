import { ResourceConfig } from '../../shared/config';
import config from '../../../config.json';

export const isRunningInGame = () => {
  return typeof RegisterCommand !== 'undefined';
};

export const getServerConfig = (): ResourceConfig => {
  if (!isRunningInGame()) {
    return config;
  }

  try {
    const conf = JSON.parse(LoadResourceFile(GetCurrentResourceName(), 'config.json'));
    return conf;
  } catch (error) {
    console.error(error);
    console.error(
      'Could not load config.json from the server! Falling back to default config. Error above^',
    );
    console.error(
      'Make sure you have a config.json file in your server folder and that it is valid JSON. You can use https://jsonlint.com/ to validate your JSON.',
    );
    return config;
  }
};
