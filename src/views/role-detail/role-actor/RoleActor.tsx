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
import type { ListRenderItemInfo } from 'react-native';
import type { Navigation } from '@/types/index';

type Props = {
  movie?: ActorItemType[];
};

export type ActorItemType = {
  id: number;
  avatar: string;
  name: string;
};

function RoleActor(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const renderItem = ({ item }: ListRenderItemInfo<ActorItemType>) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('ActorDetail', { id: item.id })}
    >
      <View style={styles.item}>
        <Image
          source={{ uri: item?.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item?.name}
        </Text>
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
  itemText: {
    marginTop: 5,
    width: 94,
    color: '#333',
    fontSize: 12
  }
});

export default RoleActor;
