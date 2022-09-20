import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { moviePhotos } from '../../api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { Navigation, ResponseType } from '../../types/index';
import type { MoviePhotosParams } from '../../api/movies';

type Props = {
  navigation: Navigation;
  route: RouteProp<{ params: { movieId: number } }>;
};

type Photo = {
  url: string;
};

function Photos(props: Props): React.ReactElement {
  const { movieId } = props.route.params;

  const [tab] = useState([
    { title: '全部', type: 'all' },
    { title: '海报', type: 'poster' },
    { title: '剧照', type: 'still' },
    { title: '截图', type: 'cut' },
    { title: '其他', type: 'other' }
  ]);
  const [photo, setPhoto] = useState<Photo[]>([]);
  const [photoParams, setPhotoParams] = useState<MoviePhotosParams>({
    id: 0,
    page: 1,
    per_page: 11,
    type: 'all'
  });

  useEffect(() => {
    if (!movieId) {
      return;
    }

    setPhotoParams({ ...photoParams, id: movieId });
  }, [movieId]);

  const getMoviePhotos = () => {
    moviePhotos({ ...photoParams })
      .then((res: ResponseType<Photo[]>) => {
        if (res.code === 200) {
          setPhoto(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMoviePhotos();
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 10
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10
  },
  itemImage: {
    width: 93,
    height: 124,
    borderRadius: 3
  }
});

export default Photos;
