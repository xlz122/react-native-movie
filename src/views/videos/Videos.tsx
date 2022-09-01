import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { getScreenWidth, getScreenViewHeight } from '../../utils/screen';
import { timeStampToDuration } from '../../utils/utils';
import { videosData } from '../../api/videos';
import type { ResponseType } from '../../types/index';
import type { VideoParams } from '../../api/videos';

// 获取屏幕宽度
const deviceWidth = getScreenWidth();
// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

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

  const getCategoriesData = () => {
    videosData({ ...videoParams })
      .then((res: ResponseType<Video[]>) => {
        if (res.code === 200) {
          setVideo(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getCategoriesData();
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

const styles = StyleSheet.create({
  video: {
    paddingTop: 15,
    paddingBottom: 15,
    height: viewHeight,
    backgroundColor: '#fff'
  },
  item: {
    marginLeft: 11,
    marginRight: 11
  },
  itemCover: {
    position: 'relative'
  },
  itemImage: {
    width: deviceWidth - 22,
    height: 196,
    borderRadius: 4
  },
  itemTitle: {
    position: 'absolute',
    top: 7,
    left: 10,
    fontSize: 14,
    color: '#fff'
  },
  itemPlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -22.5,
    marginLeft: -22.5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 45,
    height: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    borderRadius: 100
  },
  itemPlayIcon: {
    fontFamily: 'iconfont',
    fontSize: 16,
    color: '#fff'
  },
  itemInfoCount: {
    position: 'absolute',
    top: '88%',
    left: 11,
    fontSize: 10,
    color: '#fff'
  },
  itemInfoTime: {
    position: 'absolute',
    top: '88%',
    right: 11,
    fontSize: 10,
    color: '#fff'
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 11,
    paddingRight: 11,
    height: 49
  },
  author: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  authorAvatar: {
    width: 31,
    height: 31
  },
  authorName: {
    marginLeft: 6,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    fontSize: 11.5,
    color: '#303133'
  },
  tool: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  toolIcon: {
    marginLeft: 11,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#303133'
  },
  toolText: {
    marginLeft: 3,
    fontSize: 10,
    color: '#303133'
  }
});

export default Videos;
