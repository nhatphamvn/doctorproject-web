// src/locales/index.js
export const flattenMessages = (nestedMessages, prefix = "") => {
  return Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object") {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    } else {
      messages[prefixedKey] = value;
    }

    return messages;
  }, {});
};
