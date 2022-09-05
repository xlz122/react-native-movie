import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { movieAwards } from '../../api/home';
import type { ResponseType } from '../../types/index';

type AwardsType = {
  id: number;
  title: string;
};

function Awards(): React.ReactElement {
  const [awards, setAwards] = useState<AwardsType[]>([]);

  const getMovieToday = () => {
    movieAwards()
      .then((res: ResponseType<AwardsType[]>) => {
        if (res.code === 200) {
          setAwards(res.data!);
        }
      })
      .catch(() => ({}));
  };

  useEffect(() => {
    getMovieToday();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.page}>
        {awards.map((item, index) => {
          return (
            <View
              style={[
                styles.item,
                index % 1 === 0 ? styles.itemLine : styles.item
              ]}
            >
              <Text style={styles.itemText}>{item.title}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 40,
    borderBottomWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemLine: {
    borderRightWidth: 0.5,
    borderStyle: 'solid',
    borderColor: '#eee'
  },
  itemText: {
    fontSize: 12.3,
    color: '#303133'
  }
});

export default Awards;
