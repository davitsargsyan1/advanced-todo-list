export const LOCAL_STORAGE = 'localStorage';

const getStorage = storageName => {
  if (typeof window !== 'undefined') {
    return window[storageName];
  }
};

export const getFromStorage = (key, storage = LOCAL_STORAGE) => {
  try {
    const serializedState = getStorage(storage)?.getItem(key);

    if (serializedState === undefined || serializedState === null) {
      return;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const saveToStorage = (key, state, storage = LOCAL_STORAGE) => {
  try {
    const serializedState = JSON.stringify(state);

    getStorage(storage)?.setItem(key, serializedState);
  } catch (err) {
    console.error(err);
  }
};

export const removeFromStorage = (key, storage = LOCAL_STORAGE) => {
  try {
    getStorage(storage)?.removeItem(key);
  } catch (e) {
    console.error(e);
  }
};
