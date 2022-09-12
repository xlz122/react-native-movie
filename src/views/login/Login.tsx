import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import type { Navigation, TextInputEvent } from '../../types/index';
import styles from './login.css';

type Props = {
  navigation: Navigation;
};

function Login(props: Props): React.ReactElement {
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
    props?.navigation.goBack();
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
      <View style={styles.tool}>
        <Text style={styles.toolText}>账号注册</Text>
        <Text style={styles.toolText}>找回密码</Text>
      </View>
    </View>
  );
}

export default Login;
