import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { Navigation } from '../../../types/index';

function Nav(): React.ReactElement {
  const navigation: Navigation = useNavigation();

  return (
    <View style={styles.nav}>
      <View style={styles.list}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.push('Theater')}
          style={styles.item}
        >
          <Text style={[styles.itemIcon, styles.hotMovie]}>{'\ue617'}</Text>
          <Text style={styles.itemText}>热映中</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.push('HighScore')}
          style={styles.item}
        >
          <Text style={[styles.itemIcon, styles.highScore]}>{'\ue67b'}</Text>
          <Text style={styles.itemText}>高分榜</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.push('Awards')}
          style={styles.item}
        >
          <Text style={[styles.itemIcon, styles.awards]}>{'\ue668'}</Text>
          <Text style={styles.itemText}>奖项</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.push('Today')}
          style={styles.item}
        >
          <Text style={[styles.itemIcon, styles.today]}>{'\ue6c4'}</Text>
          <Text style={styles.itemText}>那年今日</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    display: 'flex',
    paddingTop: 20,
    paddingBottom: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 6
  },
  list: {
    display: 'flex',
    flexDirection: 'row',
    height: 66
  },
  item: {
    flex: 1,
    alignItems: 'center',
    height: 66
  },
  itemIcon: {
    width: 40,
    height: 40,
    lineHeight: 40,
    fontFamily: 'iconfont',
    fontSize: 22,
    textAlign: 'center',
    borderRadius: 6
  },
  itemText: {
    marginTop: 6,
    fontSize: 12,
    color: '#303133'
  },
  hotMovie: {
    backgroundColor: 'rgba(255, 79, 77, 0.15)',
    color: '#f8a52d'
  },
  highScore: {
    backgroundColor: 'rgba(255, 79, 77, 0.15)',
    color: '#ff4f4d'
  },
  awards: {
    backgroundColor: 'rgba(65, 172, 255, 0.15)',
    color: '#41acff'
  },
  today: {
    backgroundColor: 'rgba(145, 109, 255, 0.15)',
    color: '#916dff'
  }
});

export default Nav;
