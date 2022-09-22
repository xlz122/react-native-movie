import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import type { ListRenderItem, ViewStyle } from 'react-native';

type Props = {
  page?: number;
  pageSize?: number;
  request: ({
    page,
    per_page
  }: {
    page: number;
    per_page: number;
  }) => Promise<unknown[]>;
  resetRefresh?: boolean;
  listStyle?: ViewStyle;
} & FlatListProps;

type FlatListProps = {
  initialNumToRender?: number;
  showsVerticalScrollIndicator?: boolean;
  numColumns?: number;
  columnWrapperStyle?: ViewStyle;
  renderItem?: ListRenderItem<unknown>;
  ListEmptyComponent?: React.FunctionComponent;
  ListHeaderComponent?: React.FunctionComponent;
  ListFooterComponent?: React.FunctionComponent;
  onEndReachedThreshold?: number;
};

type RefreshState = {
  page: number;
  pageSize: number;
  data: unknown[];
  isRefresh: boolean;
  isLoadMore: boolean;
  loadText: string;
  complete: boolean;
};

function ScrollRefresh(props: Props): React.ReactElement {
  const [refreshState, setRefreshState] = useState<RefreshState>({
    page: props?.page || 1,
    pageSize: props?.pageSize || 10,
    data: [],
    // 下拉刷新
    isRefresh: false,
    // 加载更多
    isLoadMore: false,
    // 加载文字
    loadText: '',
    // 数据是否加载完成
    complete: false
  });

  const onRefresh = (): void => {
    setRefreshState({
      ...refreshState,
      page: 1,
      data: [],
      isRefresh: true,
      complete: false,
      loadText: ''
    });
  };

  const onEndReached = (): boolean | undefined => {
    // 加载完成
    if (refreshState.complete) {
      return false;
    }

    setRefreshState({
      ...refreshState,
      page: refreshState.page + 1,
      isLoadMore: true,
      loadText: '加载中...'
    });
  };

  // 重置刷新
  useEffect(() => {
    if (props?.resetRefresh) {
      setRefreshState({
        ...refreshState,
        page: 1,
        data: [],
        isRefresh: true,
        complete: false,
        loadText: ''
      });
    }
  }, [props?.resetRefresh]);

  // 下拉刷新
  useEffect(() => {
    if (refreshState.isRefresh) {
      handleRefreshStatus();
    }
  }, [refreshState.isRefresh]);

  // 下拉刷新不触发
  useEffect(() => {
    if (refreshState.isRefresh) {
      return;
    }

    handleRefreshStatus();
  }, [refreshState.page]);

  const handleRefreshStatus = async () => {
    const data = await props.request({
      page: refreshState.page,
      per_page: refreshState.pageSize
    });

    // 加载失败
    if (!data) {
      setRefreshState({
        ...refreshState,
        isRefresh: false,
        isLoadMore: false,
        loadText: '接口加载失败,请重试...'
      });
      return false;
    }

    // 第一页，没有数据
    if (refreshState.page === 1 && data?.length === 0) {
      setRefreshState({
        ...refreshState,
        data,
        isRefresh: false,
        isLoadMore: false,
        complete: true,
        loadText: ''
      });

      return false;
    }

    // 第一页，数据量少于一页数据量
    if (refreshState.page === 1 && data?.length < refreshState.pageSize) {
      setRefreshState({
        ...refreshState,
        data,
        isRefresh: false,
        isLoadMore: false,
        complete: true,
        loadText: '没有更多数据了'
      });

      return false;
    }

    // 数据量少于一页数据量
    if (data?.length < refreshState.pageSize) {
      setRefreshState({
        ...refreshState,
        data: refreshState.data.concat(data),
        isRefresh: false,
        isLoadMore: false,
        complete: true,
        loadText: '没有更多数据了'
      });

      return false;
    }

    setRefreshState({
      ...refreshState,
      data: refreshState.data.concat(data),
      isRefresh: false,
      isLoadMore: false,
      loadText: '加载更多...'
    });
  };

  const _createListFooter = (): React.ReactElement => {
    return (
      <View style={styles.loadMore}>
        <Text style={styles.loadMoreText}>{refreshState.loadText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.list, props?.listStyle]}>
      <FlatList
        // 初始渲染个数
        initialNumToRender={props?.initialNumToRender || 6}
        // 滚动条
        showsVerticalScrollIndicator={
          props?.showsVerticalScrollIndicator || false
        }
        data={refreshState.data}
        numColumns={props?.numColumns || 1}
        columnWrapperStyle={props?.columnWrapperStyle}
        renderItem={props?.renderItem}
        // 空布局
        ListEmptyComponent={props?.ListEmptyComponent}
        // 头尾布局
        ListHeaderComponent={props?.ListHeaderComponent}
        ListFooterComponent={props?.ListFooterComponent || _createListFooter}
        // 下拉刷新
        refreshing={refreshState.isRefresh}
        onRefresh={onRefresh}
        // 加载更多
        onEndReachedThreshold={props?.onEndReachedThreshold}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1
  },
  loadMore: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 36
  },
  loadMoreText: {
    fontSize: 13,
    color: '#909399'
  }
});

export default ScrollRefresh;
