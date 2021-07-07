export const findKeyValue = (dictionary, keyString, separator = '.') => {
  const keys = keyString.split(separator);
  let value = dictionary;
  while (keys.length > 0) {
    const k = keys.shift();
    value = value[k];
  }
  return value;
};