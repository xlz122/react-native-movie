import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { getScreenViewHeight } from '../../utils/screen';
import type { ListRenderItem } from 'react-native';

// 获取屏幕内容高度
const viewHeight = getScreenViewHeight();

type Props = {
  height?: number;
  initialNumToRender?: number;
  showsVerticalScrollIndicator?: boolean;
  data?: readonly unknown[];
  renderItem?: ListRenderItem<unknown>;
  ListEmptyComponent?: React.FunctionComponent;
  ListHeaderComponent?: React.FunctionComponent;
  ListFooterComponent?: React.FunctionComponent;
  refreshing?: boolean;
  loadMoreText?: string;
  onRefresh?: () => void;
  onEndReachedThreshold?: number;
  onEndReached?: () => void;
};

function ScrollRefresh(props: Props): React.ReactElement {
  const _createListFooter = (): React.ReactElement => {
    return (
      <View style={styles.loadMore}>
        <Text style={styles.loadMoreText}>{props?.loadMoreText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={[styles.list, { height: props?.height || viewHeight }]}
    >
      <FlatList
        // 初始渲染个数
        initialNumToRender={props?.initialNumToRender}
        // 滚动条
        showsVerticalScrollIndicator={props?.showsVerticalScrollIndicator}
        data={props.data}
        renderItem={props?.renderItem}
        // 空布局
        ListEmptyComponent={props?.ListEmptyComponent}
        // 头尾布局
        ListHeaderComponent={props?.ListHeaderComponent}
        ListFooterComponent={props?.ListFooterComponent || _createListFooter}
        // 下拉刷新
        refreshing={props?.refreshing}
        onRefresh={props?.onRefresh}
        // 加载更多
        onEndReachedThreshold={props?.onEndReachedThreshold}
        onEndReached={props?.onEndReached}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  list: {
    paddingBottom: 15
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
