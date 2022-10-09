import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/index';
import type { Navigation } from '@/types/index';

type Props = {
  data: Partial<Info>;
  refreshDetail: () => void;
};

type Info = {
  id?: number;
  avatar?: string;
  name?: string;
  name_en?: string;
  is_collection?: number;
};

function RoleInfo(props: Props): React.ReactElement {
  const navigation: Navigation = useNavigation();
  const isLogin = useSelector((state: RootState) => state.routine.isLogin);

  const { data } = props;

  // 收藏/取消收藏角色
  const collectionChange = (): boolean | undefined => {
    if (!isLogin) {
      navigation.push('Login');
      return false;
    }
  };

  return (
    <View style={styles.page}>
      {data?.avatar && !data?.avatar?.includes('default') && (
        <Image
          source={{ uri: data?.avatar }}
          resizeMode={'cover'}
          style={[styles.infoImage]}
        />
      )}
      <View style={styles.info}>
        <View style={styles.infoBrief}>
          <Text style={styles.briefName}>{data?.name}</Text>
          <Text style={styles.briefEnName}>{data?.name_en}</Text>
        </View>
        <Text
          onPress={collectionChange}
          style={[
            styles.infoFocus,
            data?.is_collection === 1 ? styles.activeFoucus : styles.infoFocus
          ]}
        >
          {`${data?.is_collection === 1 ? '已收藏' : '收藏'}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    height: 222,
    backgroundColor: 'rgba(229,72,71,.85)',
    overflow: 'hidden'
  },
  infoImage: {
    height: 398
  },
  info: {
    position: 'absolute',
    left: 0,
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  infoBrief: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1,
    paddingLeft: 10
  },
  briefName: {
    fontSize: 18,
    color: '#fff'
  },
  briefEnName: {
    marginTop: 1,
    fontSize: 12,
    color: '#ccc'
  },
  infoFocus: {
    paddingHorizontal: 20,
    paddingVertical: 6.5,
    marginRight: 12,
    backgroundColor: 'hsla(0, 0%, 100%, .25)',
    fontSize: 12,
    color: '#fff',
    borderRadius: 50
  },
  activeFoucus: {
    backgroundColor: 'rgba(229, 72, 71, .3)'
  }
});

export default RoleInfo;
