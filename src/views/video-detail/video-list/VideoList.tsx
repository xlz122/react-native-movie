import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList
} from 'react-native';
import { timeStampToDuration, formatDate } from '@/utils/utils';
import { videosDetailList } from '@/api/videos';
import type { ListRenderItemInfo } from 'react-native';
import type { ResponseType } from '@/types/index';
import styles from './video-list.css';

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
                      {formatDate(item.created_at)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        {detail?.videos[navIndex] &&
          detail?.videos[navIndex]?.children.length === 0 && (
            <Text style={styles.noDataText}>暂无视频</Text>
          )}
      </View>
    </ScrollView>
  );
}

export default VideoList;
