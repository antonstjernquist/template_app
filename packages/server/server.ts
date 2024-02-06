import { App, Router } from 'fivem-router/server';
import { identifierMiddleware } from './middlewares/identifierMiddleware';
import { loadUser } from './data';
import { z } from 'zod';
import { getServerConfig, isRunningInGame } from './utils/config';
import { getErrorMessage } from './utils/errors';
import { Framework } from '@garmingo/framework-js-server';
import { HistoryItem, NPWDUser } from '../shared/Types';

const app = new App(false);
const baseRouter = new Router({});

if (!isRunningInGame()) {
  global.LoadResourceFile = () => {
    return JSON.stringify({});
  };

  global.GetCurrentResourceName = () => {
    return 'server';
  };

  global.exports = {
    npwd: {
      getPlayerData: async (options: any) => {
        console.log('Fetching user', options);
        return {
          source: 1,
          name: 'Test User' + (options.source ? ' 1' : ' 2'),
          phoneNumber: options.source ? '123456789' : '987654321',
        };
      },
    },
  };
}

// Load some debug user.
loadUser(1);

// Add middleware to all routes
app.use(identifierMiddleware);

const config = getServerConfig();
const { translations } = config;
const sendMoneySchema = z.object({
  recipient: z.string(),
  amount: z.number().min(config.limits.minAmount).max(config.limits.maxAmount),
});

baseRouter.add('/debug', async (ctx, next) => {
  console.log('Debugging from server');
  ctx.body = {
    ok: true,
    message: 'Hello from server!',
  };
  await next();
});

const history: HistoryItem[] = [];
baseRouter.add('/send', async (ctx, next) => {
  try {
    const framework = new Framework();
    const { amount, recipient } = sendMoneySchema.parse(ctx.request.body);

    /** Get user from NPWD */
    const recipientUser: NPWDUser = await global.exports.npwd.getPlayerData({
      phoneNumber: recipient,
    });
    if (!recipientUser) {
      throw new Error(translations.error_receipientDoesNotExist);
    }

    const currentUser: NPWDUser = await global.exports.npwd.getPlayerData({ source: ctx.source });
    if (recipientUser.phoneNumber === currentUser.phoneNumber) {
      throw new Error(translations.error_cantSendToYourself);
    }

    console.log('Current user', currentUser);

    /** Check player balance, before sending */
    // const money = await framework.getPlayerAccountMoney(ctx.source, 'bank');
    // if (money < amount) {
    //   throw new Error(translations.error_notEnoughFunds);
    // }

    if (isRunningInGame()) {
      framework.removePlayerAccountMoney(ctx.source, 'bank', amount);
      framework.addPlayerAccountMoney(recipientUser.source, 'bank', amount);
    }

    history.push({
      sender: currentUser.phoneNumber,
      senderName: currentUser.name,
      recipient: recipientUser.phoneNumber,
      recipientName: recipientUser.name,
      amount,
      date: new Date().toISOString(),
    });

    ctx.body = {
      ok: true,
    };
  } catch (error) {
    console.error('Error sending money', error);

    if (error instanceof z.ZodError) {
      ctx.body = {
        ok: false,
        error: getErrorMessage(error),
      };
    } else {
      ctx.body = {
        ok: false,
        error: error.message || 'internal_error',
      };
    }
  }

  await next();
});

baseRouter.add('/history', async (ctx, next) => {
  /** Filter out history items where user is a part of */
  const user = await global.exports.npwd.getPlayerData({ source: ctx.source });
  const userHistory = history.filter(
    (item) => item.sender === user.phoneNumber || item.recipient === user.phoneNumber,
  );

  /** Mark if the transaction was incoming */
  userHistory.forEach((item) => {
    item.isIncoming = item.recipient === user.phoneNumber;
  });

  ctx.body = {
    ok: true,
    data: userHistory,
  };
  await next();
});

app.use(baseRouter.routes());
app.use(baseRouter.allowedMethods());

app.listen(3000);
