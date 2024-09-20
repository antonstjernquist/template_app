export interface RequestPayload {
  requestId: string;
  path: string;
  data: any;
}

export interface ResponsePayload<T> {
  requestId: string;
  data: T;
  status: number;
}

export interface NUICallbackPayload {
  path: string;
  data: any;
}

export interface NUICallbackResponsePayload<T> {
  status: number;
  payload: {
    data: T;
  };
}

/**
 * Emit Data, current user.
 *
 * Emit data directly to current user. This can be useful for triggering events on the client, such as
 * showing notifications, etc.
 *
 * @param event
 * @param data
 * @example
 * ctx.emit('some-event', { data: 'some-data' });
 * ctx.emit('some-event', { data: 'some-data' });
 */
export type EmitFunction = (event: string, data: unknown) => void;

/**
 * Emit Data, other user.
 *
 * Emit data directly to specific user. This is usually used to emit data to other users.
 * @param source
 * @param event
 * @param data
 * @example
 * ctx.emitTo(ctx.source, 'some-event', { data: 'some-data' });
 */
export type EmitToFunction = (source: number, event: string, data: unknown) => void;

/**
 * Emit NUI data, current user.
 *
 * Emit data directly to current user NUI. Usually this is not required to be used.
 *
 * @param event
 * @param data
 * @example
 * ctx.emitNui('some-event', { data: 'some-data' });
 * ctx.emitNui('some-event', { data: 'some-data' });
 *
 */
export type EmitNuiFunction = (event: string, data: unknown) => void;

/**
 * Emit NUI data, other user.
 *
 * Emit data directly to specific user NUI. This is usually used to emit data to other users.
 * @param source
 * @param event
 * @param data
 * @example
 * ctx.emitToNui(ctx.source, { data: 'some-data' });
 * ctx.emitToNui(1, { data: 'some-data' });
 * ctx.emitToNui(2, { data: 'some-data' });
 */
export type EmitToNuiFunction = (source: number, event: string, data: unknown) => void;

export interface KoaResponse<T> {
  data: T;
}

export const uuid = () => {
  return (
    Date.now().toString(36) +
    Math.floor(Math.pow(10, 12) + Math.random() * 9 * Math.pow(10, 12)).toString(36)
  );
};
