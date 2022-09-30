import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { phoneCode, register } from '@/api/user';
import type { TextInputEvent, ResponseType } from '@/types/index';
import type { LoginParams } from '@/api/user';

function RegisterForm(): React.ReactElement {
  const [formData, setFormData] = useState<LoginParams>({
    account: '',
    password: '',
    code: ''
  });

  const handleInputChange = (e: TextInputEvent, name: string): void => {
    setFormData({ ...formData, [name]: e.nativeEvent.text });
  };

  // 倒计时逻辑
  const [codeTime, setCodeTime] = useState({
    visible: false,
    time: 120
  });
  const timer = useRef<NodeJS.Timer>();

  const handleTimeText = () => {
    if (timer.current) {
      clearInterval(timer.current);
    }

    setCodeTime({ ...codeTime, visible: true });

    timer.current = setInterval(() => {
      setCodeTime(state => {
        if (state.time <= 1) {
          clearInterval(timer.current);
          return { visible: false, time: 120 };
        }

        return { visible: true, time: state.time - 1 };
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, []);

  // 获取验证码
  const getPhoneCode = () => {
    phoneCode({ phone: formData.account })
      .then((res: ResponseType<unknown>) => {
        if (res.code === 200) {
          handleTimeText();
        } else {
          Alert.alert('提示', '发送失败, 请重试', [{ text: '确认' }]);
        }
      })
      .catch(() => ({}));
  };

  const submit = () => {
    register({ ...formData })
      .then((res: ResponseType<unknown>) => {
        if (res.code === 200) {
          Alert.alert('提示', '注册成功', [{ text: '确认' }]);
        } else {
          Alert.alert('提示', '登录失败, 请检查用户名密码', [{ text: '确认' }]);
        }
      })
      .catch(() => ({}));
  };

  return (
    <>
      <Text style={styles.title}>注册</Text>
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
            value={formData.password}
            onChange={e => {
              handleInputChange(e, 'password');
            }}
            autoComplete="off"
            placeholder="请设置初始密码(6-12位)"
            style={styles.itemInput}
          />
        </View>
        <View style={styles.formItem}>
          <TextInput
            value={formData.code}
            onChange={e => {
              handleInputChange(e, 'code');
            }}
            placeholder="请输入验证码"
            style={styles.itemInput}
          />
          <Text onPress={getPhoneCode} style={styles.codeText}>
            {codeTime.visible ? `${codeTime.time}s` : '获取验证码'}
          </Text>
        </View>
        <View style={styles.submit}>
          <Button title="注 册" onPress={submit} />
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
    paddingTop: 22,
    height: 68,
    borderBottomWidth: 0.4,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemInput: {
    flex: 1,
    height: 45
  },
  codeText: {
    height: 45,
    lineHeight: 45,
    fontSize: 11,
    color: '#e54847'
  },
  submit: {
    paddingTop: 34
  }
});

export default RegisterForm;
