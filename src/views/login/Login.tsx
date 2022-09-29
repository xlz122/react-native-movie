import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';
import LoginForm from './login-form/LoginForm';
import RegisterForm from './register-form/RegisterForm';

function Login(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const close = (): void => {
    navigation.goBack();
  };

  const [state, setState] = useState({
    type: 'login',
    typeText: '账号注册'
  });

  const typeChange = () => {
    if (state.type === 'login') {
      setState({ type: 'register', typeText: '账号登录' });
      return false;
    }

    setState({ type: 'login', typeText: '账号注册' });
  };

  return (
    <View style={styles.login}>
      <View style={styles.close}>
        <Text onPress={close} style={styles.closeIcon}>
          {'\ue612'}
        </Text>
      </View>
      {state.type === 'login' && <LoginForm />}
      {state.type === 'register' && <RegisterForm />}
      <View style={styles.tool}>
        <TouchableOpacity activeOpacity={1} onPress={typeChange}>
          <Text style={styles.toolText}>{state.typeText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.push('Forget')}
        >
          <Text style={styles.toolText}>找回密码</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  login: {
    flex: 1,
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
  tool: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 45,
    marginTop: 28
  },
  toolText: {
    fontSize: 12,
    color: '#303133'
  }
});

export default Login;
