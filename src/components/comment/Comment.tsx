import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import type { ListRenderItemInfo } from 'react-native';
import type { RouteProp } from '@react-navigation/native';
import type { ResponseType } from '@/types/index';
import ScrollRefresh from '@/components/scroll-refresh/ScrollRefresh';
import styles from './comment.css';

type Route = RouteProp<{ params: { id: number } }>;

type Props = {
  method: Function;
  close?: () => void;
};

type ItemType = {
  id: number;
  author: {
    avatar: string;
    username: string;
  };
  content: string;
  created_at: string;
  like_count: number;
  is_delete: boolean;
};

function Comment(props: Props): React.ReactElement {
  const route: Route = useRoute();

  // 刷新列表
  const [resetRefresh, setResetRefresh] = useState(false);

  const [sortby, setSortby] = useState('hot');

  const toggleSort = (value: string): void => {
    setResetRefresh(true);
    setSortby(value);
  };

  // 评论总数
  const [commentCount, setCommentCount] = useState(0);

  const method = ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }): Promise<unknown[]> => {
    return new Promise((resolve, reject) => {
      props
        ?.method({ id: route.params.id, page, per_page, sortby })
        .then((res: ResponseType<unknown[]>) => {
          if (res.code === 200) {
            setResetRefresh(false);
            setCommentCount((res as { total: number }).total);
            resolve(res.data!);
          } else {
            reject();
          }
        })
        .catch(() => ({}));
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<ItemType>) => (
    <View style={styles.item}>
      <View style={styles.itemCover}>
        <Image
          source={{ uri: item?.author?.avatar }}
          resizeMode={'stretch'}
          style={[styles.itemImage]}
        />
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={styles.itemCoverText}
        >
          {item?.author?.username}
        </Text>
        <TouchableOpacity>
          <Text style={styles.itemMoreIcon}>{'\ue85c'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemText}>{item.content}</Text>
      </View>
      <View style={styles.itemInfo}>
        <Text style={styles.infoText}>{item.created_at?.slice(0, 10)}</Text>
        <View style={styles.infoDesc}>
          <Text style={styles.descText}>{item.like_count}</Text>
          <Text style={styles.descIcon}>{'\ue669'}</Text>
        </View>
      </View>
    </View>
  );

  // 无数据展示
  const ListEmptyComponent = (): React.ReactElement => (
    <View style={styles.noData}>
      <Text style={styles.noDataText}>还没有用户发表过评论</Text>
    </View>
  );

  return (
    <View style={styles.page}>
      <TouchableOpacity activeOpacity={1} style={styles.mask} />
      <View style={styles.modal}>
        <View style={styles.modalHeader}>
          <Text style={styles.headerTitle}>全部评论</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => props.close && props.close()}
            style={styles.headerClose}
          >
            <Text style={styles.headerCloseIcon}>{'\ue612'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalBody}>
          {commentCount > 0 && (
            <View style={styles.bodyTitle}>
              <Text style={styles.titleText}>评论 {commentCount}</Text>
              <View style={styles.titleTab}>
                <Text
                  onPress={() => toggleSort('hot')}
                  style={[
                    styles.tabItem,
                    sortby === 'hot' ? styles.tabActiveItem : styles.tabItem
                  ]}
                >
                  热度
                </Text>
                <Text
                  onPress={() => toggleSort('created_at')}
                  style={[
                    styles.tabItem,
                    sortby === 'created_at'
                      ? styles.tabActiveItem
                      : styles.tabItem
                  ]}
                >
                  最新
                </Text>
              </View>
            </View>
          )}
          <ScrollRefresh
            page={1}
            pageSize={10}
            request={method}
            initialNumToRender={6}
            renderItem={renderItem}
            resetRefresh={resetRefresh}
            ListEmptyComponent={<ListEmptyComponent />}
          />
        </View>
        <View style={styles.modalFooter}>
          <Text style={styles.reviewInput}>来点碎碎念...</Text>
        </View>
      </View>
    </View>
  );
}

export default Comment;
