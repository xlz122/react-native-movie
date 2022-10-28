import React from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from 'react-native';

type Props = {
  category: GroupItem[];
  active: string;
  onChange: (name: string) => void;
};

type GroupItem = {
  name: string;
};

function NavGroup(props: Props): React.ReactElement {
  const renderItem = ({ item }: { item: GroupItem }) => (
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
    height: 32,
    paddingLeft: 10,
    backgroundColor: '#fff'
  },
  item: {
    height: 20,
    lineHeight: 18,
    paddingHorizontal: 10,
    marginVertical: 3,
    marginRight: 5,
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
