import { Client } from 'fivem-router/client';
import { listeners } from '../shared/constants';

/**
 * This is not best practice. This is just a simple example.
 * The listeners should be moved to a shared file.
 */
const client = new Client({
  listeners,
});

client.add('/api/hello', async () => {
  return { hello: 'world' };
});

/** Server listener */
// TODO: This should probably be moved into `fivem-router` as a default listener.
onNet('APP_TEMPLATE_BROADCAST_LISTENER', (data: { data: unknown; event: string }) => {
  global.SendNUIMessage({ type: 'APP_TEMPLATE_NUI_LISTENER', payload: data });
});

RegisterCommand(
  'app-debug',
  async () => {
    console.log('running app-debug');
    const res = await client.post('/debug');
    console.log(res);
  },
  false,
);
