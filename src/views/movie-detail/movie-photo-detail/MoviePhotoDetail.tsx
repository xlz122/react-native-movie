import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { moviePhotos } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '@/types/index';

type Route = RouteProp<{ params: { id: number } }>;

type Photo = {
  url: string;
};

function MoviePhotoDetail(): React.ReactElement {
  const route: Route = useRoute();

  const [tab] = useState([
    { title: '全部', type: 'all' },
    { title: '海报', type: 'poster' },
    { title: '剧照', type: 'still' },
    { title: '截图', type: 'cut' },
    { title: '其他', type: 'other' }
  ]);
  const [photo, setPhoto] = useState<Photo[]>([]);
  const [photoParams, setPhotoParams] = useState({
    id: 0,
    page: 1,
    per_page: 11,
    type: 'all'
  });

  useEffect(() => {
    if (!route.params.id) {
      return;
    }

    setPhotoParams({ ...photoParams, id: route.params.id });
  }, [route.params.id]);

  const getPhotos = () => {
    moviePhotos({ ...photoParams })
      .then((res: ResponseType<Photo[]>) => {
        if (res.code === 200) {
          setPhoto(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!route.params.id || photoParams.id === 0) {
      return;
    }

    getPhotos();
  }, [photoParams]);

  const toggleSort = (value: string): void => {
    setPhotoParams({ ...photoParams, type: value });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <View style={styles.tab}>
        {tab.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => toggleSort(item.type)}
              style={styles.tabItem}
            >
              <Text
                style={[
                  styles.itemText,
                  photoParams.type === item.type
                    ? styles.activeText
                    : styles.itemText
                ]}
              >
                {item.title}
              </Text>
              <View
                style={
                  photoParams.type === item.type ? styles.activeLine : null
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.list}>
        {photo.map((item, index) => {
          return (
            <TouchableOpacity key={index} activeOpacity={1} style={styles.item}>
              <Image
                source={{ uri: item.url }}
                resizeMode={'stretch'}
                style={[styles.itemImage]}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#fff'
  },
  tab: {
    display: 'flex',
    flexDirection: 'row',
    height: 44,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  tabItem: {
    position: 'relative',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  itemText: {
    fontSize: 12,
    color: '#7d7e80',
    textAlign: 'center'
  },
  activeText: {
    color: '#e54847'
  },
  activeLine: {
    position: 'absolute',
    left: '50%',
    bottom: 2.8,
    marginLeft: -12,
    width: 24,
    height: 4,
    backgroundColor: 'rgb(229, 72, 71)',
    borderRadius: 6
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    padding: 10
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 6,
    marginBottom: 10
  },
  itemImage: {
    width: 93,
    height: 124,
    borderRadius: 3
  }
});

export default MoviePhotoDetail;
