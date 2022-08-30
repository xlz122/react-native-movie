import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '../../utils/utils';
import { index } from '../../api/home';
import Search from './search/Search';
import Banner from './banner/Banner';
import Nav from './nav/Nav';

function Home(): React.ReactElement {
  // 轮播图
  const [banner, setBanner] = useState<{ bgcolor: string }[]>([]);

  const getIndex = () => {
    index()
      .then((res: any) => {
        if (res.code === 200) {
          console.log(res);
          setBanner(res.data.swiper);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getIndex();
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
    if (banner.length === 0) {
      return;
    }

    handlerGradualChange(banner[0].bgcolor);
  }, [banner]);

  const bannerChange = (index: number): void => {
    const color = banner[index]?.bgcolor || '#f5f5f5';

    handlerGradualChange(color);
  };

  return (
    <View style={styles.container}>
      <LinearGradinet colors={gradientColor} style={styles.bgcolor}>
        <Search />
        <Banner banner={banner} onChange={bannerChange} />
        <Nav />
      </LinearGradinet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
