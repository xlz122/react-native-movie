import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import LinearGradinet from 'react-native-linear-gradient';
import { colorToRgba } from '../../utils/utils';
import { getScreenViewHeight } from '../../utils/screen';
import { moviesDetail } from '../../api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '../../types/index';
import type { Movie } from './movie-similar/MovieSimilar';
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
  bgcolor: string;
  cast: unknown[];
  photos: unknown[];
  like_movies: Movie[];
};

function MovieDeail(props: Props): React.ReactElement {
  const { id } = props.route.params;

  const [detail, setDetail] = useState<Partial<Detail>>({});

  const getMovieDetail = () => {
    moviesDetail({ id })
      .then((res: ResponseType<Partial<Detail>>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
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

  useEffect(() => {
    if (gradientColor.length === 2) {
      return;
    }

    // 设置标头
    props.navigation.setOptions({
      header: ({ navigation, options }) => {
        return (
          <CustomHeader
            navigation={navigation}
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
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <LinearGradinet colors={gradientColor}>
        <MovieInfo navigation={props.navigation} data={detail} />
      </LinearGradinet>
      <Panel
        title="相册"
        subtitle={`全部${detail?.photos?.length}`}
        to="/today"
      >
        <MoviePhoto movie={detail?.photos} />
      </Panel>
      {detail?.like_movies && detail?.like_movies?.length > 0 && (
        <Panel title="相似影视" to="" moreIconStyle={{ display: 'none' }}>
          <MovieSimilar
            navigation={props.navigation}
            movie={detail?.like_movies}
          />
        </Panel>
      )}
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
