import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import type { TextInputEvent } from '@/types/index';

function Forget(): React.ReactElement {
  const [formData, setFormData] = useState({
    account: ''
  });

  const handleInputChange = (e: TextInputEvent, name: string) => {
    setFormData({ ...formData, [name]: e.nativeEvent.text });
  };

  return (
    <View style={styles.page}>
      <View style={styles.fieldItem}>
        <Text style={styles.itemText}>手机号码</Text>
        <TextInput
          value={formData.account}
          onChange={e => {
            handleInputChange(e, 'account');
          }}
          placeholder="请输入注册手机号"
          style={styles.itemInput}
        />
      </View>
      <View style={styles.progressBtn}>
        <Button title="下一步" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  fieldItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    height: 51,
    backgroundColor: '#fff'
  },
  itemText: {
    fontSize: 14,
    color: '#303133'
  },
  itemInput: {
    flex: 1,
    height: 41,
    textAlign: 'right'
  },
  progressBtn: {
    marginTop: 25,
    paddingLeft: 15,
    paddingRight: 15
  }
});

export default Forget;
