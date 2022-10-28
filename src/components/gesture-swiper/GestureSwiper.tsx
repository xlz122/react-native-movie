import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions
} from 'react-native';
import type { ViewStyle, LayoutChangeEvent } from 'react-native';

// 屏幕宽度
const deviceWidth = Dimensions.get('window').width;

type Props = {
  data: unknown[];
  renderItem: React.FunctionComponent<any>;
  index?: number;
  onChange?: (index: number) => void;
  onProgressChange?: (progress: number) => void;
  style?: ViewStyle;
  itemStyle?: ViewStyle;
};

function GestureSwiper(props: Props): React.ReactElement {
  // 初始值
  const positionAnimated = new Animated.Value(0);
  // realtime 实时移动量
  // start 开始移动量
  const position = {
    realtime: 0,
    start: 0
  };

  // 监听移动
  useEffect(() => {
    let id = '';
    if (id) {
      return;
    }

    id = positionAnimated.addListener(({ value }) => {
      // console.log('realtime', value);
      position.realtime = value;
      props.onProgressChange && props.onProgressChange(value);
    });

    return () => {
      positionAnimated.removeListener(id);
    };
  }, [positionAnimated]);

  // 容器宽度
  const [layoutWidth, setLayoutWidth] = useState(0);
  // 组件挂载或者布局变化时调用
  const handleLayout = ({ nativeEvent }: LayoutChangeEvent) => {
    setLayoutWidth(nativeEvent.layout.width);
  };

  // 抬起函数
  const onPanResponderEnd = () => {
    // 超过 50% 的距离，触发左滑、右滑
    const index = Math.round(-position.realtime / layoutWidth);
    const safeIndex = Math.min(props.data.length - 1, Math.max(index, 0));

    scrollTo(safeIndex);
  };

  // 执行动画
  const scrollTo = (index: number): void => {
    Animated.spring(positionAnimated, {
      toValue: -index * layoutWidth,
      friction: 12,
      tension: 50,
      useNativeDriver: false
    }).start();
  };

  // 手势函数
  const responder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onShouldBlockNativeResponder: () => true,
    onPanResponderTerminationRequest: () => true,
    // 按下
    onPanResponderGrant: () => {
      // 用户手指触碰屏幕, 停止动画
      positionAnimated.stopAnimation();
      // 记录手势响应时的位置
      position.start = position.realtime;
    },
    // 移动
    onPanResponderMove: (evt, { dx }) => {
      // 要变化的位置 = 手势响应时的位置 + 移动的距离
      positionAnimated.setValue(position.start + dx);
    },
    // 抬起
    onPanResponderRelease: onPanResponderEnd,
    onPanResponderTerminate: onPanResponderEnd
  });

  // 渲染子项
  const RenderSwiper = ({ item, index }: { item: unknown; index: number }) => {
    return (
      <Animated.View
        style={[
          {
            width: layoutWidth,
            transform: [{ translateX: positionAnimated }]
          },
          props?.itemStyle
        ]}
      >
        {props.renderItem({ item, index })}
      </Animated.View>
    );
  };

  return (
    <View
      onLayout={handleLayout}
      {...responder.panHandlers}
      style={[styles.page, props?.style]}
    >
      {props.data.map((item, index) => {
        return <RenderSwiper key={index} item={item} index={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    width: deviceWidth,
    overflow: 'hidden'
  }
});

export default GestureSwiper;
