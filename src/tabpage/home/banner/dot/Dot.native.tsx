import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = {
  list: unknown[];
};

function Dot(props: Props): React.ReactElement {
  return (
    <View style={styles.dotContainer}>
      {props.list &&
        props.list.map((item, index) => {
          return (
            <View
              key={index}
              style={[
                styles.dotItem,
                index === 0 ? styles.dotActiveItem : styles.dotItem
              ]}
            />
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  dotContainer: {
    position: 'absolute',
    top: 178,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  dotItem: {
    width: 15,
    height: 3,
    marginHorizontal: 2,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  dotActiveItem: {
    backgroundColor: '#e54847'
  }
});

export default Dot;
