import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { index } from '../../api/home';
import Search from './search/Search';
import Banner from './banner/Banner';

function Home(): React.ReactElement {
  // 轮播图
  const [banner, setBanner] = useState<unknown[]>([]);

  const getIndex = () => {
    index()
      .then((res: any) => {
        if (res.code === 200) {
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
      <View style={styles.bgcolor} />
      <Search />
      <Banner banner={banner} />
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
