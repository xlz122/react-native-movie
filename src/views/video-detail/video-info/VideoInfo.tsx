import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '@/types/index';
import styles from './video-info.css';

type Props = {
  data: InfoType;
  refreshDetail: () => void;
};

type InfoType = {
  id?: number;
  author?: {
    avatar?: string;
    username?: string;
    video_count?: number;
  };
  title?: string;
  created_at?: string;
  play_count?: number;
  movie?: {
    id?: number;
    poster?: string;
    title?: string;
    rating?: string;
    year?: number;
    countries?: string;
    genres?: string;
  };
};

function VideoInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();

  const { data } = props;

  return (
    <View style={styles.page}>
      <View style={styles.authorWarp}>
        <View style={styles.author}>
          <Image
            source={{ uri: data?.author?.avatar }}
            resizeMode={'stretch'}
            style={[styles.authorAvatar]}
          />
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{data?.author?.username}</Text>
            <Text style={styles.authorCount}>
              上传视频 {data?.author?.video_count} 个
            </Text>
          </View>
        </View>
        <Text style={styles.reportBtn}>举报</Text>
      </View>
      <Text style={styles.title}>{data.title}</Text>
      <View style={styles.otherWarp}>
        <Text style={styles.otherText}>发布于 {data.created_at}</Text>
        <Text style={styles.otherText}>{data.play_count} 次播放</Text>
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => navigation.push('MovieDetail', { id: data?.movie?.id })}
        style={styles.movie}
      >
        <Image
          source={{ uri: data?.movie?.poster }}
          resizeMode={'stretch'}
          style={[styles.movieImage]}
        />
        <View style={styles.movieInfo}>
          <View style={styles.infoTitle}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.titleText}
            >
              {data.movie?.title}
            </Text>
            <Text style={styles.titleRating}>{data.movie?.rating}分</Text>
          </View>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.infoDesc}>
            <Text>{data?.movie?.year}</Text>
            <Text>·</Text>
            <Text>{data?.movie?.countries}</Text>
            <Text>·</Text>
            <Text>{data?.movie?.genres}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default VideoInfo;
