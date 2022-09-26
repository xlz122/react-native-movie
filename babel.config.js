module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    'react-native-web',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': ['./src'],
          '@api': './src/api',
          '@assets': './src/assets',
          '@components': './src/components',
          '@router': './src/router ',
          '@store': './src/store ',
          '@utils': './src/utils ',
          '@views': './src/views '
        }
      }
    ]
  ]
};
