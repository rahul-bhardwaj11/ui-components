export const IS_DEV = process.env.NODE_ENV === 'development';

export const splitByExistingKeys = (arr, obj) => {
  let included = {};
  let excluded = {};
  Object.keys(obj).map(prop => {
    if (arr.includes(prop)) {
      included[prop] = obj[prop];
    } else {
      excluded[prop] = obj[prop];
    }
  });
  return {
    included,
    excluded
  };
};
