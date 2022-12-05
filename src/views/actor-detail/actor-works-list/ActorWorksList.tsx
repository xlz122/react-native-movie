import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { deviceWidth, viewHeight } from '@/utils/screen';
import { actorWorks } from '@/api/actor';
import type { ListRenderItemInfo } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type Route = RouteProp<{ params: { id: number } }>;

type ItemType = {
  id: number;
  title: string;
  poster: string;
  category: string;
  rating: string;
  release_date: number;
};

function ActorWorksDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  // 作品数
  const [total, setTotal] = useState(0);

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const [sortby, setSortby] = useState('hot');

  const toggleSort = (value: string): void => {
    setResetRefresh(true);
    setSortby(value);
  };

  const getActorsList = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      actorWorks({
        id: route.params.id,
        page,
        per_page,
        sortby
      })
        .then((res: ResponseType<unknown[]>) => {
          if (res.code === 200) {
            setResetRefresh(false);
            setTotal((res as { total: number })?.total);
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
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.page}>
      <View style={styles.title}>
        <Text style={styles.titleText}>作品 {total}</Text>
        <View style={styles.titleTab}>
          <Text
            onPress={() => toggleSort('hot')}
            style={[
              styles.tabItem,
              sortby === 'hot' ? styles.tabActiveItem : styles.tabItem
            ]}
          >
            热度
          </Text>
          <Text
            onPress={() => toggleSort('year')}
            style={[
              styles.tabItem,
              sortby === 'year' ? styles.tabActiveItem : styles.tabItem
            ]}
          >
            时间
          </Text>
          <Text
            onPress={() => toggleSort('rating')}
            style={[
              styles.tabItem,
              sortby === 'rating' ? styles.tabActiveItem : styles.tabItem
            ]}
          >
            评分
          </Text>
        </View>
      </View>
      {/* 单项宽度105 */}
      <ScrollRefresh
        page={1}
        pageSize={Math.floor(deviceWidth / 105) * 5}
        request={getActorsList}
        initialNumToRender={15}
        numColumns={Math.floor(deviceWidth / 105)}
        columnWrapperStyle={{
          justifyContent: 'space-between'
        }}
        renderItem={renderItem}
        resetRefresh={resetRefresh}
        listStyle={{ paddingHorizontal: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  title: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  titleText: {
    flex: 1,
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  titleTab: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 18
  },
  tabItem: {
    paddingVertical: 3,
    paddingHorizontal: 7,
    margin: 3.5,
    fontSize: 12,
    color: '#999'
  },
  tabActiveItem: {
    backgroundColor: '#fff',
    color: '#303133',
    borderRadius: 18
  },
  item: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 14
  },
  itemImage: {
    width: 105,
    height: 156,
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
    bottom: 40,
    fontSize: 10.5,
    color: 'orange'
  },
  itemText: {
    width: 94,
    marginTop: 5,
    color: '#333',
    fontSize: 12
  }
});

export default ActorWorksDetail;
