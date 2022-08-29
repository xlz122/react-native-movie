## 环境要求

需要 NodeJS 14.0.0+ 环境

![](./src/assets/design-sketch/npm-6.14.4.svg)
![](./src/assets/design-sketch/node-14.0.0.svg)

需要 Java JDK 11+ 环境

![](./src/assets/design-sketch/java-jdk-11.0.0.svg)

需要 Android SDK 31+ 环境

![](./src/assets/design-sketch/android-sdk-31.0.0.svg)

## 简介

本项目是一个仿写慕影网H5端项目。

## 项目使用技术栈

* React
* React Native 0.69.5
* Redux
* Typescript

## 插件介绍

commitlint提交校验

* ts-node

阿里字体图标
* react-native-asset
* 描述文档请查看: [docs/iconfont.md](docs/iconfont.md)

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
* react-native-reanimated(2.9.1)
* react-native-reanimated-carousel(3.0.3)

babel.config.js
```
plugins: ['react-native-reanimated/plugin']
```

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

## 加入项目

如果想加入本项目开发，需将项目fork到自己的仓库下，功能开发完成后，提PR即可。

## 运行

启动项目

```
yarn install
```

```
yarn start
```

```
yarn android
```

## 查看项目效果

安卓手机教程: [https://blog.csdn.net/weixin_43233914/article/details/119568245](https://blog.csdn.net/weixin_43233914/article/details/119568245)。

### 项目效果图

## 写在最后

* [The MIT License (MIT)](https://github.com/xlz122/react-native-movie/blob/master/LICENSE)
* 本项目仅用于学习使用，切勿用于商业用途，否则产生的法律后果与作者无关。
