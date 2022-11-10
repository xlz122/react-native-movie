import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  videosDetail,
  videoLike,
  unVideoLike,
  followVideo,
  unFollowVideo,
  videoComment
} from '@/api/videos';
import type { RouteProp } from '@react-navigation/native';
import type { RootState } from '@/store/index';
import type { ResponseType, Navigation } from '@/types/index';
import CustomHeader from '@/components/custom-header/CustomHeader';
import CustomAlert from '@/components/custom-alert/CustomAlert';
import Comment from '@/components/comment/Comment';
import Video from './video/Video';
import VideoInfo from './video-info/VideoInfo';
import VideoList from './video-list/VideoList';
import styles from './video-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type Detail = {
  id?: number;
  poster?: string;
  movie?: {
    id?: number;
  };
  is_like?: boolean;
  like_count?: number;
  is_collection?: boolean;
  collection_count?: number;
  comment_count?: number;
};

function VideoDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [detail, setDetail] = useState<Detail>({});

  const getVideoDetail = (id?: number) => {
    videosDetail({ id: id || route.params.id })
      .then((res: ResponseType<Detail>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  // 刷新详情
  const refreshDetail = () => {
    getVideoDetail();
  };

  useEffect(() => {
    getVideoDetail();
  }, []);

  useLayoutEffect(() => {
    // 设置标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerTitleAlign={true}
            headerStyle={{ height: 0 }}
            arrowStyle={{ position: 'absolute', top: 2 }}
          />
        );
      }
    });
  }, []);

  // 预告片列表刷新详情
  const playChange = (id: number) => {
    getVideoDetail(id);
  };

  // 点赞/取消点赞
  const likeChange = (is_like: boolean): boolean | undefined => {
    if (!isLogin) {
      navigation.push('Login');
      return false;
    }

    if (!is_like) {
      videoLike({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }

    if (is_like) {
      unVideoLike({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }
  };

  // 收藏/取消收藏
  const collectionChange = (is_collection: boolean): boolean | undefined => {
    if (!isLogin) {
      navigation.push('Login');
      return false;
    }

    if (!is_collection) {
      followVideo({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }

    if (is_collection) {
      unFollowVideo({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '提示', message: res?.message });
          }
        })
        .catch(() => ({}));
    }
  };

  // 评论
  const [comment, setComment] = useState({
    visible: false
  });

  const handleCommentClose = (): void => {
    setComment({ ...comment, visible: false });
  };

  return (
    <>
      <Video data={detail} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <VideoInfo data={detail} refreshDetail={refreshDetail} />
        <VideoList
          detailId={detail.id}
          movieId={detail.movie?.id}
          playChange={playChange}
        />
      </ScrollView>
      <View style={styles.comment}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setComment({ ...comment, visible: true })}
          style={styles.review}
        >
          <View style={styles.reviewInput}>
            <Text style={styles.reviewInputText}>来点碎碎念...</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.tool}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => likeChange(detail?.is_like!)}
            style={styles.toolItem}
          >
            <Text
              style={[
                styles.toolItemIcon,
                detail?.is_like ? styles.activeIcon : styles.toolItemIcon
              ]}
            >
              {'\ue669'}
            </Text>
            <Text style={styles.toolItemText}>
              {detail?.like_count && detail?.like_count > 0
                ? detail?.like_count
                : '点赞'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => collectionChange(detail?.is_collection!)}
            style={styles.toolItem}
          >
            <Text
              style={[
                styles.toolItemIcon,
                detail?.is_collection ? styles.activeIcon : styles.toolItemIcon
              ]}
            >
              {'\ue911'}
            </Text>
            <Text style={styles.toolItemText}>
              {detail?.collection_count && detail?.collection_count > 0
                ? detail?.collection_count
                : '收藏'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setComment({ ...comment, visible: true })}
            style={styles.toolItem}
          >
            <Text style={styles.toolItemIcon}>{'\ue620'}</Text>
            <Text style={styles.toolItemText}>
              {detail?.comment_count && detail?.comment_count > 0
                ? detail?.comment_count
                : '评论'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {comment.visible && (
        <Comment method={videoComment} close={handleCommentClose} />
      )}
    </>
  );
}

export default VideoDetail;
