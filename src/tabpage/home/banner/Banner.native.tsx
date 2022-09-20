import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Dot from './dot/Dot';

function Banner(props): React.ReactElement {
  return (
    <View style={styles.banner}>
      <View style={styles.coverContainer}>
        <View style={styles.cover}>
          <Image
            source={{ uri: props.banner[0] && props.banner[0].banner }}
            resizeMode={'stretch'}
            style={styles.coverImage}
          />
        </View>
      </View>
      <Dot list={props.banner} />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    position: 'relative',
    height: 190
  },
  coverContainer: {
    paddingLeft: 10,
    paddingRight: 10
  },
  cover: {
    position: 'relative',
    borderRadius: 4,
    overflow: 'hidden'
  },
  coverImage: {
    width: '100%',
    height: 190
  }
});

export default Banner;
