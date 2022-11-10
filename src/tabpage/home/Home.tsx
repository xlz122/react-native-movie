import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Animated } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '@/utils/utils';
import { indexData } from '@/api/home';
import type { ResponseType } from '@/types/index';
import type { MovieItemType } from './category/Category';
import Skeleton from '@/components/skeleton/Home';
import Panel from '@/components/panel/Panel';
import Search from './search/Search';
import Banner from './banner/Banner';
import Nav from './nav/Nav';
import Category from './category/Category';

export type Gathers = {
  swiper: {
    bgcolor: string;
    banner: string;
  }[];
  theater: {
    data?: MovieItemType[];
    total?: number;
  };
  coming: {
    data?: MovieItemType[];
    total?: number;
  };
  today: {
    data?: MovieItemType[];
    total?: number;
  };
};

function Home(): React.ReactElement {
  const [loading, setLoading] = useState(true);
  // 轮播图
  const [banner, setBanner] = useState<Gathers['swiper']>([]);
  // 电影分类
  const [movie, setMovie] = useState<Partial<Gathers>>({
    theater: {},
    coming: {},
    today: {}
  });

  const getIndexData = () => {
    indexData()
      .then((res: ResponseType<Gathers>) => {
        if (res.code === 200) {
          setLoading(false);
          setBanner(res?.data?.swiper || []);
          setMovie({
            theater: res?.data?.theater,
            coming: res?.data?.coming,
            today: res?.data?.today
          });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getIndexData();
  }, []);

  // 渐变背景色
  const [gradientColor, setGradientColor] = useState<string[]>([
    '#f5f5f5',
    '#f5f5f5'
  ]);

  const handlerGradualChange = (color: string): void => {
    const result: string[] = [];

    const gradient = [1, 0.88, 0.65, 0.45, 0];
    gradient.forEach((item: number) => {
      result.push(colorToRgba(color, item));
    });

    setGradientColor(result);
  };

  useEffect(() => {
    if (!banner || banner.length === 0) {
      return;
    }

    handlerGradualChange(banner[0].bgcolor);
  }, [banner]);

  const bannerChange = (index: number): void => {
    const color = (banner && banner[index].bgcolor) || '#f5f5f5';

    handlerGradualChange(color);
  };

  // 初始值
  const spinValue = new Animated.Value(0);

  // 插值(单位转换)
  const spinBackgroundColor = spinValue.interpolate({
    inputRange: [0, 150],
    outputRange: ['transparent', '#fff'],
    extrapolate: 'clamp' // 阻止输出值超过outputRange
  });
  const spinElevation = spinValue.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1.5],
    extrapolate: 'clamp' // 阻止输出值超过outputRange
  });

  const animatedEvent = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: { y: spinValue }
        }
      }
    ],
    { useNativeDriver: false }
  );

  return (
    <>
      {loading && <Skeleton />}
      {!loading && (
        <ScrollView
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          scrollEventThrottle={1}
          onScroll={animatedEvent}
          style={styles.page}
        >
          <View>
            <Animated.View
              style={{
                backgroundColor: spinBackgroundColor,
                elevation: spinElevation
              }}
            >
              <Search />
            </Animated.View>
          </View>
          <LinearGradinet colors={gradientColor} style={styles.bgcolor} />
          <Banner banner={banner} onChange={bannerChange} />
          <Nav />
          {movie?.theater?.data && movie?.theater?.data?.length > 0 && (
            <Panel
              title="正在热映"
              subtitle={`${movie?.theater?.total}部`}
              to={{ path: 'Theater' }}
            >
              <Category movie={movie?.theater?.data} />
            </Panel>
          )}
          {movie?.coming?.data && movie?.coming?.data?.length > 0 && (
            <Panel
              title="即将上映"
              subtitle={`${movie?.coming?.total}部`}
              to={{ path: 'Coming' }}
            >
              <Category movie={movie?.coming?.data} />
            </Panel>
          )}
          {movie?.today?.data && movie?.today?.data?.length > 0 && (
            <Panel
              title="那年今日"
              subtitle={`${movie?.today?.total}部`}
              to={{ path: 'Today' }}
            >
              <Category movie={movie?.today?.data} />
            </Panel>
          )}
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f5f5f5'
  },
  bgcolor: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
    width: '100%',
    height: 300
  }
});

export default Home;
