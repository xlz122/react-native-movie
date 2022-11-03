import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { videosDetail } from '@/api/videos';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import CustomHeader from '@/components/custom-header/CustomHeader';
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
  like_count?: number;
  collection_count?: number;
  comment_count?: number;
};

function VideoDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

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
        <View style={styles.review}>
          <View style={styles.reviewInput}>
            <Text style={styles.reviewInputText}>来点碎碎念...</Text>
          </View>
        </View>
        <View style={styles.tool}>
          <View style={styles.toolItem}>
            <Text style={styles.toolItemIcon}>{'\ue669'}</Text>
            <Text style={styles.toolItemText}>
              {detail?.like_count && detail?.like_count > 0
                ? detail?.like_count
                : '点赞'}
            </Text>
          </View>
          <View style={styles.toolItem}>
            <Text style={styles.toolItemIcon}>{'\ue911'}</Text>
            <Text style={styles.toolItemText}>
              {detail?.collection_count && detail?.collection_count > 0
                ? detail?.collection_count
                : '收藏'}
            </Text>
          </View>
          <View style={styles.toolItem}>
            <Text style={styles.toolItemIcon}>{'\ue620'}</Text>
            <Text style={styles.toolItemText}>
              {detail?.comment_count && detail?.comment_count > 0
                ? detail?.comment_count
                : '评论'}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

export default VideoDetail;
