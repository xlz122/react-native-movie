import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { roleDetail } from '@/api/role';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import type { Movie } from './role-movie/RoleMovie';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import RoleInfo from './role-info/RoleInfo';
import RolePhoto from './role-photo/RolePhoto';
import RoleMovie from './role-movie/RoleMovie';
import RoleActor from './role-actor/RoleActor';

type Route = RouteProp<{ params: { id: number } }>;

type Detail = {
  avatar?: string;
  collection_count: number;
  movie_count: number;
  actor_count: number;
  brief: string;
  photos: unknown[];
  movies: Movie[];
  actors: Movie[];
};

function ActorDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<Detail>>({});

  const getRoleDetail = () => {
    roleDetail({ id: route.params.id })
      .then((res: ResponseType<Partial<Detail>>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  // 刷新详情
  const refreshDetail = () => {
    getRoleDetail();
  };

  useEffect(() => {
    getRoleDetail();
  }, []);

  useLayoutEffect(() => {
    // 设置标头
    navigation.setOptions({
      header: ({ options }) => {
        return (
          <CustomHeader
            options={options}
            headerTitleAlign={true}
            headerStyle={{ height: 0 }}
            arrowStyle={{ position: 'absolute', top: 2 }}
          />
        );
      }
    });
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <RoleInfo data={detail} refreshDetail={refreshDetail} />
      <View style={styles.count}>
        <View style={styles.countItem}>
          <Text style={styles.countItemValue}>
            {detail?.collection_count}人
          </Text>
          <Text style={styles.countItemLabel}>关注数</Text>
        </View>
        <View style={styles.countItem}>
          <Text style={styles.countItemValue}>{detail?.movie_count}部</Text>
          <Text style={styles.countItemLabel}>影视数</Text>
        </View>
        <View style={[styles.countItem, styles.countLastItem]}>
          <Text style={styles.countItemValue}>{detail?.actor_count}个</Text>
          <Text style={styles.countItemLabel}>影人数</Text>
        </View>
      </View>
      <Panel title="个人简介" subtitle={'更多信息'}>
        {Boolean(detail?.brief) && (
          <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
            {detail?.brief}
          </Text>
        )}
        {!detail?.brief && (
          <View style={styles.summary}>
            <Text style={styles.summaryText}>暂无简介</Text>
          </View>
        )}
      </Panel>
      {detail?.photos && detail?.photos?.length > 0 && (
        <Panel title="相册" subtitle={`全部${detail?.photos?.length}张`}>
          <RolePhoto movie={detail?.photos} />
        </Panel>
      )}
      {detail?.movies && detail?.movies?.length > 0 && (
        <Panel
          title="角色影视"
          subtitle={`全部${detail?.movie_count}部`}
          panelStyle={{ paddingBottom: 10 }}
        >
          <RoleMovie movie={detail?.movies} />
        </Panel>
      )}
      {detail?.actors && detail?.actors?.length > 0 && (
        <Panel
          title="角色影人"
          subtitle={`全部${detail?.movie_count}部`}
          panelStyle={{ paddingBottom: 10 }}
        >
          <RoleActor movie={detail?.actors} />
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
    height: 72,
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
    fontSize: 12,
    color: '#888'
  },
  countLastItem: {
    borderRightWidth: 0
  },
  summary: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    color: '#303133'
  },
  summaryText: {
    height: 75,
    lineHeight: 75,
    fontSize: 12,
    color: '#999'
  }
});

export default ActorDetail;
