import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useStore } from 'react-redux';
import { login, userinfo } from '@/api/user';
import type { Navigation, TextInputEvent, ResponseType } from '@/types/index';
import type { LoginParams } from '@/api/user';

function LoginForm(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const store = useStore();

  // 密码显隐
  const [password, setPassword] = useState({
    secureTextEntry: true,
    iconActive: false
  });

  const togglePassword = () => {
    setPassword({
      secureTextEntry: !password.secureTextEntry,
      iconActive: !password.iconActive
    });
  };

  const [formData, setFormData] = useState<LoginParams>({
    account: '',
    password: ''
  });

  const handleInputChange = (e: TextInputEvent, name: string) => {
    setFormData({ ...formData, [name]: e.nativeEvent.text });
  };

  // 获取用户信息
  const getUserInfo = () => {
    return new Promise((resolve, reject) => {
      userinfo()
        .then((res: ResponseType<unknown>) => {
          if (res.code === 200) {
            resolve(res.data!);
          } else {
            reject();
          }
        })
        .catch(() => ({}));
    });
  };

  const submit = () => {
    if (!formData.account) {
      return Alert.alert('提示', '请输入手机号', [{ text: '确认' }]);
    }
    if (!formData.password) {
      return Alert.alert('提示', '请输入密码', [{ text: '确认' }]);
    }

    login({ ...formData })
      .then(async (res: ResponseType<{ token: string }>) => {
        if (res.code === 200) {
          store.dispatch({
            type: 'routine/setLogin',
            payload: true
          });
          store.dispatch({
            type: 'routine/setToken',
            payload: res?.data?.token
          });

          const userInfo = await getUserInfo();
          if (userInfo) {
            store.dispatch({
              type: 'routine/setUserInfo',
              payload: userInfo
            });

            navigation.goBack();
          }
        } else {
          Alert.alert('提示', res?.message, [{ text: '确认' }]);
        }
      })
      .catch(err => {
        if (err?.response?.data?.message) {
          Alert.alert('提示', err?.response?.data?.message, [{ text: '确认' }]);
        }
      });
  };

  return (
    <>
      <Text style={styles.title}>登录</Text>
      <View style={styles.form}>
        <View style={styles.formItem}>
          <TextInput
            value={formData.account}
            onChange={e => {
              handleInputChange(e, 'account');
            }}
            placeholder="请输入手机号"
            style={styles.itemInput}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            secureTextEntry={password.secureTextEntry}
            value={formData.password}
            onChange={e => {
              handleInputChange(e, 'password');
            }}
            autoComplete="off"
            placeholder="请输入密码"
            style={styles.itemInput}
          />
          <Text
            onPress={togglePassword}
            style={[
              styles.itemIcon,
              password.iconActive ? styles.activeIcon : styles.itemIcon
            ]}
          >
            {'\ue639'}
          </Text>
        </View>
        <View style={styles.submit}>
          <Button title="登 录" onPress={submit} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: 45,
    marginTop: 45,
    fontWeight: '700',
    fontSize: 22,
    color: '#303133'
  },
  form: {
    paddingTop: 34,
    paddingHorizontal: 45
  },
  formItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 68,
    paddingTop: 22,
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemInput: {
    flex: 1,
    height: 45
  },
  itemIcon: {
    height: 45,
    lineHeight: 45,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#ccc'
  },
  activeIcon: {
    color: '#e54847'
  },
  submit: {
    paddingTop: 34
  }
});

export default LoginForm;
