import { StorageKeys } from "global.d";

function setItem(key: StorageKeys, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key: StorageKeys) {
  localStorage.removeItem(key);
}

function getItem(key: StorageKeys) {
  return JSON.parse(localStorage.getItem(key) || "{}");
}

function clearStorage() {
  localStorage.clear();
}

export { setItem, removeItem, getItem, clearStorage };
