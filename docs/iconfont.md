## iconfont 阿里字体图标配置

## 1.将iconfont图标文件放置在src/assets/fonts

项目所需: iconfont.ttf文件

可视化页面: 查看iconfont文件夹，并打开demo_index.html可视化页面


## 2.链接

注：手动链接(react-native link)已从 react-native 0.69 中删除,以支持自动链接功能,需使用react-native-asset

根目录新建react-native.config.js

```
module.exports = {
  assets: ['./src/assets/fonts/']
};
```

安装react-native-asset

```
yarn add react-native-asset --save
```

执行链接

```
yarn react-native-asset
```

## 3.使用

fontFamily: 'iconfont'(必须)

{'\ue908'} 其中e834为 iconfont 的 Unicode 的后四位

```
<Text style={{ fontFamily:'iconfont' }}>{'\ue908'}</Text>
```
