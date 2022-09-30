import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';

function NavGroup(props): React.ReactElement {
  const renderItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        props.onChange(item.name);
      }}
    >
      <Text
        style={[
          styles.item,
          item.name === props.active ? styles.activeItem : styles.item
        ]}
      >
        {item?.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.navGroup}>
      <FlatList
        horizontal
        initialNumToRender={6}
        showsHorizontalScrollIndicator={false}
        data={props.category}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 10,
    height: 32,
    backgroundColor: '#fff'
  },
  item: {
    paddingHorizontal: 10,
    marginVertical: 3,
    marginRight: 5,
    height: 20,
    lineHeight: 18,
    color: '#333',
    fontSize: 12
  },
  activeItem: {
    backgroundColor: 'rgba(229, 72, 71, 0.85)',
    color: '#fff',
    borderRadius: 50
  }
});

export default NavGroup;
