/**
 * Simple wrapper around fetch API tailored for CEF/NUI use.
 * @param eventName - The endpoint eventname to target
 * @param data - Data you wish to send in the NUI Callback
 *
 * @return returnData - A promise for the data sent back by the NuiCallbacks CB argument
 */
import { getEventRequestUrl, isEnvBrowser } from './misc';

async function fetchNui<T = any, D = any>(eventName: string, data?: D): Promise<T> {
  const ingamePayload = {
    data,
    path: eventName,
  };

  const url = getEventRequestUrl(eventName);
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'x-source': '1',
    },
    body: JSON.stringify(!isEnvBrowser() ? ingamePayload : data),
  };

  if (isEnvBrowser()) {
    return await fetch(url, options).then((res) => res.json());
  }

  const resp = await fetch(url, options);
  const json = await resp.json();
  return json.payload as T;
}

export async function fetchNuiPhone<T = any, D = any>(eventName: string, data?: D): Promise<T> {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(data),
  };

  const resp = await fetch(`https://npwd/${eventName}`, options);

  const responseObj = await resp.json();

  return responseObj;
}

export default fetchNui;
