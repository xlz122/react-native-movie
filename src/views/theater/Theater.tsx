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
import { movieTheater } from '../../api/home';
import type { Navigation, ResponseType } from '../../types/index';
import type { PagingParams } from '../../api/home';

type Props = {
  navigation: Navigation;
};

type Movie = {
  id: number;
  title: string;
  poster: string;
  year: string;
  genres: string;
  countries: string;
};

function Theater(props: Props): React.ReactElement {
  const [movie, setMovie] = useState<Movie[]>([]);
  const [movieParams] = useState<PagingParams>({
    page: 1,
    per_page: 11
  });

  const getMovieTheater = () => {
    movieTheater({ ...movieParams })
      .then((res: ResponseType<Movie[]>) => {
        if (res.code === 200) {
          setMovie(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieTheater();
  }, [movieParams]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => props?.navigation.push('MovieDetail', { id: item.id })}
    >
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
          <Text style={styles.itemRatingWeight}>{item?.rating}</Text> 分
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        initialNumToRender={6}
        showsVerticalScrollIndicator={false}
        data={movie}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 15,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 18,
    marginRight: -20,
    marginLeft: 16
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
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  itemRating: {
    width: 68,
    fontSize: 8,
    color: '#f16c00'
  },
  itemRatingWeight: {
    fontSize: 12,
    fontWeight: '700'
  }
});

export default Theater;
