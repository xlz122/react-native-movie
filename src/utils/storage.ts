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
): Promise<void> {
  try {
    if (
      toRawType(JSON.parse(value as string)) === 'Object' ||
      toRawType(JSON.parse(value as string)) === 'Array'
    ) {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, String(value));
    }
  } catch {
    await AsyncStorage.setItem(key, String(value));
  }
}

/**
 * @description 获取本地存储
 * @param { String } key - key
 */
export async function storageGetItem<T>(
  key: string
): Promise<string | Awaited<T>> {
  const value = await AsyncStorage.getItem(key);

  if (value === null) {
    return '';
  }

  try {
    if (
      toRawType(JSON.parse(value)) === 'Object' ||
      toRawType(JSON.parse(value)) === 'Array'
    ) {
      return JSON.parse(value);
    } else {
      return value;
    }
  } catch {
    return value;
  }
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
