import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { userActors } from '@/api/mine';
import type { ListRenderItemInfo } from 'react-native';
import type { ResponseType, Navigation } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';

type ItemType = {
  id: number;
  avatar: string;
  name: string;
  name_en: string;
  gender: string;
  country: string;
};

function UserActor(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const getUserActors = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      userActors({ page, per_page })
        .then((res: ResponseType<unknown[]>) => {
          if (res.code === 200) {
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
      onPress={() => navigation.push('ActorDetail', { id: item.id })}
    >
      <View style={styles.item}>
        <Image
          source={{ uri: item.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <View style={styles.itemInfo}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemTitle}>
            {item.name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.name_en}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.itemText}>
            {item.gender}
            {Boolean(item?.country) && (
              <>
                <Text> · </Text>
                {item?.country}
              </>
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // 无数据展示
  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.noData}>
      <Text style={styles.noDataText}>您还没有关注任何影人</Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <ScrollRefresh
        page={1}
        pageSize={10}
        request={getUserActors}
        initialNumToRender={6}
        renderItem={renderItem}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingBottom: Platform.OS !== 'web' ? 10 : 0,
    width: '100%',
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: 16,
    marginRight: -20,
    marginLeft: 16
  },
  itemImage: {
    width: 70,
    height: 92,
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
    fontSize: 13,
    color: '#333'
  },
  itemText: {
    marginTop: 8,
    fontSize: 11,
    color: '#999'
  },
  noData: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 280
  },
  noDataText: {
    fontSize: 13.5,
    color: '#aaa'
  }
});

export default UserActor;
