[Readme.md](../README.md) | 平台差异对比 | [阿里字体图标](./iconfont.md) | [项目插件](./plugin.md)

## 配置差异

1.阿里字体图标

* app端请查看[阿里字体图标](./iconfont.md)
* web端查看web/webpack.config.js - module配置项、index.web.js文件

2.接口文件(src/utils/axios)

* app端不需要处理跨域
* web端需要处理跨域，跨域处理请查看web/webpack.config.js - devServer配置项

## 插件差异

渐变背景

* app端使用react-native-linear-gradient
* web端使用react-native-web-linear-gradient，请查看web/webpack.config.js - alias配置项

react-native-webview

* app端使用react-native-webview在app内打开web网页
* web端原生支持web写法，所以不需要react-native-webview插件，可通过特定文件名来区分不同平台，示例可以查看src/views/author文件夹

## 高度差异

```
import { StatusBar, Dimensions } from 'react-native';

// 状态栏高度
const StatusBarHeight = StatusBar.currentHeight || 0;
// 屏幕高度
const deviceHeight = Dimensions.get('window').height;
// 获取屏幕内容高度
const viewHeight = deviceHeight - StatusBarHeight;
```

屏幕内容高度(viewHeight)

* app端直接使用viewHeight撑满屏幕，tabbar页面可以使用 flex: 1 来撑满屏幕
* web端 - 有标题栏需减去标题栏高度
* web端 - 有tabBar需减去tabBar高度

FlatList(上拉加载、下拉刷新)

* app端无需给定具体高度，自动撑满屏幕
* web端需给定具体滚动高度(viewHeight)，否则会无限触发上拉加载的回调函数，tabbar页面可以使用flex: 1来撑满屏幕
