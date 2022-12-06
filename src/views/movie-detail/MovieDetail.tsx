import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '@/utils/utils';
import { deviceHeight } from '@/utils/screen';
import { moviesDetail, movieComment } from '@/api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import type { ActorItemType } from './movie-actor/MovieActor';
import type { ItemType } from './movie-similar/MovieSimilar';
import type { RoleItemType } from './movie-roles/MovieRoles';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import Comment from '@/components/comment/Comment';
import MovieInfo from './movie-info/MovieInfo';
import MovieActor from './movie-actor/MovieActor';
import MovieRoles from './movie-roles/MovieRoles';
import MoviePhoto from './movie-photo/MoviePhoto';
import MovieSimilar from './movie-similar/MovieSimilar';
import styles from './movie-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

export type MovieDetailType = {
  bgcolor: string;
  cast: ActorItemType[];
  photos: {
    url: string;
  }[];
  like_movies: ItemType[];
  review_count: number;
  collection_count: number;
  comment_count: number;
  id: number;
  title?: string;
  title_original?: string;
  poster: {
    small: string;
  };
  year: number;
  release_status: number;
  release_date: string;
  genres: string[];
  countries: string[];
  durations: string[];
  episode_count: number;
  wish_count: number;
  is_wish: boolean;
  rating: string;
  awards_nominate_count: number;
  thrid_rating: {
    douban: {
      count: string;
      rating: string;
    };
  };
  tags: string[];
  egg_hunt: number;
  summary: string;
  cast_count: number;
  role_count: number;
  roles: RoleItemType[];
  akas: string[];
  languages: string[];
  category: string;
  pubdates: string[];
  color: number;
  season_count: number;
};

function MovieDeail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<MovieDetailType>>({});

  const getMovieDetail = () => {
    moviesDetail({ id: route.params.id })
      .then((res: ResponseType<Partial<MovieDetailType>>) => {
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

  // 评论
  const [comment, setComment] = useState({
    visible: false
  });

  const handleCommentClose = (): void => {
    setComment({ ...comment, visible: false });
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <LinearGradinet colors={gradientColor}>
          <MovieInfo
            detail={detail as MovieDetailType}
            refreshDetail={refreshDetail}
          />
          <Panel
            title="剧情"
            to={{ path: 'MovieSummary', params: { detail: detail } }}
            panelStyle={{ backgroundColor: 'transparent' }}
            headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
            lineStyle={{ display: 'none' }}
            titleTextStyle={{ color: '#fff' }}
            moreIconStyle={{ color: '#fff' }}
          >
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
              {detail?.summary}
            </Text>
          </Panel>
          <Panel
            title="演员"
            subtitle={`全部${detail?.cast_count}`}
            to={{ path: 'ActorList', params: { movieId: detail.id } }}
            panelStyle={{ backgroundColor: 'transparent' }}
            headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
            lineStyle={{ display: 'none' }}
            titleTextStyle={{ color: '#fff' }}
            subTitleStyle={{ color: '#fff' }}
            moreIconStyle={{ color: '#fff' }}
          >
            <MovieActor movie={detail?.cast || []} />
          </Panel>
          {detail?.roles && detail?.roles?.length > 0 && (
            <Panel
              title="角色"
              subtitle={`全部${detail?.role_count}`}
              panelStyle={{ backgroundColor: 'transparent' }}
              headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
              lineStyle={{ display: 'none' }}
              titleTextStyle={{ color: '#fff' }}
              subTitleStyle={{ color: '#fff' }}
              moreIconStyle={{ color: '#fff' }}
            >
              <MovieRoles movie={detail?.roles} />
            </Panel>
          )}
        </LinearGradinet>
        {detail?.photos && detail?.photos?.length > 0 && (
          <Panel
            title="相册"
            subtitle={`全部${detail?.photos?.length}`}
            to={{ path: 'MoviePhotoDetail', params: { id: route.params.id } }}
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
        <Comment
          method={movieComment}
          close={handleCommentClose}
          commentStyle={{ height: deviceHeight - 42 }}
        />
      )}
    </>
  );
}

export default MovieDeail;
