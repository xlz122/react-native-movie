import React, { useState, useLayoutEffect, useEffect } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { actorsDetail } from '@/api/actor';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType, Navigation } from '@/types/index';
import type { ItemType } from './actor-wroks/ActorWorks';
import CustomHeader from '@/components/custom-header/CustomHeader';
import Panel from '@/components/panel/Panel';
import ActorInfo from './actor-info/ActorInfo';
import ActorPhoto from './actor-photo/ActorPhoto';
import ActorWorks from './actor-wroks/ActorWorks';
import styles from './actor-detail.css';

type Route = RouteProp<{ params: { id: number } }>;

export type ActorDetailType = {
  id: number;
  avatar?: string;
  name?: string;
  name_en?: string;
  gender?: string;
  birthday?: string;
  age?: string;
  country?: string;
  born_place?: string;
  professions?: Array<string>;
  constellation?: string;
  height?: string;
  collection_count: number;
  works_count: number;
  role_count: number;
  award?: {
    poster: string;
    title: string;
  };
  award_count: number;
  summary: string;
  photos: {
    url: string;
  }[];
  works: ItemType[];
  is_collection: number;
};

function ActorDetail(): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const route: Route = useRoute();

  const [detail, setDetail] = useState<Partial<ActorDetailType>>({});

  const getActorDetail = () => {
    actorsDetail({ id: route.params.id })
      .then((res: ResponseType<Partial<ActorDetailType>>) => {
        if (res.code === 200) {
          setDetail(res.data!);
        }
      })
      .catch(() => ({}));
  };

  // 刷新详情
  const refreshDetail = () => {
    getActorDetail();
  };

  useEffect(() => {
    getActorDetail();
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
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <ActorInfo detail={detail} refreshDetail={refreshDetail} />
        <View style={styles.count}>
          <View style={styles.countItem}>
            <Text style={styles.countItemValue}>
              {detail?.collection_count}人
            </Text>
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
        {Number(detail?.award_count) > 0 && (
          <View style={styles.award}>
            <Image
              source={{ uri: detail?.award?.poster }}
              resizeMode={'cover'}
              style={[styles.awardImage]}
            />
            <Text style={styles.awardTitle}>{detail?.award?.title}</Text>
            <View style={styles.awardCount}>
              <Text style={styles.awardCountText}>
                {`获奖${detail?.award_count}次`}
              </Text>
              <Text style={styles.awardCountIcon}>{'\ue906'}</Text>
            </View>
          </View>
        )}
        <Panel
          title="个人简介"
          subtitle={'更多信息'}
          to={{ path: 'ActorSummary', params: { detail: detail } }}
        >
          {Boolean(detail?.summary) && (
            <Text numberOfLines={4} ellipsizeMode="tail" style={styles.summary}>
              {detail?.summary}
            </Text>
          )}
          {!detail?.summary && (
            <View style={styles.noSummary}>
              <Text style={styles.noSummaryText}>暂无简介</Text>
            </View>
          )}
        </Panel>
        {detail?.photos && detail?.photos?.length > 0 && (
          <Panel
            title="相册"
            subtitle={`全部${detail?.photos?.length}张`}
            to={{ path: 'ActorPhotoDetail', params: { id: route.params.id } }}
          >
            <ActorPhoto photo={detail?.photos} />
          </Panel>
        )}
        {detail?.works && detail?.works?.length > 0 && (
          <Panel
            title="影视作品"
            subtitle={`全部${detail?.works_count}部`}
            to={{ path: 'ActorWorksList', params: { id: route.params.id } }}
            panelStyle={{ paddingBottom: 10 }}
          >
            <ActorWorks movie={detail?.works} />
          </Panel>
        )}
      </ScrollView>
      <View style={styles.placeholder} />
    </>
  );
}

export default ActorDetail;
