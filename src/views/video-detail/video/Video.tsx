import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { deviceWidth } from '@/utils/screen';

type Props = {
  detail: InfoType;
};

type InfoType = {
  poster?: string;
};

function Video(props: Props): React.ReactElement {
  const { detail } = props;

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: detail.poster }}
        resizeMode={'stretch'}
        style={[styles.coverImage]}
      />
      <View style={styles.play}>
        <Text style={styles.playIcon}>{'\ue616'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    height: 216,
    backgroundColor: '#000'
  },
  coverImage: {
    width: deviceWidth,
    height: 216,
    borderRadius: 4
  },
  play: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -22.5,
    marginLeft: -22.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 100
  },
  playIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#fff'
  }
});

export default Video;
