import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '../../utils/utils';
import { index } from '../../api/home';
import Search from './search/Search';
import Banner from './banner/Banner';

function Home(): React.ReactElement {
  // 轮播图
  const [banner, setBanner] = useState<unknown[]>([]);

  const bgcolorRgba = colorToRgba('#503725', 1);
  const bgcolorRgba1 = colorToRgba('#503725', 0.88);
  const bgcolorRgba2 = colorToRgba('#503725', 0.65);
  const bgcolorRgba3 = colorToRgba('#503725', 0.45);
  const bgcolorRgba4 = colorToRgba('#503725', 0);
  console.log(bgcolorRgba);
  console.log(bgcolorRgba1);
  console.log(bgcolorRgba2);

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

  return (
    <View style={styles.container}>
      <LinearGradinet
        colors={[
          bgcolorRgba,
          bgcolorRgba1,
          bgcolorRgba2,
          bgcolorRgba3,
          bgcolorRgba4
        ]}
        style={styles.bgcolor}
      >
        <Search />
        <Banner banner={banner} />
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
