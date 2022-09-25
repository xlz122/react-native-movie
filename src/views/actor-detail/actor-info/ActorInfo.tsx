import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  data: Partial<Info>;
};

type Info = {
  avatar?: string;
  name?: string;
  name_en?: string;
  gender?: string;
  birthday?: string;
  country?: string;
};

function ActorInfo(props: Props): React.ReactElement {
  const { data } = props;

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
        <Text style={styles.infoFocus}>关注</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    position: 'relative',
    height: 242,
    backgroundColor: 'rgba(229,72,71,.85)',
    overflow: 'hidden'
  },
  infoImage: {
    height: 408
  },
  info: {
    position: 'absolute',
    left: 0,
    bottom: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginTop: 5,
    fontSize: 14,
    color: '#ccc'
  },
  briefExtra: {
    marginTop: 5,
    fontSize: 12,
    color: '#ddd'
  },
  infoFocus: {
    paddingLeft: 20,
    paddingRight: 20,
    marginRight: 10,
    height: 28,
    lineHeight: 28,
    backgroundColor: 'hsla(0, 0%, 100%, .25)',
    fontSize: 12,
    color: '#fff',
    borderRadius: 50
  }
});

export default ActorInfo;
