import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { movieComing } from '@/api/home';
import type { Navigation, ResponseType } from '@/types/index';

type ComingType = {
  list: ItemType[];
  stickyIndex: number[];
};

type ItemType = {
  stickyTitle?: string;
  id?: number;
  poster?: string;
  title?: string;
  release_date?: string;
  wish_count?: number;
  genres?: string;
  countries?: string;
};

function Coming(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const [coming, setComing] = useState<ComingType>({
    list: [],
    stickyIndex: []
  });

  const getMovieComing = (): void => {
    movieComing({ page: 1, per_page: 100 })
      .then((res: ResponseType<any[]>) => {
        if (res.code === 200) {
          const list: ItemType[] = [];
          const stickyIndex: number[] = [];

          res.data?.forEach(item => {
            const isExist = list.find(
              t => t.release_date === item.release_date
            );

            // 吸顶标题、索引
            if (!isExist) {
              list.push({ stickyTitle: item.release_date });
              stickyIndex.push(list.length - 1);
            }

            // 电影项
            list.push(item);
          });

          setComing({ list, stickyIndex });
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieComing();
  }, []);

  const renderItem = ({ item }: { item: ItemType }) => (
    <>
      {item.stickyTitle && (
        <View style={styles.sticky}>
          <Text style={styles.stickyText}>{item.stickyTitle}</Text>
        </View>
      )}
      {!item.stickyTitle && (
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
            <View style={styles.itemInfo}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.itemTitle}
              >
                {item.title}
              </Text>
              <Text style={styles.itemText}>
                <Text style={styles.itemCountText}>{item.wish_count}</Text>
                <Text>人想看</Text>
              </Text>
              <Text style={styles.itemText}>{item.genres}</Text>
              <Text style={styles.itemText}>{item.countries}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );

  return (
    <View style={styles.page}>
      {Boolean(coming.list.length) && (
        <FlatList
          stickyHeaderIndices={coming.stickyIndex}
          data={coming.list}
          renderItem={renderItem}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: 10,
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  sticky: {
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    borderBottomWidth: 0.45,
    borderStyle: 'solid',
    borderColor: '#dedede'
  },
  stickyText: {
    paddingVertical: 10,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
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
  itemCountText: {
    fontSize: 13,
    color: '#e54847'
  }
});

export default Coming;
