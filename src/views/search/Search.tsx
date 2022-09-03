import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';
import type { Navigation, TextInputEvent } from '../../types/index';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

type Props = {
  navigation: Navigation;
};

function Search(props: Props): React.ReactElement {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleInputChange = (e: TextInputEvent): void => {
    setSearchValue(e.nativeEvent.text);
  };

  const cancel = () => {
    props?.navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <View style={styles.input}>
          <Text style={styles.inputIcon}>{'\ue613'}</Text>
          <TextInput
            value={searchValue}
            autoFocus={true}
            onChange={handleInputChange}
            placeholder="找影视 / 影人 / 角色"
            style={styles.inputText}
          />
        </View>
        <Text onPress={cancel} style={styles.cancelText}>
          取消
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: viewHeight,
    backgroundColor: '#fff'
  },
  search: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 11
  },
  input: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 34,
    backgroundColor: 'whitesmoke',
    borderRadius: 70
  },
  inputIcon: {
    paddingLeft: 10,
    paddingRight: 10,
    fontFamily: 'iconfont',
    fontSize: 14
  },
  inputText: {
    flex: 1,
    padding: 0,
    fontSize: 13,
    color: '#666'
  },
  cancelText: {
    width: 68,
    fontSize: 14,
    color: '#777',
    textAlign: 'center'
  }
});

export default Search;
