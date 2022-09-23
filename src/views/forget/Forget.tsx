import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function Forget(): React.ReactElement {
  return (
    <View style={styles.page}>
      <Text>找回密码</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  }
});

export default Forget;
