import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { actorsDetail } from '../../api/actor-detail';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '../../types/index';
import type { Movie } from './actor-wroks/ActorWorks';
import Panel from '../../components/panel/Panel';
import ActorInfo from './actor-info/ActorInfo';
import ActorPhoto from './actor-photo/ActorPhoto';
import ActorWorks from './actor-wroks/ActorWorks';

type Route = RouteProp<{ params: { id: number } }>;

type Detail = {
  avatar?: string;
  collection_count: number;
  works_count: number;
  role_count: number;
  summary: string[];
  photos: unknown[];
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
      <ActorInfo data={detail} />
      <View style={styles.count}>
        <View style={styles.countItem}>
          <Text style={styles.countItemValue}>{detail?.collection_count}</Text>
          <Text style={styles.countItemLabel}>已关注数</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.countItemValue}>{detail?.works_count}部</Text>
          <Text style={styles.countItemLabel}>作品总数</Text>
        </View>
        <View style={[styles.countItem, styles.countLastItem]}>
          <Text style={styles.countItemValue}>{detail?.role_count}个</Text>
          <Text style={styles.countItemLabel}>饰演角色</Text>
        </View>
      </View>
      <Panel
        title="个人简介"
        subtitle={'更多信息'}
        panelStyle={{ paddingBottom: 10, marginTop: 10 }}
      >
        {Boolean(detail?.summary) && (
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.summary}>
            {detail?.summary}
          </Text>
        )}
        {!detail?.summary && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>暂无简介</Text>
          </View>
        )}
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
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    margin: 10,
    height: 77,
    backgroundColor: '#fff',
    borderRadius: 4
  },
  countItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#e5e5e5'
  },
  countItemValue: {
    fontWeight: '700',
    fontSize: 14,
    color: '#303133'
  },
  countItemLabel: {
    fontSize: 14,
    color: '#888'
  },
  countLastItem: {
    borderRightWidth: 0
  },
  summary: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 11,
    paddingRight: 11,
    color: '#303133'
  },
  summaryText: {
    height: 82,
    lineHeight: 82,
    color: '#999'
  }
});

export default ActorDetail;