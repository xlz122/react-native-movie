commitlint提交校验

* ts-node

手势
* react-native-gesture-handler

状态管理
* @reduxjs/toolkit
* react-redux

本地存储
* @react-native-async-storage/async-storage

路由
* @react-navigation/native
* @react-navigation/stack
* react-native-safe-area-context
* react-native-screens

tab导航
* @react-navigation/bottom-tabs

轮播图
* react-native-reanimated
* react-native-reanimated-carousel

更改babel.config.js、yarn.lock文件，如下:

babel.config.js
```
plugins: ['react-native-reanimated/plugin']
```

轮播图2.10.0版本及以上，启动项目时会进行下载boost_1_76_0.tar.gz，如下:

```
> Task :react-native-reanimated:downloadGlog FAILED
<===========--> 85% EXECUTING [4m 37s]
> IDLE
> IDLE
> IDLE
> IDLE
> :react-native-reanimated:downloadBoost > boost_1_76_0.tar.gz > 77.67 MB/124.24 MB downloaded
```

如果出现下载极慢的情况，请选择2.9.1版本，并更改yarn.lock文件如下:

* react-native-reanimated(2.9.1)
* react-native-reanimated-carousel(3.0.3)

yarn.lock
```
react-native-reanimated-carousel@^3.0.3:
  version "3.0.3"
  resolved "https://registry.yarnpkg.com/react-native-reanimated-carousel/-/react-native-reanimated-carousel-3.0.3.tgz#b19b3909fa2ed7c35716fd7f1d2f4aff91345db3"
  integrity sha512-KdidXIBNQb4F/JmXn4tV+2yr/6BhYUQCii0QwBtv64QYiYiBIn+3K8yKJpLTOoy7e3dB3HFKD69VwCCw8ujd2w==

react-native-reanimated@^2.9.1:
  version "2.9.1"
  resolved "https://registry.yarnpkg.com/react-native-reanimated/-/react-native-reanimated-2.9.1.tgz#d9a932e312c13c05b4f919e43ebbf76d996e0bc1"
  integrity sha512-309SIhDBwY4F1n6e5Mr5D1uPZm2ESIcmZsGXHUu8hpKX4oIOlZj2MilTk+kHhi05LjChoJkcpfkstotCJmPRPg==
  dependencies:
    "@babel/plugin-proposal-export-namespace-from" "^7.17.12"
    "@babel/plugin-transform-object-assign" "^7.16.7"
    "@babel/preset-typescript" "^7.16.7"
    "@types/invariant" "^2.2.35"
    invariant "^2.2.4"
    lodash.isequal "^4.5.0"
    setimmediate "^1.0.5"
    string-hash-64 "^1.0.3"
```

渐变背景色
* react-native-linear-gradient