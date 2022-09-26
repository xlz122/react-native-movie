import React from 'react';
import { View, Text, Image } from 'react-native';
import Panel from '../../../components/panel/Panel';
import MovieActor from '../movie-actor/MovieActor';
import MovieRoles from '../movie-roles/MovieRoles';
import styles from './movie-info.css';

type Props = {
  data: Partial<MovieInfo>;
};

type MovieInfo = {
  title: string;
  poster: {
    small: string;
  };
  year: string;
  release_status: number;
  genres: string[];
  countries: string[];
  durations: string[];
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
  cast: unknown[];
  role_count: number;
  roles: unknown[];
};

function MovieInfo(props: Props): React.ReactElement {
  const { data } = props;

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
              {data?.durations && data?.durations[0] && (
                <Text>{`·${data?.durations?.join(' / ')}`}</Text>
              )}
            </Text>
          </View>
          <View style={styles.operate}>
            <View style={styles.operateItem}>
              <Text style={styles.operateIcon}>{'\ue60a'}</Text>
              <Text style={styles.operateText}>想看</Text>
            </View>
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
