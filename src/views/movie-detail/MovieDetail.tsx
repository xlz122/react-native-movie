import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { moviesDetail } from '../../api/movies';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '../../types/index';
import Panel from '../../components/panel/Panel';
import Cast from './cast/Cast';
import Photos from './photos/Photos';
import SimilarMovie from './similar-movie/SimilarMovie';

type Props = {
  route: RouteProp<{ params: { id: number } }>;
};

function MovieDeail(props: Props): React.ReactElement {
  const { id } = props.route.params;

  const [movie, setMovie] = useState<any>([]);

  const getMovieDetail = () => {
    moviesDetail({ id })
      .then((res: ResponseType<any[]>) => {
        if (res.code === 200) {
          console.log(res);
          setMovie(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <View style={styles.theater}>
      <View style={styles.warp}>
        <Panel title="演员" subtitle={`全部${movie?.cast?.length}`} to="/today">
          <Cast movie={movie?.cast} />
        </Panel>
      </View>
      <Panel title="相册" subtitle={`全部${movie?.photos?.length}`} to="/today">
        <Photos movie={movie?.photos} />
      </Panel>
      <Panel
        title="相似影视"
        subtitle={`${movie?.like_movies?.length}部`}
        to="/today"
      >
        <SimilarMovie movie={movie?.like_movies} />
      </Panel>
    </View>
  );
}

const styles = StyleSheet.create({
  theater: {
    paddingTop: 8,
    backgroundColor: '#fff'
  },
  warp: {
    backgroundColor: '#262c38'
  }
});

export default MovieDeail;
