import isPlainObject from 'is-plain-object';

export const isDebuggingEnabled = () => {
  let search = window.location.search;
  return search
    .substring(1)
    .split('&')
    .includes('debug=true');
};

export const isUndefined = value => {
  return typeof value === 'undefined';
};

export const isFunction = fn => {
  return typeof fn === 'function';
};

export const isString = value => {
  return typeof value === 'string';
};

export function isEmpty(x) {
  if (isObject(x) && !Object.keys(x).length) return true;
  if (Array.isArray(x) && !x.length) return true;
  return false;
}

export const IS_DEV = process.env.NODE_ENV !== 'production';

export const isObject = obj => isPlainObject(obj);

export const noop = () => undefined;

export const identity = val => val;

export const reload = (url, { replace = false } = {}) => {
  if (url.indexOf('http') == -1) {
    url = url[0] === '/' ? url : `/${url}`;
    url = window.location.origin + url;
  }
  if (replace) window.location.replace(url);
  else window.location.href = url;
};
