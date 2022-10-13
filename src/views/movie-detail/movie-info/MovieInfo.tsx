import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { movieWish } from '@/api/movies';
import type { RootState } from '@/store/index';
import type { ResponseType, Navigation } from '@/types/index';
import type { ActorItemType } from '../movie-actor/MovieActor';
import type { RoleItemType } from '../movie-roles/MovieRoles';
import Panel from '@/components/panel/Panel';
import MovieActor from '../movie-actor/MovieActor';
import MovieRoles from '../movie-roles/MovieRoles';
import styles from './movie-info.css';

type Props = {
  data: MovieInfoType;
  refreshDetail: () => void;
};

export type MovieInfoType = {
  id: number;
  title?: string;
  poster: {
    small: string;
  };
  year: number;
  release_status: number;
  genres: string[];
  countries: string[];
  durations: string[];
  episode_count: number;
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
  cast: ActorItemType[];
  role_count: number;
  roles: RoleItemType[];
};

function MovieInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const { data } = props;

  // 想看/取消想看
  const movieWishChange = (): boolean | undefined => {
    if (!isLogin) {
      navigation.push('Login');
      return false;
    }

    movieWish({ id: data.id })
      .then((res: ResponseType<unknown>) => {
        if (res.code === 200) {
          props.refreshDetail();
          Alert.alert('提示', res?.message, [{ text: '确认' }]);
        }
      })
      .catch(() => ({}));
  };

  return (
    <View style={styles.page}>
      <View style={styles.movieInfo}>
        <Image
          source={{ uri: data?.poster?.small }}
          resizeMode={'stretch'}
          style={[styles.infoImage]}
        />
        <View style={styles.infoDesc}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.descTitle}>
            {data?.title}
          </Text>
          <View style={styles.descBrief}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.descText}
            >
              {data?.genres?.join(' / ')}
            </Text>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.descText}
            >
              <Text>{data?.countries?.join(' / ')}</Text>
              <Text>·</Text>
              <Text>{data?.year}</Text>
              {data?.episode_count === 0 && (
                <Text>{`·${data?.durations?.join(' / ')}`}</Text>
              )}
            </Text>
            {data?.episode_count > 0 && (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.descText}
              >
                <Text>{`共${data?.episode_count}集`}</Text>
                <Text>·</Text>
                <Text>{`每集${data?.durations[0]}分钟`}</Text>
              </Text>
            )}
          </View>
          <View style={styles.operate}>
            <TouchableOpacity activeOpacity={1} onPress={movieWishChange}>
              <View
                style={[
                  styles.operateItem,
                  data?.is_wish ? styles.operateActiveItem : styles.operateItem
                ]}
              >
                <Text style={styles.operateIcon}>{'\ue60a'}</Text>
                <Text style={styles.operateText}>
                  {data?.is_wish ? '已想看' : '想看'}
                </Text>
              </View>
            </TouchableOpacity>
            {data?.release_status !== 1 && (
              <View style={styles.operateItem}>
                <Text style={styles.operateIcon}>{'\ue911'}</Text>
                <Text style={styles.operateText}>看过</Text>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={styles.rating}>
        {Boolean(data?.rating) && (
          <View style={styles.ratingItem}>
            <View style={styles.ratingCover}>
              <Text style={styles.ratingText}>慕影评分</Text>
              <View style={styles.ratingLine} />
            </View>
            <Text style={styles.ratingScore}>{data?.rating}</Text>
            <Text style={styles.ratingText}>
              {data?.awards_nominate_count}
              <Text>人评</Text>
            </Text>
          </View>
        )}
        {Boolean(data?.thrid_rating?.douban?.rating) && (
          <View style={styles.ratingItem}>
            <View style={styles.ratingCover}>
              <Text style={styles.ratingText}>豆瓣评分</Text>
              <Text style={styles.ratingIcon}>{'\ue602'}</Text>
            </View>
            <Text style={styles.ratingScore}>
              {data?.thrid_rating?.douban?.rating}
            </Text>
            <Text style={styles.ratingText}>
              {data?.thrid_rating?.douban?.count}
              <Text>人评</Text>
            </Text>
          </View>
        )}
        {!data?.rating && !data?.thrid_rating?.douban?.rating && (
          <Text style={styles.noRating}>暂无评分</Text>
        )}
      </View>
      <View style={styles.tag}>
        {data?.tags?.map((item, index) => {
          return (
            <Text key={index} style={styles.tagItem}>
              {item}
            </Text>
          );
        })}
      </View>
      {Boolean(data?.egg_hunt) && (
        <View style={styles.egg}>
          <Text style={styles.eggIcon}>{'\ue61e'}</Text>
          <Text style={styles.eggText}>
            {`有${data?.egg_hunt}个彩蛋,不要错过哦~ `}
          </Text>
        </View>
      )}
      <Panel
        title="剧情"
        panelStyle={{ backgroundColor: 'transparent' }}
        headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
        lineStyle={{ display: 'none' }}
        titleTextStyle={{ color: '#fff' }}
        moreIconStyle={{ color: '#fff' }}
      >
        <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
          {data?.summary}
        </Text>
      </Panel>
      <Panel
        title="演员"
        subtitle={`全部${data?.cast_count}`}
        to={{ path: 'ActorList', params: { movieId: data.id } }}
        panelStyle={{ backgroundColor: 'transparent' }}
        headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
        lineStyle={{ display: 'none' }}
        titleTextStyle={{ color: '#fff' }}
        subTitleStyle={{ color: '#fff' }}
        moreIconStyle={{ color: '#fff' }}
      >
        <MovieActor movie={data?.cast} />
      </Panel>
      {data?.roles && data?.roles?.length > 0 && (
        <Panel
          title="角色"
          subtitle={`全部${data?.role_count}`}
          panelStyle={{ backgroundColor: 'transparent' }}
          headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
          lineStyle={{ display: 'none' }}
          titleTextStyle={{ color: '#fff' }}
          subTitleStyle={{ color: '#fff' }}
          moreIconStyle={{ color: '#fff' }}
        >
          <MovieRoles movie={data?.roles} />
        </Panel>
      )}
    </View>
  );
}

export default MovieInfo;
