import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { viewHeight } from '@/utils/screen';
import { movieActor } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';

type Route = RouteProp<{ params: { movieId: number } }>;

type ActorType = {
  id: number;
  name: string;
  children: unknown[];
};

type ItemType = {
  item: {
    id: number;
    avatar: string;
    name: string;
    name_en: string;
    gender: string;
    country: string;
  };
  index: number;
  length: number;
};

function ActorList(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [actor, setActor] = useState<ActorType[]>([]);

  const getMovieActor = () => {
    movieActor({ id: route.params.movieId })
      .then((res: ResponseType<ActorType[]>) => {
        if (res.code === 200) {
          setActor(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieActor();
  }, []);

  const RenderItem = ({ item, index, length }: ItemType) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => navigation.push('ActorDetail', { id: item.id })}
    >
      <View
        style={[
          styles.listItem,
          index === length - 1 ? styles.listLastItem : styles.listItem
        ]}
      >
        <Image
          source={{ uri: item.avatar }}
          resizeMode={'stretch'}
          style={[styles.listItemImage]}
        />
        <View style={styles.listItemInfo}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
          <Text style={styles.listItemText}>{item.name_en}</Text>
          <Text style={styles.listItemText}>
            {item?.gender}
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

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <View style={styles.list}>
        {actor.map((item, index) => {
          return (
            <View key={index} style={styles.item}>
              <View style={styles.itemHeader}>
                <View style={styles.itemHeaderSpot} />
                <Text style={styles.itemHeaderText}>{item.name}</Text>
                <Text style={styles.itemHeaderCount}>
                  ({item.children.length})
                </Text>
              </View>
              <View style={styles.itemList}>
                {item?.children?.map((citem, cindex) => {
                  return (
                    <RenderItem
                      key={cindex}
                      item={citem as ItemType['item']}
                      index={cindex}
                      length={item?.children?.length}
                    />
                  );
                })}
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    // web端需要减去标题高度
    height: Platform.OS === 'web' ? viewHeight - 42 : viewHeight,
    backgroundColor: '#f5f5f5'
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%'
  },
  itemHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    width: '100%',
    height: 45
  },
  itemHeaderSpot: {
    marginRight: 5,
    width: 4,
    height: 4,
    backgroundColor: '#f8a52d'
  },
  itemHeaderText: {
    fontWeight: '700',
    fontSize: 12,
    color: '#303133'
  },
  itemHeaderCount: {
    marginLeft: 3,
    fontSize: 10,
    color: '#303133'
  },
  itemList: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    backgroundColor: '#fff'
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 8,
    marginHorizontal: 15,
    borderBottomWidth: 0.38,
    borderStyle: 'solid',
    borderColor: '#dedede'
  },
  listItemImage: {
    width: 68,
    height: 90,
    borderRadius: 3
  },
  listItemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 13
  },
  listItemTitle: {
    marginBottom: 1,
    fontSize: 14,
    color: '#333'
  },
  listItemText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999'
  },
  listLastItem: {
    borderBottomWidth: 0
  }
});

export default ActorList;
