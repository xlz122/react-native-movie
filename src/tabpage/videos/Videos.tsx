import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { timeStampToDuration } from '@/utils/utils';
import { videosList } from '@/api/videos';
import type { ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';
import styles from './videos.css';

function Videos(): React.ReactElement {
  const getVideosList = ({ page, per_page }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      videosList({ page, per_page })
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
    <View style={styles.page}>
      <ScrollRefresh
        page={1}
        pageSize={5}
        request={getVideosList}
        initialNumToRender={6}
        renderItem={renderItem}
      />
    </View>
  );
}

export default Videos;
