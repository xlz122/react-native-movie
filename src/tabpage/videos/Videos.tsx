import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { timeStampToDuration } from '../../utils/utils';
import { getScreenViewHeight } from '../../utils/screen';
import { videosList } from '../../api/videos';
import type { ResponseType } from '../../types/index';
import ScrollRefresh from '../../components/scroll-refresh/ScrollRefresh';
import styles from './videos.css';

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
  const [state, setState] = useState({
    page: 1,
    per_page: 5,
    // 下拉刷新
    isRefresh: false,
    // 加载更多
    isLoadMore: false,
    loadMoreText: ''
  });

  const [video, setVideo] = useState<Video[]>([]);

  const getVideosList = () => {
    videosList({ page: state.page, per_page: state.per_page })
      .then((res: ResponseType<Video[]>) => {
        if (res.code === 200) {
          if (res.data?.length === 0) {
            return false;
          }

          // 下拉刷新、初始化
          if (state.isRefresh || video.length === 0) {
            setVideo(res.data!);
          }

          // 加载更多
          if (state.isLoadMore || res.data?.length !== 0) {
            setVideo(video.concat(res.data!));
          }

          if (res.data && res.data?.length < state.per_page) {
            setState({
              ...state,
              isRefresh: false,
              isLoadMore: false,
              loadMoreText: '没有更多数据了'
            });
          } else {
            setState({
              ...state,
              isRefresh: false,
              isLoadMore: false,
              loadMoreText: '加载更多...'
            });
          }
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getVideosList();
  }, [state.page]);

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

  const onRefresh = (): void => {
    setState({ ...state, isRefresh: true, page: 1 });
  };

  const onEndReached = (): void => {
    setState({
      ...state,
      page: state.page + 1,
      isLoadMore: true,
      loadMoreText: '加载中...'
    });
  };

  return (
    <View style={styles.page}>
      <ScrollRefresh
        height={viewHeight - 50}
        initialNumToRender={4}
        showsVerticalScrollIndicator={false}
        data={video}
        renderItem={renderItem}
        refreshing={state.isRefresh}
        onRefresh={onRefresh}
        loadMoreText={state.loadMoreText}
        onEndReached={onEndReached}
      />
    </View>
  );
}

export default Videos;
