import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';

type Props = {
  movie?: MovieItemType[];
};

export type MovieItemType = {
  id: number;
  title: string;
  poster: string;
  category: string;
  rating: string;
  wish_count: number;
  release_date: number;
};

function Category(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: { item: MovieItemType }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('MovieDetail', { id: item.id })}
    >
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        {item?.category && item?.category !== '电影' && (
          <Text style={styles.itemTag}>{item?.category}</Text>
        )}
        {item?.rating !== null && Number(item?.rating) === 0 && (
          <Text style={styles.itemRating}>暂无评分</Text>
        )}
        {Number(item?.rating) > 0 && (
          <Text style={styles.itemRating}>{item?.rating}分</Text>
        )}
        {Number(item?.wish_count) > 0 && (
          <Text style={styles.itemWish}>{item?.wish_count} 想看</Text>
        )}
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.title}
        </Text>
        {/* 上映时间 */}
        {item?.release_date && (
          <Text style={styles.itemDate}>{item?.release_date}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        horizontal
        initialNumToRender={4}
        showsHorizontalScrollIndicator={false}
        data={props.movie}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 7,
    marginRight: 8
  },
  itemImage: {
    width: 94,
    height: 130,
    borderRadius: 3
  },
  itemTag: {
    position: 'absolute',
    top: 6,
    right: 5,
    paddingVertical: 0.3,
    paddingHorizontal: 1.8,
    backgroundColor: 'rgba(255, 165, 0, 0.7)',
    fontSize: 9,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 2
  },
  itemRating: {
    position: 'absolute',
    right: 4,
    bottom: 34,
    fontSize: 10.5,
    color: 'orange'
  },
  itemWish: {
    position: 'absolute',
    left: 0,
    bottom: 44,
    width: 94,
    height: 29,
    paddingLeft: 4,
    paddingTop: 10,
    fontSize: 11,
    color: '#fff',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4
  },
  itemText: {
    width: 94,
    marginTop: 5,
    color: '#333',
    fontSize: 12
  },
  itemDate: {
    marginTop: 2,
    fontSize: 10.5,
    color: '#888'
  }
});

export default Category;
