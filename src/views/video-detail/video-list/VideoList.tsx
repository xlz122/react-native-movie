import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { timeStampToDuration } from '@/utils/utils';
import { videosDetailList } from '@/api/videos';
import type { ListRenderItemInfo } from 'react-native';
import type { ResponseType } from '@/types/index';

type Props = {
  detailId?: number;
  movieId?: number;
  playChange: (id: number) => void;
};

type Detail = {
  videos: ItemType[];
};

type ItemType = {
  type: string;
  count: number;
  children: {
    id: number;
    title: string;
    poster: string;
    duration: number;
    like_count: number;
    play_count: number;
    created_at: string;
  }[];
};

function VideoList(props: Props): React.ReactElement {
  const [detail, setDetail] = useState<Detail>({
    videos: []
  });

  const getVideoList = () => {
    videosDetailList({ id: props.movieId! })
      .then((res: ResponseType<Detail>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    if (!props.movieId) {
      return;
    }

    getVideoList();
  }, [props.movieId]);

  const [navIndex, setNavIndex] = useState(0);

  const renderItem = ({ item, index }: ListRenderItemInfo<ItemType>) => (
    <TouchableOpacity activeOpacity={1} onPress={() => setNavIndex(index)}>
      <Text
        style={[
          styles.navItem,
          index === navIndex ? styles.navActiveItem : null
        ]}
      >
        {item.type} {item.count}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.page}>
      <View style={styles.nav}>
        <FlatList
          horizontal
          initialNumToRender={4}
          showsHorizontalScrollIndicator={false}
          data={detail.videos}
          renderItem={renderItem}
        />
      </View>
      <View>
        {detail?.videos[navIndex] &&
          detail?.videos[navIndex]?.children.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={1}
                onPress={() => props?.playChange(item.id)}
                style={styles.videoItem}
              >
                <View style={styles.itemCover}>
                  <Image
                    source={{ uri: item?.poster }}
                    resizeMode={'stretch'}
                    style={[styles.coverImage]}
                  />
                  <Text style={styles.coverText}>
                    {timeStampToDuration(item.duration)}
                  </Text>
                  {item.id === props.detailId && (
                    <View style={styles.coverMask}>
                      <Text style={styles.coverMaskText}>播放中</Text>
                    </View>
                  )}
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.infoTitle}>{item.title}</Text>
                  <View style={styles.infoDesc}>
                    <Text style={styles.descText}>
                      {item.like_count}
                      <Text>赞</Text>
                      <Text> · </Text>
                      {item.play_count}
                      <Text>播放</Text>
                    </Text>
                    <Text style={styles.descText}>
                      {item.created_at?.slice(0, 10)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff'
  },
  nav: {
    marginVertical: 7.5,
    marginHorizontal: 15
  },
  navItem: {
    paddingVertical: 2.5,
    paddingHorizontal: 10,
    marginRight: 10,
    fontSize: 11,
    color: '#303133',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: 'hsla(0, 0%, 66.7%, .35)',
    borderRadius: 18
  },
  navActiveItem: {
    backgroundColor: 'rgba(229, 72, 71, .15)',
    borderColor: 'rgba(229, 72, 71, .35)',
    color: '#e54847'
  },
  videoItem: {
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 15,
    marginHorizontal: 15
  },
  itemCover: {
    position: 'relative'
  },
  coverImage: {
    width: 122,
    height: 70,
    borderRadius: 4
  },
  coverText: {
    position: 'absolute',
    top: 47,
    right: 6,
    zIndex: 2,
    fontSize: 9,
    color: '#fff'
  },
  coverMask: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    width: 122,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, .45)'
  },
  coverMaskText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 2,
    marginTop: -8,
    marginLeft: -11.5,
    fontSize: 10,
    color: '#fff'
  },
  itemInfo: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: 10
  },
  infoTitle: {
    fontWeight: '700',
    fontSize: 12.5,
    color: '#303133'
  },
  infoDesc: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  descText: {
    fontSize: 10,
    color: '#999'
  }
});

export default VideoList;
