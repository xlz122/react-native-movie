import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { actorsDetail } from '../../api/actor-detail';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '../../types/index';
import type { Movie } from './actor-wroks/ActorWorks';
import Panel from '../../components/panel/Panel';
import ActorPhoto from './actor-photo/ActorPhoto';
import ActorWorks from './actor-wroks/ActorWorks';

type Route = RouteProp<{ params: { id: number } }>;

type Detail = {
  summary: string[];
  photos: unknown[];
  works_count: number;
  works: Movie[];
};

function ActorDetail(): React.ReactElement {
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<Detail>>({});

  const getActorDetail = () => {
    actorsDetail({ id: route.params.id })
      .then((res: ResponseType<Partial<Detail>>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getActorDetail();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <Panel
        title="个人简介"
        subtitle={'更多信息'}
        panelStyle={{ paddingBottom: 10, marginTop: 10 }}
      >
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.summary}>
          {detail?.summary}
        </Text>
      </Panel>
      {detail?.photos && detail?.photos?.length > 0 && (
        <Panel
          title="相册"
          subtitle={`全部${detail?.photos?.length}张`}
          panelStyle={{ paddingBottom: 10 }}
        >
          <ActorPhoto movie={detail?.photos} />
        </Panel>
      )}
      {detail?.works && detail?.works?.length > 0 && (
        <Panel
          title="影视作品"
          subtitle={`全部${detail?.works_count}部`}
          panelStyle={{ paddingBottom: 10 }}
        >
          <ActorWorks movie={detail?.works} />
        </Panel>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  summary: {
    paddingLeft: 11,
    paddingRight: 11,
    color: '#303133'
  }
});

export default ActorDetail;
