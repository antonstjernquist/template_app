import { Client, post } from 'fivem-router/client';

const client = new Client();

client.add('/api/hello', async () => {
  return { hello: 'world' };
});

RegisterCommand(
  'app-debug',
  async () => {
    console.log('running app-debug');
    const res = await post('/debug');
    console.log(res);
  },
  false,
);
