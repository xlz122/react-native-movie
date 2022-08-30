import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';
import type { SharedValue } from 'react-native-reanimated';
import Dot from './dot/Dot';

// 获取屏幕宽度
const pageWidth = Dimensions.get('window').width;

function Banner(props): React.ReactElement {
  // 轮播滚动值
  const progressValue = useSharedValue<SharedValue<number> | number>(0);

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.coverContainer}>
          <View style={styles.cover}>
            <Image
              style={styles.coverImage}
              source={{ uri: item.banner }}
              resizeMode={'stretch'}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.banner}>
      <Carousel
        width={pageWidth}
        height={styles.banner.height}
        data={props.banner}
        renderItem={({ item }) => <RenderItem item={item} />}
        loop={true}
        autoPlay={true}
        autoPlayInterval={6000}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        onSnapToItem={index => {
          props.onChange(index);
        }}
      />
      <Dot list={props.banner} progressValue={progressValue} />
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
    borderRadius: 8,
    overflow: 'hidden'
  },
  coverImage: {
    width: '100%',
    height: '100%'
  }
});

export default Banner;
