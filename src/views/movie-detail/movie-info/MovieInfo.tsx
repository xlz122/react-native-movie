import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import type { Navigation } from '../../../types/index';
import Panel from '../../../components/panel/Panel';
import MovieCast from '../movie-cast/MovieCast';

type Props = {
  navigation?: Navigation;
  data: Partial<MovieInfo>;
};

type MovieInfo = {
  title: string;
  poster: {
    small: string;
  };
  year: string;
  genres: string[];
  countries: string[];
  durations: string[];
  thrid_rating: {
    douban: {
      count: string;
      rating: string;
    };
  };
  tags: string[];
  summary: string;
  cast_count: number;
  cast: unknown[];
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
            <View style={styles.operateItem}>
              <Text style={styles.operateIcon}>{'\ue911'}</Text>
              <Text style={styles.operateText}>看过</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.rating}>
        {Boolean(data?.thrid_rating?.douban?.rating) && (
          <>
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
          </>
        )}
        {!data?.thrid_rating?.douban?.rating && (
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
      <Panel
        title="剧情"
        panelStyle={{ backgroundColor: 'transparent' }}
        headerStyle={{ paddingLeft: 0, paddingRight: 2 }}
        lineStyle={{ display: 'none' }}
        titleTextStyle={{ color: '#fff' }}
        moreIconStyle={{ color: '#fff' }}
      >
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.summary}>
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
        <MovieCast movie={data?.cast} />
      </Panel>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {},
  movieInfo: {
    display: 'flex',
    flexDirection: 'row',
    padding: 12
  },
  infoImage: {
    width: 94,
    height: 132,
    borderRadius: 3
  },
  infoDesc: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 15
  },
  descTitle: {
    marginTop: 1,
    marginBottom: 1,
    fontSize: 16,
    color: '#fff',
    fontWeight: '700'
  },
  descBrief: {
    marginTop: 7
  },
  descText: {
    marginTop: 4,
    fontSize: 11,
    color: '#fff'
  },
  operate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 17
  },
  operateItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 18,
    width: 104,
    height: 26,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 5
  },
  operateIcon: {
    marginRight: 3.5,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  operateText: {
    fontSize: 11,
    color: '#fff'
  },
  rating: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 6,
    marginLeft: 12,
    marginRight: 12,
    minHeight: 82,
    backgroundColor: 'rgba(0, 0, 0, .25)',
    borderRadius: 6
  },
  ratingCover: {
    position: 'relative'
  },
  ratingText: {
    fontSize: 11,
    color: '#fff'
  },
  ratingIcon: {
    position: 'absolute',
    top: -3,
    right: -14,
    fontFamily: 'iconfont',
    fontSize: 12,
    color: '#fff'
  },
  ratingScore: {
    marginTop: 3,
    marginBottom: 3,
    fontWeight: '700',
    fontSize: 18,
    color: '#feb300'
  },
  noRating: {
    fontSize: 12,
    color: '#fff'
  },
  tag: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
    marginLeft: 12,
    marginRight: 12
  },
  tagItem: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 12,
    paddingRight: 12,
    marginRight: 8,
    marginBottom: 9,
    backgroundColor: 'hsla(0, 0%, 100%, .1)',
    fontSize: 12,
    color: '#fff',
    borderRadius: 18
  },
  summary: {
    color: '#f5f5f5'
  }
});

export default MovieInfo;
