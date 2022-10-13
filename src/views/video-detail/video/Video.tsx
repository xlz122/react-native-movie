import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { deviceWidth } from '@/utils/screen';

type Props = {
  data: InfoType;
};

type InfoType = {
  poster?: string;
};

function Video(props: Props): React.ReactElement {
  const { data } = props;

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: data.poster }}
        resizeMode={'stretch'}
        style={[styles.coverImage]}
      />
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
  }
});

export default Video;
