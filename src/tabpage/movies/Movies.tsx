import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';
import { moviesList } from '../../api/movies';
import type { ResponseType } from '../../types/index';
import type { MovieParams } from '../../api/movies';
import Nav from './nav/Nav';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

type Movie = {
  id: number;
  title: string;
  poster: string;
  rating: number;
};

function Movies(): React.ReactElement {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [movieParams, setMovieParams] = useState<MovieParams>({
    page: 1,
    per_page: 21,
    category: '全部',
    genre: '全部',
    country: '全部',
    year: '全部'
  });

  const getMoviesList = () => {
    moviesList({ ...movieParams })
      .then((res: ResponseType<Movie[]>) => {
        if (res.code === 200) {
          setMovie(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMoviesList();
  }, [movieParams]);

  const navChange = (categoryParams: Partial<MovieParams>) => {
    setMovieParams({ ...movieParams, ...categoryParams });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <Nav onChange={navChange} />
      <View style={styles.list}>
        {movie.map(item => {
          return (
            <View key={item.id} style={styles.item}>
              <Image
                source={{ uri: item.poster }}
                resizeMode={'stretch'}
                style={[styles.itemImage]}
              />
              <Text style={styles.itemRating}>{item?.rating}</Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemText}
              >
                {item.title}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    minHeight: viewHeight,
    backgroundColor: '#fff'
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    paddingTop: 10,
    paddingBottom: 15,
    paddingLeft: 7,
    paddingRight: 7
  },
  item: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10,
    marginLeft: 5,
    marginRight: 5,
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
