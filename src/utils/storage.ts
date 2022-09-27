import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * @description 设置本地存储(字符串)
 * @param { String } key - key
 * @param { String } value - value
 */
async function setStringItem(key: string, value: string): Promise<void> {
  try {
    await AsyncStorage.setItem(key, value);
  } catch {
    await AsyncStorage.setItem(key, '');
  }
}

/**
 * @description 设置本地存储(对象、数组)
 * @param { String } key - key
 * @param { String } value - value
 */
async function setObjectItem(key: string, value: unknown): Promise<void> {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch {
    await AsyncStorage.setItem(key, '');
  }
}

/**
 * @description 获取本地存储(字符串)
 * @param { String } key - key
 */
async function getStringItem(key: string): Promise<string | null> {
  const value = await AsyncStorage.getItem(key);

  return value;
}

/**
 * @description 获取本地存储(对象、数组)
 * @param { String } key - key
 */
async function getObjectItem<T = any>(key: string): Promise<T | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch {
    return null;
  }
}

/**
 * @description 获取本地存储所有key值
 */
async function getAllKeys(): Promise<readonly string[]> {
  return await AsyncStorage.getAllKeys();
}

/**
 * @description 删除本地存储
 * @param { String } key - key
 */
async function removeItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

/**
 * @description 清空本地存储
 * @param { String } key - key
 */
async function clear(): Promise<void> {
  await AsyncStorage.clear();
}

const storage = {
  setStringItem,
  setObjectItem,
  getStringItem,
  getObjectItem,
  getAllKeys,
  removeItem,
  clear
};

export default storage;
export {
  setStringItem,
  setObjectItem,
  getStringItem,
  getObjectItem,
  getAllKeys,
  removeItem,
  clear
};
