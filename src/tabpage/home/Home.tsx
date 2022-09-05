import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '../../utils/utils';
import { indexData } from '../../api/home';
import type { ResponseType, Navigation } from '../../types/index';
import Panel from '../../components/panel/Panel';
import Search from './search/Search';
import Banner from './banner/Banner';
import Nav from './nav/Nav';
import Category from './category/Category';

type Props = {
  navigation: Navigation;
};

type Gathers = {
  swiper?: { bgcolor: string }[];
  theater: {
    data?: unknown[];
    total?: number;
  };
  coming: {
    data?: unknown[];
    total?: number;
  };
  today: {
    data?: unknown[];
    total?: number;
  };
};

function Home(props: Props): React.ReactElement {
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
          setBanner(res?.data?.swiper);
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        <LinearGradinet colors={gradientColor} style={styles.bgcolor}>
          <Search navigation={props.navigation} />
          <Banner banner={banner} onChange={bannerChange} />
        </LinearGradinet>
        <Nav navigation={props.navigation} />
        <Panel
          title="正在热映"
          subtitle={`${movie?.theater?.total}部`}
          to="/theater"
        >
          <Category movie={movie?.theater?.data} />
        </Panel>
        <Panel
          title="即将上映"
          subtitle={`${movie?.coming?.total}部`}
          to="/coming"
        >
          <Category movie={movie?.coming?.data} />
        </Panel>
        <Panel
          title="那年今日"
          subtitle={`${movie?.today?.total}部`}
          to="/today"
        >
          <Category movie={movie?.today?.data} />
        </Panel>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 240,
    paddingBottom: 10,
    backgroundColor: '#f5f5f5'
  },
  bgcolor: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: 300
  }
});

export default Home;
