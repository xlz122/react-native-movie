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

function Category(props): React.ReactElement {
  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        {item?.category && item?.category !== '电影' && (
          <Text style={styles.itemTag}>{item?.category}</Text>
        )}
        {item?.rating?.length && (
          <Text style={styles.itemRating}>{item?.rating}分</Text>
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
        initialNumToRender={6}
        showsHorizontalScrollIndicator={false}
        data={props.movie}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
    paddingLeft: 11,
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
    right: 6,
    width: 22,
    height: 13,
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
  itemText: {
    marginTop: 5,
    width: 94,
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
