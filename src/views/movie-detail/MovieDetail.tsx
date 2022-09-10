import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';
import { moviesDetail } from '../../api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '../../types/index';
import CustomHeader from '../../components/custom-header/CustomHeader';
import MovieInfo from './movie-info/MovieInfo';
import Panel from '../../components/panel/Panel';
import MoviePhoto from './movie-photo/MoviePhoto';
import MovieSimilar from './movie-similar/MovieSimilar';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

type Props = {
  navigation: Navigation;
  route: RouteProp<{ params: { id: number } }>;
};

type Detail = {
  cast: unknown[];
  photos: unknown[];
  like_movies: unknown[];
};

function MovieDeail(props: Props): React.ReactElement {
  const { id } = props.route.params;

  const [detail, setDetail] = useState<Partial<Detail>>({});

  const getMovieDetail = () => {
    moviesDetail({ id })
      .then((res: ResponseType<Partial<Detail>>) => {
        if (res.code === 200) {
          console.log(res);
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieDetail();

    // 设置标头
    props.navigation.setOptions({
      header: ({ navigation, options }) => {
        return (
          <CustomHeader
            navigation={navigation}
            options={options}
            headerTitleAlign={true}
            // headerStyle={{
            //   backgroundColor: 'transparent'
            // }}
          />
        );
      }
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <MovieInfo navigation={props.navigation} data={detail} />
      <Panel
        title="相册"
        subtitle={`全部${detail?.photos?.length}`}
        to="/today"
      >
        <MoviePhoto movie={detail?.photos} />
      </Panel>
      <Panel title="相似影视" to="" moreIconStyle={{ display: 'none' }}>
        <MovieSimilar movie={detail?.like_movies} />
      </Panel>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    height: viewHeight,
    backgroundColor: '#f5f5f5'
  }
});

export default MovieDeail;
