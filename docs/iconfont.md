[Readme.md](../README.md) | 阿里字体图标 | [插件介绍](./plugin.md) | [平台差异对比](./difference.md) | [打包apk](./release.md) 

## 1.将iconfont图标文件放置在src/assets/fonts

项目所需的字体图标文件仅 iconfont.ttf 这一个文件即可

其余文件只是用于打开demo_index.html

## 2.链接

注：手动链接(react-native link)已从 react-native 0.69 中删除，以支持自动链接功能，需使用另外一个插件react-native-asset

安装react-native-asset

```
yarn add react-native-asset --save
```

根目录新建react-native.config.js

```
module.exports = {
  assets: ['./src/assets/fonts/']
};
```

执行链接

```
yarn react-native-asset
```

## 3.使用

fontFamily: 'iconfont'(必须)

{'\ue908'} 其中e908为 iconfont 的 Unicode 的后四位

```
<Text style={{ fontFamily: 'iconfont' }}>{'\ue908'}</Text>
```
