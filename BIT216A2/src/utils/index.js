export function localGet(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return value;
  }
}

export function localSet(key, value) {
  console.log("这里是存储token");
  console.log(value);
  window.localStorage.setItem(key, JSON.stringify(value));
}