import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { movieTop } from '../../api/home';
import type { ResponseType } from '../../types/index';
import type { PagingParams } from '../../api/home';

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function HighScore(): React.ReactElement {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [movieParams] = useState<PagingParams>({
    page: 1,
    per_page: 11
  });

  const getMovieTop = () => {
    movieTop({ ...movieParams })
      .then((res: ResponseType<Movie[]>) => {
        if (res.code === 200) {
          setMovie(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieTop();
  }, [movieParams]);

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.year}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.genres}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.countries}
          </Text>
        </View>
        <Text style={styles.itemRating}>
          <Text style={styles.itemRatingWeight}>{item?.rating}</Text>分
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.theater}>
      <FlatList
        initialNumToRender={6}
        showsHorizontalScrollIndicator={false}
        data={movie}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  theater: {
    paddingTop: 8,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 9,
    marginRight: 17,
    marginLeft: 17
  },
  itemImage: {
    width: 93,
    height: 124,
    borderRadius: 3
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  itemTitle: {
    fontSize: 14,
    color: '#333'
  },
  itemText: {
    marginTop: 6,
    fontSize: 12,
    color: '#999'
  },
  itemRating: {
    width: 68,
    fontSize: 12,
    color: '#f16c00'
  },
  itemRatingWeight: {
    fontWeight: '700'
  }
});

export default HighScore;
