import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';
import type { TextInputEvent } from '../../types/index';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

function Login({ navigation }): React.ReactElement {
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

  const [formData, setFormData] = useState({
    account: '',
    password: ''
  });

  const handleInputChange = (e: TextInputEvent, name: string) => {
    setFormData({ ...formData, [name]: e.nativeEvent.text });
  };

  const submit = () => {
    Alert.alert(
      '登录',
      `账号: ${formData.account}; 密码: ${formData.password}`,
      [{ text: '取消', style: 'cancel' }, { text: '确认' }]
    );
  };

  const close = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.login}>
      <View style={styles.close}>
        <Text onPress={close} style={styles.closeIcon}>
          {'\ue612'}
        </Text>
      </View>
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
          <View style={styles.itemLine} />
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
          <View style={styles.itemLine} />
        </View>
        <View style={styles.submit}>
          <Button title="登 录" onPress={submit} />
        </View>
      </View>
      <View style={styles.tool}>
        <Text style={styles.toolText}>账号注册</Text>
        <Text style={styles.toolText}>找回密码</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    minHeight: viewHeight,
    backgroundColor: '#fff'
  },
  close: {
    paddingLeft: 16,
    paddingTop: 16,
    height: 52
  },
  closeIcon: {
    fontFamily: 'iconfont',
    fontSize: 17,
    color: '#e54847'
  },
  title: {
    paddingLeft: 45,
    paddingRight: 45,
    marginTop: 45,
    fontWeight: '700',
    fontSize: 22,
    color: '#303133'
  },
  form: {
    paddingTop: 34,
    paddingLeft: 45,
    paddingRight: 45
  },
  formItem: {
    position: 'relative',
    height: 68
  },
  itemInput: {
    marginTop: 22,
    height: 45
  },
  itemIcon: {
    position: 'absolute',
    top: '50%',
    right: 0,
    fontFamily: 'iconfont',
    fontSize: 18,
    color: '#ccc'
  },
  activeIcon: {
    color: '#e54847'
  },
  itemLine: {
    position: 'absolute',
    left: 0,
    bottom: 2,
    width: '100%',
    height: 0.8,
    backgroundColor: '#eee'
  },
  submit: {
    paddingTop: 34
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 28,
    paddingLeft: 45,
    paddingRight: 45
  },
  toolText: {
    fontSize: 12,
    color: '#303133'
  }
});

export default Login;
