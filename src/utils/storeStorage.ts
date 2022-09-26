// 获取本地存储，并返回普通对象给redux，非promise对象
import store from '@/store/index';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Params = {
  key: string;
  reducers: string;
};

/**
 * @description 获取本地存储(字符串)
 * @param { String } key - key
 * @param { String } reducers - reducers方法名
 */
function getStringItem({ key, reducers }: Params): null {
  AsyncStorage.getItem(key)
    .then(value => {
      store.dispatch({
        type: `routine/${reducers}`,
        payload: value
      });
    })
    .catch(() => {
      store.dispatch({
        type: `routine/${reducers}`,
        payload: null
      });
    });

  return null;
}

/**
 * @description 获取本地存储(对象、数组)
 * @param { String } key - key
 * @param { String } reducers - reducers方法名
 */
function getObjectItem({ key, reducers }: Params): null {
  AsyncStorage.getItem(key)
    .then(value => {
      try {
        const jsonValue = JSON.parse(value);

        store.dispatch({
          type: `routine/${reducers}`,
          payload: jsonValue
        });
      } catch {
        store.dispatch({
          type: `routine/${reducers}`,
          payload: null
        });
      }
    })
    .catch(() => {
      store.dispatch({
        type: `routine/${reducers}`,
        payload: null
      });
    });

  return null;
}

const storeStorage = {
  getStringItem,
  getObjectItem
};

export default storeStorage;
export { getStringItem, getObjectItem };
