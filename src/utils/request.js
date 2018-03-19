import fetch from 'dva/fetch';
import { clearLocalStorage } from './index';
/*
function parseJSON(response) {
  return response.json();
}
*/

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default async function request(url, options) {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  checkStatus(response);

  const data = await response.json();

  // 登陆失效
  if (data.code === 10010 || data.message === '登录认证错误，请重试') {
    const error = new Error(data.message);
    error.response = data;

    clearLocalStorage();

    // window.location.href = '/index.html';
    throw error;
  }

  return { data };
}
