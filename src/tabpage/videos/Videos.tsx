import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { timeStampToDuration } from '../../utils/utils';
import { videosList } from '../../api/videos';
import type { ResponseType } from '../../types/index';
import type { VideoParams } from '../../api/videos';
import styles from './videos.css';

type Video = {
  poster: string;
  title: string;
  play_count: number;
  duration: number;
  like_count: number;
  comment_count: number;
  author: {
    avatar: string;
    username: string;
  };
};

function Videos(): React.ReactElement {
  const [video, setVideo] = useState<Video[]>([]);
  const [videoParams] = useState<VideoParams>({
    page: 1,
    per_page: 11
  });

  const getVideosList = () => {
    videosList({ ...videoParams })
      .then((res: ResponseType<Video[]>) => {
        if (res.code === 200) {
          setVideo(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getVideosList();
  }, [videoParams]);

  const renderItem = ({ item }) => (
    <TouchableOpacity activeOpacity={1}>
      <View style={styles.item}>
        <View style={styles.itemCover}>
          <Image
            source={{ uri: item.poster }}
            resizeMode={'stretch'}
            style={[styles.itemImage]}
          />
          <Text style={styles.itemTitle}>{item.title}</Text>
          <View style={styles.itemPlay}>
            <Text style={styles.itemPlayIcon}>{'\ue616'}</Text>
          </View>
          <Text style={styles.itemInfoCount}>{item.play_count}次播放</Text>
          <Text style={styles.itemInfoTime}>
            {timeStampToDuration(item.duration)}
          </Text>
        </View>
        <View style={styles.userinfo}>
          <View style={styles.author}>
            <Image
              source={{ uri: item.author.avatar }}
              resizeMode={'stretch'}
              style={[styles.authorAvatar]}
            />
            <Text style={styles.authorName}>{item.author.username}</Text>
          </View>
          <View style={styles.tool}>
            <Text style={styles.toolIcon}>{'\ue816'}</Text>
            <Text style={styles.toolText}>{item.like_count}</Text>
            <Text style={styles.toolIcon}>{'\ue63d'}</Text>
            <Text style={styles.toolText}>{item.comment_count}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.video}>
      <FlatList
        initialNumToRender={6}
        showsHorizontalScrollIndicator={false}
        data={video}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default Videos;
