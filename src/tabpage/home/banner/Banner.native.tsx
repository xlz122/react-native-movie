import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import GestureSwiper from '@/components/gesture-swiper/GestureSwiper';
import Dot from './dot/Dot';

type Props = {
  banner: BannerItem[];
  onChange: (index: number) => void;
};

type BannerItem = {
  banner: string;
};

function Banner(props: Props): React.ReactElement {
  const renderItem = ({ item }: { item: BannerItem }) => {
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
      <GestureSwiper
        data={props?.banner || []}
        renderItem={renderItem}
        itemStyle={styles.coverContainer}
      />
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
    paddingHorizontal: 5
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
