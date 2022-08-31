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
          style={[styles.itemImage]}
          source={{ uri: item.poster }}
          resizeMode={'stretch'}
        />
        {item?.category && item?.category !== '电影' && (
          <Text style={styles.itemTag}>{item?.category}</Text>
        )}
        {item?.rating && (
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
    height: 134,
    borderRadius: 2
  },
  itemTag: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 32,
    height: 18,
    backgroundColor: 'rgba(255, 165, 0, 0.7)',
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    borderRadius: 2
  },
  itemRating: {
    position: 'absolute',
    bottom: 33,
    right: 4,
    fontSize: 12,
    color: 'orange'
  },
  itemText: {
    marginTop: 6,
    width: 94,
    color: '#333',
    fontSize: 12
  },
  itemDate: {
    marginTop: 2,
    fontSize: 10,
    color: '#888'
  }
});

export default Category;
