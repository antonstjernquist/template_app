import { CustomMiddleware, RouterContext } from 'fivem-router/dist/server';
import { users } from '../data';
import { isRunningInGame } from '../utils/config';

export const identifierMiddleware: CustomMiddleware<RouterContext> = async (ctx, next) => {
  /** Never use header-source when running ingame. */
  const headerSource = isRunningInGame()
    ? 0
    : parseInt(ctx.request?.headers?.['x-source'] ?? '0', 10);

  const _source = (!isNaN(headerSource) && headerSource) || global.source || ctx.source;

  if (!_source) {
    ctx.throw(401, 'Source not found. Are you calling this from the server?');
    return;
  }

  const user = users.get(_source);
  if (!user) {
    ctx.throw(401, 'Server user not found. Make sure to load the user first.');
    return;
  }

  ctx.source = _source;
  ctx.identifier = user;
  await next();
};
