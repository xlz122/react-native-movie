import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { userCount } from '@/api/mine';
import type { RootState } from '@/store/index';
import type { ResponseType } from '@/types/index';

type Count = {
  actor_count: number;
  review_count: number;
  role_count: number;
  video_count: number;
};

function MineCount(): React.ReactElement {
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const [count, setCount] = useState<Count>({
    actor_count: 0,
    review_count: 0,
    role_count: 0,
    video_count: 0
  });

  function getUserCount(): void {
    userCount()
      .then((res: ResponseType<Count>) => {
        if (res.code === 200) {
          console.log(res);
          setCount(res.data);
        }
      })
      .catch(() => ({}));
  }

  useEffect(() => {
    if (!isLogin) {
      return;
    }

    getUserCount();
  }, [isLogin]);

  return (
    <View style={styles.count}>
      <View style={styles.countItem}>
        <Text style={styles.countItemCount}>
          {isLogin ? `${count.actor_count}` : '-'}
        </Text>
        <Text style={styles.countItemName}>关注影人</Text>
      </View>
      <View style={styles.countItem}>
        <Text style={styles.countItemCount}>
          {isLogin ? `${count.role_count}` : '-'}
        </Text>
        <Text style={styles.countItemName}>关注角色</Text>
      </View>
      <View style={styles.countItem}>
        <Text style={styles.countItemCount}>
          {isLogin ? `${count.review_count}` : '-'}
        </Text>
        <Text style={styles.countItemName}>收藏影评</Text>
      </View>
      <View style={styles.countItem}>
        <Text style={styles.countItemCount}>
          {isLogin ? `${count.video_count}` : '-'}
        </Text>
        <Text style={styles.countItemName}>收藏视频</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  count: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -38,
    marginRight: 17,
    marginLeft: 17,
    height: 76,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  countItem: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  countItemCount: {
    width: 9,
    height: 36,
    lineHeight: 36,
    fontSize: 18,
    color: '#e54847',
    borderRadius: 100
  },
  countItemName: {
    marginTop: 4,
    fontSize: 11,
    fontFamily: 'inherit',
    fontWeight: 'bold',
    color: '#666'
  }
});

export default MineCount;
