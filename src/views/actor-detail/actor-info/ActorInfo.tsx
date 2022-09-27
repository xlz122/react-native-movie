import React from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { followActors, unFollowActors } from '@/api/actor';
import type { ResponseType } from '@/types/index';

type Props = {
  data: Partial<Info>;
  refreshDetail: () => void;
};

type Info = {
  id?: number;
  avatar?: string;
  name?: string;
  name_en?: string;
  gender?: string;
  birthday?: string;
  country?: string;
  is_collection?: number;
};

function ActorInfo(props: Props): React.ReactElement {
  const { data } = props;

  // 关注/取消关注影人
  const collectionChange = (is_collection: number): void => {
    if (is_collection === 0) {
      followActors({ id: data.id })
        .then((res: ResponseType<unknown>) => {
          if (res.code === 200) {
            props.refreshDetail();
            Alert.alert('提示', res?.message, [{ text: '确认' }]);
          }
        })
        .catch(() => ({}));
    }

    if (is_collection === 1) {
      unFollowActors({ id: data.id })
        .then((res: ResponseType<unknown>) => {
          if (res.code === 200) {
            props.refreshDetail();
            Alert.alert('提示', res?.message, [{ text: '确认' }]);
          }
        })
        .catch(() => ({}));
    }
  };

  return (
    <View style={styles.page}>
      <Image
        source={{ uri: data?.avatar }}
        resizeMode={'cover'}
        style={[styles.infoImage]}
      />
      <View style={styles.info}>
        <View style={styles.infoBrief}>
          <Text style={styles.briefName}>{data?.name}</Text>
          <Text style={styles.briefEnName}>{data?.name_en}</Text>
          <Text style={styles.briefExtra}>
            {data?.gender}
            {Boolean(data?.birthday) && (
              <>
                <Text> · </Text>
                {data?.birthday}
              </>
            )}
            {Boolean(data?.country) && (
              <>
                <Text> · </Text>
                {data?.country}
              </>
            )}
          </Text>
        </View>
        <Text
          onPress={() => collectionChange(data.is_collection)}
          style={[
            styles.infoFocus,
            data?.is_collection === 1 ? styles.activeFoucus : styles.infoFocus
          ]}
        >
          {`${data?.is_collection === 1 ? '已关注' : '关注'}`}
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
  briefExtra: {
    marginTop: 6,
    fontSize: 10.5,
    color: '#ddd'
  },
  infoFocus: {
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 12,
    height: 28,
    lineHeight: 28,
    backgroundColor: 'hsla(0, 0%, 100%, .25)',
    fontSize: 12,
    color: '#fff',
    borderRadius: 50
  },
  activeFoucus: {
    backgroundColor: 'rgba(229, 72, 71, .3)'
  }
});

export default ActorInfo;
