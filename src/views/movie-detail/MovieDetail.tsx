import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '@/utils/utils';
import { moviesDetail } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import type { MovieInfoType } from './movie-info/MovieInfo';
import type { ItemType } from './movie-similar/MovieSimilar';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import MovieInfo from './movie-info/MovieInfo';
import MoviePhoto from './movie-photo/MoviePhoto';
import MovieSimilar from './movie-similar/MovieSimilar';
import styles from './movie-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

type Detail = {
  bgcolor: string;
  cast: unknown[];
  photos: {
    url: string;
  }[];
  like_movies: ItemType[];
  review_count: number;
  collection_count: number;
  comment_count: number;
} & MovieInfoType;

function MovieDeail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<Detail>>({});

  const getMovieDetail = () => {
    moviesDetail({ id: route.params.id })
      .then((res: ResponseType<Partial<Detail>>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  // 刷新详情
  const refreshDetail = () => {
    getMovieDetail();
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  // 渐变背景色
  const [gradientColor, setGradientColor] = useState<string[]>([
    '#f5f5f5',
    '#f5f5f5'
  ]);

  const handlerGradualChange = (color: string): void => {
    const result: string[] = [];

    const gradient = [0.9, 0.82, 0.7, 0.68];
    gradient.forEach((item: number) => {
      result.push(colorToRgba(color, item));
    });

    setGradientColor(result);
  };

  useEffect(() => {
    if (!detail || Object.keys(detail).length === 0 || !detail.bgcolor) {
      return;
    }

    handlerGradualChange(detail.bgcolor);
  }, [detail]);

  useLayoutEffect(() => {
    // 设置加载时标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerTitleAlign={true}
            headerStyle={{
              backgroundColor: 'transparent'
            }}
          />
        );
      }
    });
  }, []);

  useEffect(() => {
    if (gradientColor.length === 2) {
      return;
    }

    // 设置标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerTitleAlign={true}
            headerStyle={{
              backgroundColor: gradientColor[0]
            }}
          />
        );
      }
    });
  }, [gradientColor]);

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <LinearGradinet colors={gradientColor}>
          <MovieInfo
            data={detail as MovieInfoType}
            refreshDetail={refreshDetail}
          />
        </LinearGradinet>
        {detail?.photos && detail?.photos?.length > 0 && (
          <Panel
            title="相册"
            subtitle={`全部${detail?.photos?.length}`}
            to={{ path: 'Photos', params: { movieId: route.params.id } }}
            panelStyle={{ marginTop: 10 }}
          >
            <MoviePhoto photo={detail?.photos} />
          </Panel>
        )}
        {detail?.like_movies && detail?.like_movies?.length > 0 && (
          <Panel title="相似影视" moreIconStyle={{ display: 'none' }}>
            <MovieSimilar movie={detail?.like_movies} />
          </Panel>
        )}
      </ScrollView>
      <View style={styles.comment}>
        <View style={styles.review}>
          <Text style={styles.reviewIcon}>{'\ue650'}</Text>
          <Text style={styles.reviewText}>
            {detail?.review_count && detail?.review_count > 0
              ? `共有${detail?.review_count}条影评`
              : '还没有人发布过影评'}
          </Text>
        </View>
        <View style={styles.tool}>
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

export default MovieDeail;
