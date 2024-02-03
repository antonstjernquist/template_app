let isFocused = false;
const exps = global.exports;

RegisterCommand(
  'mocknui',
  () => {
    console.log('Sending mock nui message');
    global.exports['npwd'].sendNPWDMessage('MOCKAPP', 'setRandomData', { test: 'test' });
  },
  false,
);
