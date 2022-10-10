import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import type { ListRenderItemInfo } from 'react-native';

type Props = {
  photo: ItemType[];
};

type ItemType = {
  url: string;
};

function ActorPhoto(props: Props): React.ReactElement {
  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.item}>
        <Image
          source={{ uri: item.url }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.list}>
      <FlatList
        horizontal
        initialNumToRender={6}
        showsHorizontalScrollIndicator={false}
        data={props.photo}
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
    marginRight: 8
  },
  itemImage: {
    width: 62,
    height: 85,
    borderRadius: 3
  }
});

export default ActorPhoto;
