import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { deviceWidth, deviceHeight } from '@/utils/screen';
import type { ViewStyle } from 'react-native';
import type { TextInputEvent } from '@/types/index';

type Props = {
  img: string;
  complete?: (code: string) => void;
  close?: () => void;
  picutreStyle?: ViewStyle;
  maskStyle?: ViewStyle;
};

function PicutreCode(props: Props): React.ReactElement {
  const [code, setCode] = useState('');

  const handleInputChange = (e: TextInputEvent) => {
    setCode(e.nativeEvent.text);
  };

  useEffect(() => {
    setCode('');
  }, [props.img]);

  useEffect(() => {
    if (code.length === 4) {
      props.complete && props.complete(code);
    }
  }, [code]);

  const close = () => {
    props.close && props.close();
  };

  return (
    <View style={[styles.page, props.picutreStyle]}>
      <TouchableOpacity
        activeOpacity={1}
        onPress={close}
        style={[styles.mask, props?.maskStyle]}
      />
      <View style={styles.modal}>
        <View style={styles.modalBody}>
          <Text style={styles.title}>请输入以下验证码数字</Text>
          <Image
            source={{ uri: props.img }}
            resizeMode={'stretch'}
            style={styles.coverImage}
          />
          <View style={styles.inputMain}>
            <TextInput
              value={code}
              onChange={handleInputChange}
              autoFocus
              caretHidden
              maxLength={4}
              placeholder=""
              style={styles.inputItem}
            />
            <View style={styles.inputText}>
              <Text style={styles.inputTextItem}>{code[0]}</Text>
              <Text style={styles.inputTextItem}>{code[1]}</Text>
              <Text style={styles.inputTextItem}>{code[2]}</Text>
              <Text style={styles.inputTextItem}>{code[3]}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={close}
          style={styles.cancel}
        >
          <Text style={styles.cancelText}>取消</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
    width: deviceWidth,
    height: deviceHeight
  },
  mask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 11,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: 'rgba(0, 0, 0, .55)'
  },
  modal: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    zIndex: 12,
    paddingTop: 15,
    marginLeft: -136,
    width: 272,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  modalBody: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 21
  },
  title: {
    color: '#80848f'
  },
  coverImage: {
    marginTop: 10,
    width: 150,
    height: 40
  },
  inputMain: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 21,
    height: 35
  },
  inputItem: {
    width: 242,
    color: 'transparent'
  },
  inputText: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 242,
    height: 35
  },
  inputTextItem: {
    width: 17,
    height: 35,
    lineHeight: 35,
    marginHorizontal: 2.6,
    fontSize: 15,
    color: '#323232',
    borderBottomWidth: 0.45,
    borderStyle: 'solid',
    borderColor: '#323232',
    textAlign: 'center'
  },
  cancel: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    width: 272,
    height: 45,
    lineHeight: 45,
    borderTopWidth: 0.45,
    borderStyle: 'solid',
    borderColor: '#ddd'
  },
  cancelText: {
    fontSize: 12.5,
    color: '#303133'
  }
});

export default PicutreCode;
