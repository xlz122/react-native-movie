import AsyncStorage from '@react-native-async-storage/async-storage';
import { toRawType } from './tool';

/**
 * @description 获取本地存储所有key值
 */
export async function storageGetAllKeys(): Promise<readonly string[]> {
  return await AsyncStorage.getAllKeys();
}

/**
 * @description 设置本地存储
 * @param { String } key - key
 * @param { String } value - value
 */
export async function storageSetItem(
  key: string,
  value: unknown
): Promise<boolean | undefined> {
  if (toRawType(value) === 'Object' && toRawType(value) === 'Array') {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return false;
  }

  await AsyncStorage.setItem(key, String(value));
}

/**
 * @description 获取本地存储
 * @param { String } key - key
 */
export async function storageGetItem(key: string): Promise<string | null> {
  const value = await AsyncStorage.getItem(key);

  if (value === null) {
    return null;
  }

  if (toRawType(value) === 'Object' && toRawType(value) === 'Array') {
    return JSON.parse(value);
  }

  return value;
}

/**
 * @description 删除本地存储
 * @param { String } key - key
 */
export async function storageRemoveItem(key: string): Promise<void> {
  await AsyncStorage.removeItem(key);
}

/**
 * @description 清空本地存储
 * @param { String } key - key
 */
export async function storageClearItem(): Promise<void> {
  await AsyncStorage.clear();
}
