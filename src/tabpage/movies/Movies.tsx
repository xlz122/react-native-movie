import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deviceWidth } from '@/utils/screen';
import { moviesList } from '@/api/movies';
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation, ResponseType } from '@/types/index';
import type { MovieParams } from '@/api/movies';
import Nav from './nav/Nav';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  poster: string;
  rating?: number;
  title: string;
};

function Movies(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const [navParams, setNavParams] = useState({
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const navChange = (categoryParams: Partial<MovieParams>) => {
    setResetRefresh(true);
    setNavParams({ ...navParams, ...categoryParams });
  };

  const getMoviesList = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      moviesList({
        page,
        per_page,
        category: navParams.category,
        genre: navParams.genre,
        country: navParams.country,
        year: navParams.year
      })
        .then((res: ResponseType<unknown[]>) => {
          if (res.code === 200) {
            setResetRefresh(false);
            resolve(res.data!);
          } else {
            reject();
          }
        })
        .catch(() => ({}));
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('MovieDetail', { id: item.id })}
      style={styles.item}
    >
      <Image
        source={{ uri: item.poster }}
        resizeMode={'stretch'}
        style={[styles.itemImage]}
      />
      <Text style={styles.itemRating}>{item?.rating}</Text>
      <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <Nav onChange={navChange} />
      <View style={styles.page}>
        {/* 单项宽度105 */}
        <ScrollRefresh
          page={1}
          pageSize={Math.floor(deviceWidth / 105) * 5}
          request={getMoviesList}
          initialNumToRender={6}
          numColumns={Math.floor(deviceWidth / 105)}
          columnWrapperStyle={{
            justifyContent: 'space-between'
          }}
          renderItem={renderItem}
          resetRefresh={resetRefresh}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 7,
    backgroundColor: '#fff'
  },
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10,
    marginHorizontal: 5,
    width: 105,
    textAlign: 'center'
  },
  itemImage: {
    width: 105,
    height: 154,
    borderRadius: 3
  },
  itemRating: {
    position: 'absolute',
    right: 8,
    bottom: 38,
    fontSize: 11,
    color: 'orange'
  },
  itemText: {
    marginTop: 6,
    color: '#333',
    fontSize: 12
  }
});

export default Movies;
