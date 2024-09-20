import packageJson from '../../package.json';
const prefix = packageJson.name;

export const listeners = {
  broadcast: `${prefix}_BROADCAST_LISTENER`,
  client: `${prefix}_CLIENT_LISTENER`,
  server: `${prefix}_SERVER_LISTENER`,
  nui: `${prefix}_NUI_LISTENER`,
};
