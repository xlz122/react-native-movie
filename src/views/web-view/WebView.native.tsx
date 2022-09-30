import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

type Route = RouteProp<{ params: { to: string } }>;

function MyWebView(): React.ReactElement {
  const route: Route = useRoute();

  const RenderLoading = () => {
    return <Text style={styles.loading}>loading...</Text>;
  };

  return (
    <View style={styles.flex}>
      <WebView
        style={styles.web}
        source={{ uri: route.params.to }}
        startInLoadingState={true}
        renderLoading={() => <RenderLoading />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    position: 'relative',
    flex: 1
  },
  web: {
    height: height,
    width: width
  },
  loading: {
    position: 'absolute',
    top: '45%',
    left: '44%'
  }
});

export default MyWebView;
