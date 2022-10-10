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
import Dot from './dot/Dot';

// 获取屏幕宽度
const pageWidth = Dimensions.get('window').width;

type Props = {
  banner: BannerItem[];
  onChange: (index: number) => void;
};

type BannerItem = {
  banner: string;
};

function Banner(props: Props): React.ReactElement {
  // 轮播滚动值
  const progressValue = useSharedValue<number>(0);

  const RenderItem = ({ item }: { item: BannerItem }) => {
    return (
      <TouchableOpacity activeOpacity={1}>
        <View style={styles.coverContainer}>
          <View style={styles.cover}>
            <Image
              source={{ uri: item.banner }}
              resizeMode={'stretch'}
              style={styles.coverImage}
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
    paddingHorizontal: 10
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
