[Readme.md](../README.md) | 平台差异对比 | [阿里字体图标](./iconfont.md) | [项目插件](./plugin.md)

## 简介

web端使用react-native-web实现
web端代码请查看仓库[web分支](https://github.com/xlz122/react-native-movie/tree/web)
web端配置文件放置在web文件夹下

## 配置差异

1.阿里字体图标
* app端请查看[阿里字体图标](./iconfont.md)
* web端查看web/webpack.config.js - module配置项、index.web.js文件

2.接口文件(src/utils/axios)

* app端不需要处理跨域，可以直接使用
* web端需要处理跨域，跨域处理在web/webpack.config.js - devServer配置项

## 插件差异

渐变背景

* app端使用的react-native-linear-gradient
* web端使用的react-native-web-linear-gradient，查看web/webpack.config.js - alias配置项

react-native-webview

* app端使用react-native-webview在app内打开web网页
* web端不支持react-native-webview插件，需要通过特定文件名来区分不同平台，具体示例可以查看src/views/author文件夹
