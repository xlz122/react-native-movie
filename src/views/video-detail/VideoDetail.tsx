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

export type VideoDetailType = {
  id?: number;
  poster?: string;
  movie?: {
    id?: number;
    poster?: string;
    title?: string;
    rating?: string;
    year?: number;
    countries?: string;
    genres?: string;
  };
  is_like?: boolean;
  like_count?: number;
  is_collection?: boolean;
  collection_count?: number;
  comment_count?: number;
  author?: {
    avatar?: string;
    username?: string;
    video_count?: number;
  };
  title?: string;
  created_at?: string;
  play_count?: number;
};

function VideoDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [detail, setDetail] = useState<VideoDetailType>({});

  const getVideoDetail = (id?: number) => {
    videosDetail({ id: id || route.params.id })
      .then((res: ResponseType<VideoDetailType>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  // ????????????
  const refreshDetail = () => {
    getVideoDetail();
  };

  useEffect(() => {
    getVideoDetail();
  }, []);

  useLayoutEffect(() => {
    // ????????????
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

  // ???????????????????????????
  const playChange = (id: number) => {
    getVideoDetail(id);
  };

  // ??????/????????????
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
            CustomAlert({ title: '??????', message: res?.message });
          }
        })
        .catch(() => ({}));
    }

    if (is_like) {
      unVideoLike({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '??????', message: res?.message });
          }
        })
        .catch(() => ({}));
    }
  };

  // ??????/????????????
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
            CustomAlert({ title: '??????', message: res?.message });
          }
        })
        .catch(() => ({}));
    }

    if (is_collection) {
      unFollowVideo({ id: route.params.id })
        .then((res: ResponseType) => {
          if (res.code === 200) {
            getVideoDetail();
            CustomAlert({ title: '??????', message: res?.message });
          }
        })
        .catch(() => ({}));
    }
  };

  // ??????
  const [comment, setComment] = useState({
    visible: false
  });

  const handleCommentClose = (): void => {
    setComment({ ...comment, visible: false });
  };

  return (
    <>
      <Video detail={detail} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <VideoInfo detail={detail} refreshDetail={refreshDetail} />
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
            <Text style={styles.reviewInputText}>???????????????...</Text>
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
                : '??????'}
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
                : '??????'}
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
                : '??????'}
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
